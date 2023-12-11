// TextColorPicker.js
import React from 'react';
import { ChromePicker } from 'react-color';

const TextColorPicker = ({ color, onChange }) => {
  return (
    <div>
      <label>Select Text Color:</label>
      <ChromePicker color={color} onChange={onChange} />
    </div>
  );
};

export default TextColorPicker;
