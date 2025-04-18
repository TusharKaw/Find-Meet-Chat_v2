import React from 'react';
import { Navigate } from 'react-router-dom';

// For demonstration purposes, we'll just check if there's a token in localStorage
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute; 