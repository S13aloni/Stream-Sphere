// src/components/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './MovieCard.css'; // Custom CSS for styling

const MovieCard = ({ title, genre, rating, duration, quality, release_year, image, slug }) => {
  return (
    <Link to={`/movies/${slug}`} className="movie-card-homepg"> {/* Wrap card content with Link */}
      <img src={image} alt={title} className="movie-image" />
      <div className="movie-info">
        <h2 className="movieTitleMC">{title}</h2>
        <div className="movie-details">
          <span className="movie-genre">{genre}</span>
          <span className="movie-rating">Rating: {rating}</span>
          <span className="movie-duration">Duration: {duration}</span>
          <span className="movie-year">Year: {release_year}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
