import React, { useState } from "react";
import { YMap, YMapComponentsProvider, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener, YMapControls, YMapGeolocationControl, YMapZoomControl, YMapFeature, YMapMarker, YMapDefaultMarker, } from "ymap3-components";

import { location as LOCATION, apiKey } from "./helpers";
import * as YMaps from "@yandex/ymaps3-types";
import { LngLat } from "@yandex/ymaps3-types";
import classes from './index.module.css'
import ContextMenu from "../ContextMenu";

const MyMap = () => {
  const [location, setLocation] = useState(LOCATION);
  const [ymap, setYmap] = useState<YMaps.YMap>();

  const [contextVisible, setContextVisible] = useState(false)
  const [contextPixelCords, setContextPixelCords] = useState({x: 0, y: 0})

  const [clickMapCords, setClickMapCords] = useState()

  const [markers, setMarkers] = useState<any>([
    {
      coordinates: [37.95, 55.65]
    },
  ])

  const onUpdate = React.useCallback(({ location, mapInAction }: any) => {
    if (!mapInAction) {
      setLocation({
        center: location.center,
        zoom: location.zoom,
      });
    }
  }, []);

  const getMapCords = (object: any, event: any) => {
    console.log(event.coordinates);
    setClickMapCords(event.coordinates)
  }

  const contextMenuHandler = (event:any) => {
    const [x, y] = [event.pageX, event.pageY];
    setContextPixelCords({x: x, y: y})
    setContextVisible(true)
  }

  return (
    <div className={classes.Map} onContextMenu={contextMenuHandler}>
      {/* <MapLocation location={location} /> */}
      <YMapComponentsProvider apiKey={apiKey} lang="ru_RU">
        <YMap
          key="map"
          ref={(ymap: YMaps.YMap) => setYmap(ymap)}
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
          <YMapListener onContextMenu={getMapCords}/>
          {markers.map((marker: any) => (
            <YMapDefaultMarker coordinates={marker.coordinates}/>
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
        setMarkers={setMarkers}/>
    </div>
  );
}

export default MyMap;
