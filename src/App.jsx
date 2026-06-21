import React, { useState } from 'react';
import './App.css';
import Calculator from './Calculator';

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
        {isDark ? '☀️' : '🌙'}
      </button>
      <Calculator isDark={isDark} />
    </div>
  );
}

export default App;
