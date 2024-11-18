import React, { useState, useEffect, useRef } from 'react';
import './VideoBanner.css'; // Ensure the CSS file is created and styled correctly

const VideoBanner = ({ videobanners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  // Automatically switch video every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === videobanners.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [videobanners.length]);

  // When currentIndex changes, load and play the video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.load();
  
      const handleLoadedData = () => {
        videoRef.current.play().catch((err) => {
          console.error("Error playing video:", err);
        });
      };
  
      videoRef.current.addEventListener('loadeddata', handleLoadedData);
  
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', handleLoadedData);
        }
      };
    }
  }, [currentIndex]);
  
  

  // Avoid video loading if no banners available
  if (!videobanners || videobanners.length === 0) {
    return <div>No videos available</div>;
  }

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % videobanners.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? videobanners.length - 1 : currentIndex - 1
    );
  };

  const videoUrl = `http://localhost:8000/${videobanners[currentIndex].video}`;

  return (
    <div className="carouselContainerV">
      <div className="video-bannerV">
        <video ref={videoRef} className="banner-videoV" autoPlay loop>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="bannerContentV">
          <h1 className="bannerTitleV">{videobanners[currentIndex].title}</h1>
          <p className="bannerDescriptionV">{videobanners[currentIndex].description}</p>
          {/* <button className="bannerButtonV">Watch Now</button> */}
        </div>
      </div>
      <button className="carouselControlV left" onClick={goToPrevious}>
        &#10094;
      </button>
      <button className="carouselControlV right" onClick={goToNext}>
        &#10095;
      </button>
    </div>
  );
};

export default VideoBanner;
