import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './MasonryLayoutM.css'; // Ensure you have a CSS file for styling

const MasonryLayoutM = ({ movies }) => (
  <div className="masonry-layout">
    {movies.map(movie => (
      <div key={movie.id} className="masonry-item">
        <Link to={`/movies/${movie.slug}`} className="masonry-link"> {/* Wrap with Link */}
          <img src={movie.image} alt={movie.title} />
          <h4>{movie.title}</h4>
        </Link>
      </div>
    ))}
  </div>
);

export default MasonryLayoutM;
