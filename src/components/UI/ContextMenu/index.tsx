import React, { useEffect, useRef, useState } from 'react';
import classes from './index.module.css';
import axios from 'axios';
import eventApi from '../../../api/eventApi'
import { useContainerDimensions } from '../../../hooks/useConteinerDimensions';

interface ContextMenuProps {
  x: number;
  y: number;
  isContextOpen: boolean;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({x, y, isContextOpen, onClose}) => {
  
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 0)
    setHeight(ref.current ? ref.current.offsetHeight : 0);
  }, [ref.current]);

  const calculatePosition = () => {
  
  }

  if (!isContextOpen) return null 
  return (
    <div
      onContextMenu={(e) => e.stopPropagation()}
      ref={ref} 
      className={classes.ContextMenu} 
      style={{top: `calc(${y}px - ${height}px)`, left: `${x}px`}}
      >
      <div className={classes.header} onClick={onClose}> &times;</div>
      <div className={classes.menuItem}>Добавить событие в этой точке</div>
      <div className={classes.menuItem}>Посмотреть события вокруг этой точки</div>
    </div>
  );
};

export default ContextMenu;
