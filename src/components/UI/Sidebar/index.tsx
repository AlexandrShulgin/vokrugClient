import React, { useEffect, useRef, useState } from 'react';
import classes from './index.module.css';
import EventCard from '../EventCard';
import arrow from '../../../img/arrow.png'
import { MyEvent } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setIsSidebarOpen, setSidebarRef } from '../../../store/slices/refSlice';

interface SidebarProps {
  events: MyEvent[] | undefined;
  isOpen: boolean;
  
}

const Sidebar: React.FC<SidebarProps> = ({ events, isOpen }) => {
  
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setSidebarRef(sidebarRef.current))
  }, [sidebarRef])

  return (
    <div className={[classes.Sidebar, !isOpen && classes.closed].join(' ')}>
      <button
        className={classes.toggleSidebar}
        onClick={() => dispatch(setIsSidebarOpen(!isOpen))}
      >
        <img src={arrow} alt='arrow' style={{transform: isOpen ? "scale(1, -1)" : ""}}/>
      </button>
      
      <div ref={sidebarRef} className={classes.events}>
        <div className={classes.search}>
          <input type='text'/>
        </div>
        {events?.map((event) => (
          <EventCard id={event._id} key={event._id} markerData={event} style={{ position: 'unset' }}/>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
