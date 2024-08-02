import React, { useState } from 'react';
import classes from './index.module.css';

interface MyRangeProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

const MyRange: React.FC<MyRangeProps> = ({ min, max, step, value, onChange }) => {
  const [internalValue, setInternalValue] = useState<number>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={classes.MyRange}>
      <span>{internalValue} км</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={internalValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default MyRange;
