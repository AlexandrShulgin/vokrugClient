import React, { ChangeEvent, CSSProperties } from 'react';
import classes from './index.module.css';

interface MyTextareaProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  rows?: number;
  cols?: number;
  maxLength?: number;
  style?: CSSProperties;
}

const MyTextarea: React.FC<MyTextareaProps> = ({
  value = '',
  placeholder = '',
  onChange,
  maxLength = 250,
  style
}) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (maxLength && newValue.length <= maxLength) {
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <textarea
      className={classes.MyTextarea}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      maxLength={maxLength}
      style={style}
    />
  );
};

export default MyTextarea;
