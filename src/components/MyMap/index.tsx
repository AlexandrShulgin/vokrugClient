import React, { useState, useCallback, useEffect, ReactElement } from "react";
import { YMap, YMapComponentsProvider, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener, YMapControls, YMapGeolocationControl, YMapZoomControl, YMapDefaultMarker, YMapFeature } from "ymap3-components";
import { location as LOCATION, apiKey } from "./helpers";
import * as YMaps from "@yandex/ymaps3-types";
import { LngLat } from "@yandex/ymaps3-types";
import classes from './index.module.css';
import ContextMenu from "../UI/ContextMenu";
import axios from "axios";
import eventApi from "../../api/eventApi";
import MyModal from "../UI/MyModal";
import CreateEventForm from "../Forms/CreateEventForm";
import MyMarker from "../UI/MyMarker";
import { YMapLocation, YMapLocationRequest, YMapCenterZoomLocation } from "@yandex/ymaps3-types/imperative/YMap";
import Sidebar from "../UI/Sidebar";
import { circle, point } from "@turf/turf";

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
  _id: string;
}

const MyMap: React.FC = () => {
  const [location, setLocation] = useState<YMapLocationRequest>(LOCATION);
  const [ymap, setYmap] = useState<YMaps.YMap | null>(null);
  const [contextPixelCords, setContextPixelCords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [clickMapCords, setClickMapCords] = useState<[number, number] | null>(null);
  const [markers, setMarkers] = useState<Marker[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalContent, setIsModalContent] = useState<ReactElement>()
  const [isContextOpen, setIsContextOpen] = useState<boolean>(false)
  const [markerActiveId, setMarkerActiveId] = useState<string>("");
  const [searchCenter, setSearchCenter] = useState<[number, number] | null>([37.61881923336313, 55.751521468695934])
  const [searchRadius, setSearchRadius] = useState<number>(1000)
  useEffect(() => {
    eventApi.getEventsInArea({searchCenter, searchRadius})
      .then((data) => setMarkers(data))
  }, [isModalOpen, searchCenter, searchRadius])

  const onUpdate = useCallback(({ location, mapInAction }: { location: Location; mapInAction: boolean }) => {
    if (!mapInAction) {
      setLocation({
        center: location.center,
        zoom: location.zoom,
      });
    }
  }, []);

  const getMapCords = (object: any, event: { coordinates: LngLat }) => {
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
      setIsContextOpen(false)
      setIsModalContent(<CreateEventForm cords={clickMapCords} onClose={() => setIsModalOpen(false)}/>)
      setIsModalOpen(true)
    }
  }

  const onMarkerClick = (marker: Marker) => {
    setLocation({center: marker.coordinates, duration: 400})
    setMarkerActiveId(marker._id)
  }

  const createCircle = (): YMaps.PolygonGeometry => {
    if (searchCenter) {
      const area = circle(searchCenter, searchRadius)
      // @ts-ignore: Unreachable code error
      return area.geometry
    } else {
      return  {type: "Polygon", coordinates: []}
    }
  }

  return (
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
          <YMapControls position="bottom">
            <YMapZoomControl />
          </YMapControls>
          <YMapControls position="bottom left">
            <YMapGeolocationControl />
          </YMapControls>
          <YMapListener onMouseDown={() => {setIsContextOpen(false); setMarkerActiveId("")}} />
          <YMapListener onContextMenu={getMapCords} />
          {markers?.map((marker) => (
            <MyMarker 
              key={marker._id} 
              markerData={marker} 
              onClick={() => onMarkerClick(marker)}
              activeId={markerActiveId}
              />
          ))}
          <YMapFeature geometry={createCircle()} style={{fill: "#111111", fillOpacity: 0.1, stroke: [{color: "#111111"}]}}/>
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
        onCreateMarker={() => openCreateMarkerModal()}
        onSetSearchCenter={() => {setSearchCenter(clickMapCords); setIsContextOpen(false)}}
        />
      <Sidebar markers={markers}/>
    </div>
  );
};

export default MyMap;
