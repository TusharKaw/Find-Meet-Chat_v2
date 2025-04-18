import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  const [alerts, setAlerts] = useState([]);
  
  // Set alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setAlerts([...alerts, { id, msg, type }]);
    
    setTimeout(() => setAlerts(alerts.filter(alert => alert.id !== id)), timeout);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Find-Meet-Chat</h1>
          <p>A MERN Stack Application</p>
        </header>
      </div>
    </Router>
  );
};

export default App; 