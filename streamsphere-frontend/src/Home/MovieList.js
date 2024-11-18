// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import MovieCard from '../Home/MovieCard';
import './MovieList.css';  // Custom CSS for styling

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch movies from the API when the component mounts
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/movies/');  // Adjust URL if necessary
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array means this effect runs once on mount

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? movies.length - 4 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= movies.length - 4 ? 0 : prevIndex + 1
    );
  };

  const visibleMovies = movies.slice(currentIndex, currentIndex + 4);

  return (
    <div className="movie-carousel-container">
      <h2 className="movie-heading">Movies</h2>
      <div className="movie-carousel">
        <button className="carousel-button prev-button" onClick={handlePrevClick}>
          &#9664;
        </button>
        <div className="movie-list">
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
        <button className="carousel-button next-button" onClick={handleNextClick}>
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default MovieList;
