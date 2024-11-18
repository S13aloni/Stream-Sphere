import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './HoverGrid.css'; // Ensure you have a CSS file for styling

const HoverGrid = ({ webSeries }) => {
  // Filter for Romance genre series
  const romanceSeries = webSeries.filter(series => series.genre.toLowerCase() === 'romance');

  return (
    <div className="romance-series-section">
      <h2 className="romance-title">Romance Web Series</h2> {/* Add a heading for Romance series */}

      <div className="hover-grid">
        {romanceSeries.map(series => (
          <Link to={`/webseries/${series.slug}`} key={series.id} className="hover-card">
            <img src={series.image} alt={series.title} />
            <div className="hover-info">
              <h4>{series.title}</h4>
              <p>{series.rating} IMDb</p>
              <p>{series.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HoverGrid;
