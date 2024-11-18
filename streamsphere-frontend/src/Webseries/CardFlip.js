import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './CardFlip.css';

const CardFlip = ({ webSeries }) => {
  return (
    <div className="card-container-flip">
      {webSeries.map((series) => (
        <Link to={`/webseries/${series.slug}`} key={series.id} className="card-link-flip"> {/* Make the card clickable */}
          <div className="card-flip">
            <div className="card-inner-flip">
              <div className="card-front-flip">
                <img src={series.image} alt={series.title} />
                <h4 className="cardheading4-flip">{series.title}</h4>
              </div>
              <div className="card-back-flip">
                <h4 className="cardheading4-flip">{series.title}</h4>
                <p>Rating: {series.rating} IMDb</p>
                <p>Seasons: {series.seasons}</p>
                <p>{series.genre} | {series.release_year}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardFlip;
