import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './HoverGridM.css'; // Ensure you have a CSS file for styling

const HoverGridM = ({ movies }) => {
  // Filter for Romance genre series
  const thrillerMovies = movies.filter(movie => 
    movie.genre.toLowerCase().includes('thriller')
  );

  return (
    <div className="romance-series-section">
      <h2 className="romance-title">Thriller Movies</h2>

      <div className="hover-grid">
        {thrillerMovies.map(movie => (
          <Link to={`/movies/${movie.slug}`} key={movie.id} className="hover-card">
            <img src={movie.image} alt={movie.title} />
            <div className="hover-info">
              <h4>{movie.title}</h4>
              <p>{movie.rating} IMDb</p>
              <p>{movie.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HoverGridM;
