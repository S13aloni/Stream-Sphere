import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './BubbleLayout.css';

const BubbleLayout = ({ webSeries }) => {
  const topRatedSeries = [...webSeries]
    .sort((a, b) => b.rating - a.rating) // Sort by rating
    .slice(0, 5); // Get top 5

  return (
    <div className='div-toprated'>
      <h1 className='h1-bubble'>Top Rated WebSeries</h1>
      <div className="bubble-container">
        {topRatedSeries.map((series, index) => (
          <Link to={`/webseries/${series.slug}`} key={series.id} className="bubble-link"> {/* Make bubble clickable */}
            <div className="bubble">
              <img src={series.image} alt={series.title} />
              <div className="ranking-number">{index + 1}</div> {/* Display ranking number */}
              <div className="title-overlay">
                <h4>{series.title}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BubbleLayout;
