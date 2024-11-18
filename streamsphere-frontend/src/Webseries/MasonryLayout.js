import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './MasonryLayout.css'; // Ensure you have a CSS file for styling

const MasonryLayout = ({ webSeries }) => (
  <div className="masonry-layout">
    {webSeries.map(series => (
      <div key={series.id} className="masonry-item">
        <Link to={`/webseries/${series.slug}`} className="masonry-link"> {/* Wrap with Link */}
          <img src={series.image} alt={series.title} />
          <h4>{series.title}</h4>
        </Link>
      </div>
    ))}
  </div>
);

export default MasonryLayout;
