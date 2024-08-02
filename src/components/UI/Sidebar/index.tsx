import React, { useState } from 'react';
import classes from './index.module.css';
import EventCard from '../EventCard';
import arrow from '../../../img/arrow.png'

interface Marker {
  address: {
    name: string;
    description: string;
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

interface SidebarProps {
  markers: Marker[] | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ markers, isOpen, setIsOpen }) => {
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
        {markers?.map((marker) => (
          <EventCard key={marker._id} markerData={marker} style={{ position: 'unset' }} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
