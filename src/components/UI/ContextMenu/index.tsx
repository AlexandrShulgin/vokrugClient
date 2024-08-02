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

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  isContextOpen,
  onClose,
  onCreateMarker,
  onSetSearchCenter,
}) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }
  }, [ref.current]);

  if (!isContextOpen) return null;

  const adjustedX = x - width > 0 ? x - width : x;
  const adjustedY = y - height > 0 ? y - height : y;

  return (
    <div
      onContextMenu={(e) => e.stopPropagation()}
      ref={ref}
      className={[classes.ContextMenu, classes.fade].join(' ')}
      style={{ top: `${adjustedY}px`, left: `${adjustedX}px` }}
    >
      <div className={classes.header} onClick={onClose}>
        &times;
      </div>
      <div className={classes.menuItem} onClick={onCreateMarker}>
        Добавить событие в этой точке
      </div>
      <div className={classes.menuItem} onClick={onSetSearchCenter}>
        Посмотреть события вокруг этой точки
      </div>
    </div>
  );
};

export default ContextMenu;
