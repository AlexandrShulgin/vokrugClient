import React, { useEffect, useState, useCallback, ReactElement, useRef } from 'react';
import classes from './index.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import Spinner from '../UI/Spinner';
import { YMap, YMapComponentsProvider, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener, YMapControls, YMapGeolocationControl, YMapZoomControl, YMapFeature } from "ymap3-components";
import { circle } from "@turf/turf";
import { YMapLocationRequest } from "@yandex/ymaps3-types/imperative/YMap";
import { LngLat } from "@yandex/ymaps3-types";
import * as YMaps from "@yandex/ymaps3-types";
import { MyEvent } from '../../types/types';
import MyRange from "../UI/MyRange";
import Sidebar from "../UI/Sidebar";
import MyMarker from "../UI/MyMarker";
import MyModal from "../UI/MyModal";
import ContextMenu from "../UI/ContextMenu";
import CreateEventForm from "../Forms/CreateEventForm";
import { location as LOCATION, apiKey, locationCenter } from "./helpers";
import eventApi from "../../api/eventApi";
import YLoginButton from '../Auth/YLoginButton';
import { setUser } from '../../store/slices/userSlice';
import About from '../About';
import info from '../../img/info.png'

interface Location {
  center: LngLat;
  zoom: number;
}

const MyMap: React.FC = () => {
  const [location, setLocation] = useState<YMapLocationRequest>(LOCATION);
  const [ymap, setYmap] = useState<YMaps.YMap | null>(null);
  const [contextPixelCords, setContextPixelCords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [clickMapCords, setClickMapCords] = useState<[number, number]>(locationCenter);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactElement | null>(null);
  const [isContextOpen, setIsContextOpen] = useState<boolean>(false);
  const [markerActiveId, setMarkerActiveId] = useState<string>("");
  const [searchCenter, setSearchCenter] = useState<[number, number]>(locationCenter);
  const [searchRadius, setSearchRadius] = useState<number>(100);
  const [events, setEvents] = useState<MyEvent[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  const rerender = useSelector((state: RootState) => state.rerender);
  const isSidebarOpen = useSelector((state: RootState) => state.ref.isSidebarOpen);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(true);
    eventApi.getEventsInArea({ searchCenter, searchRadius })
      .then((data) => setEvents(data))
      .catch((error) => {
        console.error("Failed to fetch events:", error);
        alert("Ошибка загрузки событий")
      })
      .finally(() => setLoading(false));
  }, [isModalOpen, searchCenter, searchRadius, rerender]);

  useEffect(() => {
    if (localStorage.user) {
      const getUser = JSON.parse(localStorage.user);
      const userData = {
        _id: getUser._id,
        email: getUser.email,
        name: getUser.display_name,
        avatar: getUser.avatar_id,
      };
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  const onUpdate = useCallback(({ location, mapInAction }: { location: Location; mapInAction: boolean }) => {
    if (!mapInAction) {
      setLocation({
        center: location.center,
        zoom: location.zoom,
      });
    }
  }, []);

  const getMapCords = useCallback((object: YMaps.DomEventHandlerObject, event: { coordinates: LngLat }) => {
    setClickMapCords([event.coordinates[0], event.coordinates[1]]);
  }, []);

  const contextMenuHandler = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const [x, y] = [event.pageX, event.pageY];
    setContextPixelCords({ x, y });
    setIsContextOpen(true);
  }, []);

  const openCreateMarkerModal = useCallback(() => {
    if (clickMapCords) {
      setIsContextOpen(false);
      setModalContent(
        <CreateEventForm 
          cords={clickMapCords} 
          onClose={() => setIsModalOpen(false)} 
          id={currentUser?._id}
          name={currentUser?.name}
        />
      );
      setIsModalOpen(true);
    }
  }, [clickMapCords, currentUser]);

  const onMarkerClick = useCallback((marker: MyEvent) => {
    setLocation({ center: marker.coordinates, duration: 400 });
    setMarkerActiveId(marker._id);
  }, []);

  const createCircle = useCallback((): YMaps.PolygonGeometry => {
    const area = circle(searchCenter, searchRadius);
    return area.geometry as YMaps.PolygonGeometry;
  }, [searchCenter, searchRadius]);

  //ios contextMenu

  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  };

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    longPressTimeout.current = setTimeout(() => {
      const touch = event.touches[0];
      setContextPixelCords({ x: touch.pageX, y: touch.pageY });
      setIsContextOpen(true);
    }, 500);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
  }, []);


  return (
    <>
      {loading && <Spinner position='absolute'/>}
      <div className={classes.cover}>
        <Sidebar events={events} isOpen={isSidebarOpen}/>
        <YLoginButton currentUser={currentUser}/>
        <MyRange
          min={100}
          max={2000}
          step={100}
          value={searchRadius}
          onChange={setSearchRadius}
        />
        <button 
          className={classes.about}
          onClick={() => {setModalContent(<About/>); setIsModalOpen(true)}}
          >
          <img src={info} alt='info'/>
        </button>
      </div>
      <div 
        className={classes.Map}
        onContextMenu={!isIOS() ? contextMenuHandler : undefined}
        onTouchStart={isIOS() ? handleTouchStart : undefined}
        onTouchEnd={isIOS() ? handleTouchEnd : undefined}
      >
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
            <YMapListener onTouchStart={getMapCords} />
            {events?.map((event) => (
              <MyMarker
                key={event._id}
                markerData={event}
                onClick={() => onMarkerClick(event)}
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
