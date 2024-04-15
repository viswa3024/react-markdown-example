import React, { useState } from 'react';
import MarkdownComponent from './MarkdownComponent';
import ToggleSwitch from './ToggleSwitch';
import './App.css'

const App = () => {
  const [isChecked, setChecked] = useState(false);

  const handleToggle = (newState) => {
    console.log('newState: ', newState)
    setChecked(newState);
  };

  return (
    <div className='app-div'>
      <MarkdownComponent  />
    </div>
  );
};

export default App;
