import React, { useState } from 'react';
import classes from './index.module.css';
import EventCard from '../EventCard';
import arrow from '../../../img/arrow.png'
import { MyEvent } from '../../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface SidebarProps {
  events: MyEvent[] | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ events, isOpen, setIsOpen }) => {
  
  return (
    <div className={[classes.Sidebar, !isOpen && classes.closed].join(' ')}>
      <button
        className={classes.toggleSidebar}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={arrow} alt='arrow' style={{transform: isOpen ? "scale(1, -1)" : ""}}/>
      </button>
      
      <div className={classes.events}>
        <div className={classes.search}>
          <input type='text'/>
        </div>
        {events?.map((event) => (
          <EventCard key={event._id} markerData={event} style={{ position: 'unset' }} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
