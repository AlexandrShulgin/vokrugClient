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
  const [menuDimensions, setMenuDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setMenuDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, [ref.current]);

  if (!isContextOpen) return null;

  const adjustedX = Math.min(x, window.innerWidth - menuDimensions.width);
  const adjustedY = Math.min(y, window.innerHeight - menuDimensions.height);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
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
