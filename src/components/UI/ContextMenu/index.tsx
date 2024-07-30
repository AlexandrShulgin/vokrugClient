import React, { useEffect, useRef, useState } from 'react';
import classes from './index.module.css';

interface ContextMenuProps {
  x: number;
  y: number;
  isContextOpen: boolean;
  onClose: () => void;
  onCreateMarker: () => void;
  onSetSearchCenter: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({x, y, isContextOpen, onClose, onCreateMarker, onSetSearchCenter}) => {
  
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [newX, setNewX] = useState<number>(0)
  const [newY, setNewY] = useState<number>(0)
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 0)
    setHeight(ref.current ? ref.current.offsetHeight : 0);
    setNewY(y - height > 0 ? y - height : y)
    setNewX(x - width > 0 ? x - width : x)
  }, [ref.current, x, y]);

  if (!isContextOpen) return null
  return (
    <div
      onContextMenu={(e) => e.stopPropagation()}
      ref={ref} 
      className={[classes.ContextMenu, classes.fade].join(' ')} 
      style={{top: `${newY}px`, left: `${newX}px`}}
      >
      <div className={classes.header} onClick={onClose}> &times;</div>
      <div className={classes.menuItem} onClick={onCreateMarker}>Добавить событие в этой точке</div>
      <div className={classes.menuItem} onClick={onSetSearchCenter}>Посмотреть события вокруг этой точки</div>
    </div>
  );
};

export default ContextMenu;
