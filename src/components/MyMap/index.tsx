import React, { useState, useCallback, useEffect } from "react";
import { YMap, YMapComponentsProvider, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener, YMapControls, YMapGeolocationControl, YMapZoomControl, YMapDefaultMarker } from "ymap3-components";
import { location as LOCATION, apiKey } from "./helpers";
import * as YMaps from "@yandex/ymaps3-types";
import { LngLat } from "@yandex/ymaps3-types";
import classes from './index.module.css';
import ContextMenu from "../UI/ContextMenu";
import axios from "axios";
import eventApi from "../../api/eventApi";

interface Location {
  center: LngLat;
  zoom: number;
}

interface Marker {
  coordinates: [number, number];
}

const MyMap: React.FC = () => {
  const [location, setLocation] = useState<Location>(LOCATION);
  const [ymap, setYmap] = useState<YMaps.YMap | null>(null);
  const [contextVisible, setContextVisible] = useState<boolean>(false);
  const [contextPixelCords, setContextPixelCords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [clickMapCords, setClickMapCords] = useState<[number, number] | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([{ coordinates: [37.95, 55.65] }]);

  useEffect(() => {
    eventApi.getAllEvents()
      .then((data) => setMarkers(data))
  }, [])

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
    setContextVisible(true);
  };

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
          <YMapListener onContextMenu={getMapCords} />
          {markers.map((marker, index) => (
            <YMapDefaultMarker key={index} coordinates={marker.coordinates} />
          ))}
        </YMap>
      </YMapComponentsProvider>
      <ContextMenu 
        x={contextPixelCords.x} 
        y={contextPixelCords.y} 
        contextVisible={contextVisible} 
        setContextVisible={setContextVisible}
        clickMapCords={clickMapCords}
        markers={markers}
        setMarkers={setMarkers} 
      />
    </div>
  );
};

export default MyMap;
