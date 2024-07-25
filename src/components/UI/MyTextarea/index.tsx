import React, { useState, ChangeEvent } from 'react';
import classes from './index.module.css'

interface MyTextareaProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  rows?: number;
  cols?: number;
  maxLength?: number;
}

const MyTextarea: React.FC<MyTextareaProps> = ({
  value = '',
  placeholder = '',
  onChange,
  maxLength = 250,
}) => {
  const [text, setText] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (maxLength && newValue.length <= maxLength) {
      setText(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <textarea className={classes.MyTextarea}
      value={text}
      placeholder={placeholder}
      onChange={handleChange}
      maxLength={maxLength}
    />
  );
};

export default MyTextarea;