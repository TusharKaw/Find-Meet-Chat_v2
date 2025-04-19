import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/pages/Home';
import Requests from './components/pages/Requests';
import Messages from './components/pages/Messages';
import Profile from './components/pages/Profile';
import Settings from './components/pages/Settings';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
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
        <Navbar />
        <Alert alerts={alerts} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register setAlert={setAlert} />} />
          <Route path="/login" element={<Login setAlert={setAlert} />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/requests" 
            element={
              <PrivateRoute>
                <Requests />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/messages" 
            element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile/:id" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 