import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="logo3.jpg" alt="Stream Sphere" />
          <h1>Stream Sphere</h1>
        </div>
        <div className="footer-links">
          {/* <a href="/">Home</a> */}
          <a href="/about-us">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="footer-social">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Stream Sphere. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
