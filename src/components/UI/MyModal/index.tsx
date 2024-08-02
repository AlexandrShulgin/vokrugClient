import React, { ReactNode } from 'react';
import classes from './index.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const MyModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={classes.MyModal} onClick={onClose} onContextMenu={(e) => e.stopPropagation()}>
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header} onClick={onClose}>
          &times;
        </div>
        {children}
      </div>
    </div>
  );
};

export default MyModal;