import React from 'react';
import { YMapMarker } from 'ymap3-components';
import classes from './index.module.css';
import { LngLat } from '@yandex/ymaps3-types';
import EventCard from '../EventCard';
import { MyEvent } from '../../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { setIsCommentOpen, setIsSidebarOpen } from '../../../store/slices/refSlice';
import { categories } from '../../../utils';

interface MarkerProps {
  markerData: MyEvent
  onClick: () => void;
  activeId: string;
}

const MyMarker: React.FC<MarkerProps> = ({ markerData, onClick, activeId }) => {
  const cords: LngLat = [markerData.coordinates[0], markerData.coordinates[1]];
  const isActive = markerData._id === activeId;
  const sidebarRef = useSelector((state: RootState) => state.ref);
  const dispatch = useDispatch()

  const handleCommentClick = (id: string, ref: React.MutableRefObject<HTMLDivElement | null>) => {
    dispatch(setIsSidebarOpen(true))
    dispatch(setIsCommentOpen(markerData._id))
    const element = document.getElementById(id);
    if (element && ref.current) {
      ref.current.scrollTo({
        top: element.offsetTop,
      });
    }
  };

  return (
    <YMapMarker coordinates={cords} onClick={onClick} zIndex={isActive ? 999 : 0}>
      <div className={classes.point}></div>
      <div className={classes.MyMarker}>
        {isActive ? (
          <EventCard id={markerData._id} activeId={activeId} markerData={markerData} style={{ position: 'absolute' }} onComment={() => handleCommentClick(markerData._id, sidebarRef)}/>
        ) : (
          <div className={classes.head}>
            <img 
              className={classes.category}
              src={categories.find((category) => category.type === markerData.type)?.src} 
              alt={categories.find((category) => category.type === markerData.type)?.type}
              />
          </div>
        )}
        <div className={classes.tail} style={{ borderTop: isActive ? '8px solid #222327' : '8px solid #ff3333' }}></div>
      </div>
    </YMapMarker>
  );
};

export default MyMarker;
