// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import './WebList.css';  // Custom CSS for styling
import WebCard from './WebCard';

const WebList = () => {
  const [webSeries, setWebSeries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch movies from the API when the component mounts
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/webseries/');  // Adjust URL if necessary
        setWebSeries(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array means this effect runs once on mount

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? webSeries.length - 4 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= webSeries.length - 4 ? 0 : prevIndex + 1
    );
  };

  const visibleMovies = webSeries.slice(currentIndex, currentIndex + 4);

  return (
    <div className="movie-carousel-container">
      <h2 className="movie-heading">Webseries</h2>
      <div className="movie-carousel">
        <button className="carousel-button prev-button" onClick={handlePrevClick}>
          &#9664;
        </button>
        <div className="movie-list">
          {visibleMovies.map((webseries) => (
            <WebCard key={webseries.id} {...webseries} />
          ))}
        </div>
        <button className="carousel-button next-button" onClick={handleNextClick}>
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default WebList;
