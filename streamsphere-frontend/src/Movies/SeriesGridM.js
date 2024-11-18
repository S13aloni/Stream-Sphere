import React from 'react';
import { Link } from 'react-router-dom';
import './SeriesGridM.css';

const SeriesGridM = ({ movies }) => {
  // Filter movies where the genre includes 'comedy'
  const comedymovies = movies.filter(movie => 
    movie.genre.toLowerCase().includes('comedy')
  );

  return (
    <div className="comedy-movies-section">
      <h2 className="comedy-title">Comedy Movies</h2> {/* Updated title for comedy movies */}
      
      <div className="series-grid">
        {comedymovies.map(movie => (
          <div key={movie.id} className="series-card">
            <Link to={`/movies/${movie.slug}`} className="series-link">
              <img src={movie.image} alt={movie.title} />
            </Link>
            <div className="series-info">
              <h4>{movie.title}</h4>
              <p>{movie.genre} | {movie.release_year}</p>
              <p>Rating: {movie.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesGridM;
