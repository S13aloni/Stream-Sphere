// src/components/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

import './WebCard.css'; // Custom CSS for styling

const WebCard = ({ title, genre, rating, seasons, quality, release_year,image,slug }) => {
  return (
    <Link to={`/webseries/${slug}`}  className="movie-card-homepg">
      <img src={image} alt={title} className="movie-image" />
      <div className="movie-info">
        <h2 className="movieTitleMC">{title}</h2>
        <div className="movie-details">
          <span className="movie-genre">{genre}</span>
          <span className="movie-rating">Rating: {rating} IMDb</span>
          <span className="movie-duration">Seansons: {seasons}</span>
          <span className="movie-year">Year: {release_year}</span>
        </div>
      </div>
    </Link>
  );
};

export default WebCard;
