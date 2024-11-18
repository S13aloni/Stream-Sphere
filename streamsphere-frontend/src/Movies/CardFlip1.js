import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './CardFlip1.css';

const CardFlip1 = ({ movies }) => {
  return (
    <div className="card-container-flip">
      {movies.map((movie) => (
        <Link to={`/movies/${movie.slug}`} key={movie.id} className="card-link-flip"> {/* Make the card clickable */}
          <div className="card-flip">
            <div className="card-inner-flip">
              <div className="card-front-flip">
                <img src={movie.image} alt={movie.title} />
                <h4 className="cardheading4-flip">{movie.title}</h4>
              </div>
              <div className="card-back-flip">
                <h4 className="cardheading4-flip">{movie.title}</h4>
                <p>Rating: {movie.rating}</p>
                {/* <p>Seasons: {movie.seasons}</p> */}
                <p>{movie.genre} | {movie.release_year}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardFlip1;
