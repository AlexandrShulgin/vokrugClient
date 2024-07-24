import React from 'react';
import classes from './index.module.css';
import axios from 'axios';
import eventApi from '../../../api/eventApi'

interface ContextMenuProps {
  x: number;
  y: number;
  contextVisible: boolean;
  setContextVisible: (visible: boolean) => void;
  clickMapCords: [number, number] | null;
  markers: { coordinates: [number, number] }[];
  setMarkers: (markers: { coordinates: [number, number] }[]) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, contextVisible, setContextVisible, clickMapCords, markers, setMarkers }) => {
  const menuItems = [
    {
      title: "Добавить событие в этой точке",
      action: async () => {
        if (clickMapCords) {
          await eventApi.createEvent('test', 'test', clickMapCords, 1)
          setContextVisible(false);
        }
      }
    },
    {
      title: "Посмотреть события вокруг этой точки",
      action: () => {},
    },
  ];

  if (!contextVisible) return null;

  return (
    <div 
      style={{ top: `calc(${y}px - 75px)`, left: `${x}px` }}
      className={classes.ContextMenu}
      onContextMenu={(e) => e.preventDefault()}
    >
      {menuItems.map((item, index) => (
        <div 
          key={index}
          className={classes.menuItem}
          onClick={item.action}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
