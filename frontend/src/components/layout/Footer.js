import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <div className="container">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Find-Meet-Chat</p>
          <div className="social-icons">
            <a href="#!" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#!" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#!" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#!" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 