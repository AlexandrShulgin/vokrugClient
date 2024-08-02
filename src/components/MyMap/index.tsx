import classes from './index.module.css';

import React, { useState, useCallback, useEffect, ReactElement } from "react";
import { YMap, YMapComponentsProvider, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener, YMapControls, YMapGeolocationControl, YMapZoomControl, YMapFeature } from "ymap3-components";
import { circle } from "@turf/turf";

import { YMapLocationRequest } from "@yandex/ymaps3-types/imperative/YMap";
import { LngLat } from "@yandex/ymaps3-types";
import * as YMaps from "@yandex/ymaps3-types";

import MyRange from "../UI/MyRange";
import Sidebar from "../UI/Sidebar";
import MyMarker from "../UI/MyMarker";
import MyModal from "../UI/MyModal";
import ContextMenu from "../UI/ContextMenu";
import CreateEventForm from "../Forms/CreateEventForm";

import { location as LOCATION, apiKey, locationCenter } from "./helpers";
import eventApi from "../../api/eventApi";
import YLoginButton from '../Auth/YLoginButton';

interface Location {
  center: LngLat;
  zoom: number;
}

interface Marker {
  address: {
    name: string,
    description: string
  };
  coordinates: [number, number];
  createdAt: Date;
  description: string;
  rating: number;
  time: number;
  type: string;
  userId: number;
  name: string;
  _id: string;
}

interface User {
  y_id: string
  email: string,
  name: string,
  avatar: string,
}

const MyMap: React.FC = () => {
  const [location, setLocation] = useState<YMapLocationRequest>(LOCATION);
  const [ymap, setYmap] = useState<YMaps.YMap | null>(null);
  const [contextPixelCords, setContextPixelCords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [clickMapCords, setClickMapCords] = useState<[number, number]>(locationCenter);
  const [markers, setMarkers] = useState<Marker[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setIsModalContent] = useState<ReactElement | null>(null);
  const [isContextOpen, setIsContextOpen] = useState<boolean>(false);
  const [markerActiveId, setMarkerActiveId] = useState<string>("");
  const [searchCenter, setSearchCenter] = useState<[number, number]>(locationCenter);
  const [searchRadius, setSearchRadius] = useState<number>(100);
  const [currentUser, setCurrentUser] = useState<User>()
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  
  useEffect(() => {
    eventApi.getEventsInArea({ searchCenter, searchRadius })
      .then((data) => setMarkers(data));
  }, [isModalOpen, searchCenter, searchRadius]);

  useEffect(() => {
    if (localStorage.user) {
      const getUser = JSON.parse(localStorage.user)
      setCurrentUser({
        y_id: getUser.y_id,
        email: getUser.email,
        name: getUser.display_name,
        avatar: getUser.avatar_id,
      })
    }
  }, [localStorage])

  const onUpdate = useCallback(({ location, mapInAction }: { location: Location; mapInAction: boolean }) => {
    if (!mapInAction) {
      setLocation({
        center: location.center,
        zoom: location.zoom,
      });
      setSearchCenter([location.center[0], location.center[1]]);
    }
  }, []);

  const getMapCords = (object: YMaps.DomEventHandlerObject, event: { coordinates: LngLat }) => {
    console.log(event.coordinates);
    setClickMapCords([event.coordinates[0], event.coordinates[1]]);
  };

  const contextMenuHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const [x, y] = [event.pageX, event.pageY];
    setContextPixelCords({ x, y });
    setIsContextOpen(true);
  };

  const openCreateMarkerModal = () => {
    if (clickMapCords) {
      setIsContextOpen(false);
      setIsModalContent(
        <CreateEventForm 
          cords={clickMapCords} 
          onClose={() => setIsModalOpen(false)} 
          y_id={Number(currentUser?.y_id)}
          name={currentUser?.name}
          />
      );
      setIsModalOpen(true);
    }
  };

  const onMarkerClick = (marker: Marker) => {
    setLocation({ center: marker.coordinates, duration: 400 });
    setMarkerActiveId(marker._id);
  };

  const createCircle = (): YMaps.PolygonGeometry => {
    if (searchCenter) {
      const area = circle(searchCenter, searchRadius);
      return area.geometry as YMaps.PolygonGeometry;
    } else {
      return { type: "Polygon", coordinates: [] };
    }
  };

  return (
    <>
     <div className={classes.cover}>
        <Sidebar markers={markers} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        <YLoginButton currentUser={currentUser}/>
        <MyRange
          min={100}
          max={2000}
          step={100}
          value={searchRadius}
          onChange={setSearchRadius}
        />
      </div>
    <div className={classes.Map} onContextMenu={contextMenuHandler}>
      <YMapComponentsProvider apiKey={apiKey} lang="ru_RU">
        <YMap
          key="map"
          ref={(ymapInstance: YMaps.YMap) => setYmap(ymapInstance)}
          location={location}
          mode="vector"
          theme="dark"
        >
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          <YMapListener onUpdate={onUpdate} />
          {!isSidebarOpen && (
          <>
          <YMapControls position="bottom">
            <YMapZoomControl />
          </YMapControls>
          <YMapControls position="bottom left">
            <YMapGeolocationControl />
          </YMapControls>
          </>
          )}
          <YMapListener onMouseDown={() => { setIsContextOpen(false); setMarkerActiveId(""); }} />
          <YMapListener onContextMenu={getMapCords} />
          {markers?.map((marker) => (
            <MyMarker
              key={marker._id}
              markerData={marker}
              onClick={() => onMarkerClick(marker)}
              activeId={markerActiveId}
            />
          ))}
          <YMapFeature geometry={createCircle()} style={{ fill: "#111111", fillOpacity: 0.1, stroke: [{ color: "#111111" }] }} />
        </YMap>
      </YMapComponentsProvider>
      <MyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalContent}
      </MyModal>
      <ContextMenu
        x={contextPixelCords.x}
        y={contextPixelCords.y}
        isContextOpen={isContextOpen}
        onClose={() => setIsContextOpen(false)}
        onCreateMarker={openCreateMarkerModal}
        onSetSearchCenter={() => { setSearchCenter(clickMapCords); setIsContextOpen(false); }}
      />
     
    </div>
    </>
  );
};

export default MyMap;
