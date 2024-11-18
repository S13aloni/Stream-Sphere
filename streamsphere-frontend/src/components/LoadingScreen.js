import React from 'react';
import './LoadingScreen.css'; // Import the updated loading screen CSS

const LoadingScreen = () => {
  return (
    <div className="full-screen-loader">
      <div className="loader-wrapper">
        <div className="spinner-circle"></div>
        <div className="pulse-circle"></div>
        <div className="loading-text">Please Wait...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
