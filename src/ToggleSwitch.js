import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ checked, onChange }) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div className={`toggle-switch ${checked ? 'checked' : ''}`} onClick={handleToggle}>
      <div className="slider"></div>
    </div>
  );
};

export default ToggleSwitch;
