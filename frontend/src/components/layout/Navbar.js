import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Check if user is authenticated (simplified for demo)
  const isAuthenticated = localStorage.getItem('token');
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const authLinks = (
    <>
      <li className={location.pathname === '/home' ? 'active' : ''}>
        <Link to="/home"><i className="fas fa-home"></i> <span className="hide-sm">Home</span></Link>
      </li>
      <li className={location.pathname === '/requests' ? 'active' : ''}>
        <Link to="/requests"><i className="fas fa-user-plus"></i> <span className="hide-sm">Requests</span></Link>
      </li>
      <li className={location.pathname === '/messages' ? 'active' : ''}>
        <Link to="/messages"><i className="fas fa-comment-dots"></i> <span className="hide-sm">Messages</span></Link>
      </li>
      <li className={location.pathname.includes('/profile') ? 'active' : ''}>
        <Link to="/profile/me"><i className="fas fa-user"></i> <span className="hide-sm">Profile</span></Link>
      </li>
      <li className={location.pathname === '/settings' ? 'active' : ''}>
        <Link to="/settings"><i className="fas fa-cog"></i> <span className="hide-sm">Settings</span></Link>
      </li>
      <li>
        <a href="#!" onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}>
          <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className={location.pathname === '/register' ? 'active' : ''}>
        <Link to="/register"><i className="fas fa-user-plus"></i> <span className="hide-sm">Register</span></Link>
      </li>
      <li className={location.pathname === '/login' ? 'active' : ''}>
        <Link to="/login"><i className="fas fa-sign-in-alt"></i> <span className="hide-sm">Login</span></Link>
      </li>
    </>
  );

  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to={isAuthenticated ? "/home" : "/"}>
          <i className="fas fa-comment-dots"></i> FindMeetChat
        </Link>
      </h1>
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={isMobileMenuOpen ? "show-mobile-menu" : ""}>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

export default Navbar; 