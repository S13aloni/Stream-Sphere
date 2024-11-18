import React, { useState, useEffect, useRef } from 'react';
import './VideoWebseries.css'; // Ensure the CSS file is created and styled correctly

const VideoBannerW = ({ videobanners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  // Filter videobanners for those of type "movie"
  const filteredVideos = videobanners.filter(video => video.type === 'Webseries');

  // Automatically switch video every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === filteredVideos.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [filteredVideos.length]);

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
  
  // Avoid video loading if no filtered videos available
  if (!filteredVideos || filteredVideos.length === 0) {
    return <div>No movies available</div>;
  }

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % filteredVideos.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? filteredVideos.length - 1 : currentIndex - 1
    );
  };

  const videoUrl = `http://localhost:8000/${filteredVideos[currentIndex].video}`;

  return (
    <div className="carouselContainerV">
      <div className="video-bannerV">
        <video ref={videoRef} className="banner-videoV" autoPlay loop>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="bannerContentV">
          <h1 className="bannerTitleV">{filteredVideos[currentIndex].title}</h1>
          <p className="bannerDescriptionV">{filteredVideos[currentIndex].description}</p>
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

export default VideoBannerW;
