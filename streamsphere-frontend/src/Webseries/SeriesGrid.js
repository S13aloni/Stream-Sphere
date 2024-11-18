import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './SeriesGrid.css'; // Ensure you have a CSS file for styling

const SeriesGrid = ({ webSeries }) => {
  // Filter only thriller series
  const thrillerSeries = webSeries.filter(series => series.genre.toLowerCase() === 'thriller');

  return (
    <div className="thriller-series-section">
      <h2 className="thriller-title">Thriller Web Series</h2> {/* Add a heading for thriller series */}
      
      <div className="series-grid">
        {thrillerSeries.map(series => (
          <div key={series.id} className="series-card">
            <Link to={`/webseries/${series.slug}`} className="series-link">
              <img src={series.image} alt={series.title} />
            </Link>
            <div className="series-info">
              <h4>{series.title}</h4>
              <p>{series.genre} | {series.release_year}</p>
              <p>Rating: {series.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesGrid;
