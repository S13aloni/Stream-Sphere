import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Filter.css'; // Importing the CSS file for styling

const Filter = () => {
  const [webSeriesList, setWebSeriesList] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]); // State for filtered series
  const [selectedGenre, setSelectedGenre] = useState('All'); // Track the selected genre
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of web series from the API
    fetch('http://localhost:8000/api/webseries/')
      .then((response) => response.json())
      .then((data) => {
        setWebSeriesList(data);
        setFilteredSeries(data); // Initially show all series
      })
      .catch((error) => {
        console.error('Error fetching web series:', error);
      });
  }, []);

  // Function to handle genre filtering
  const handleFilter = (genre) => {
    setSelectedGenre(genre);
    if (genre === 'All') {
      setFilteredSeries(webSeriesList); // Show all series if "All" is selected
    } else {
      const filtered = webSeriesList.filter((series) => series.genre === genre);
      setFilteredSeries(filtered);
    }
  };

  // Handle card click to navigate to the web series details page
  const handleCardClick = (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-'); // Convert title to slug format
    navigate(`/${slug}`);
  };

  // Get unique genres for filter buttons
  const uniqueGenres = ['All', ...new Set(webSeriesList.map((series) => series.genre))];

  return (
    <div className="webseries-showcase-container-filter">
      <h2 className="webseries-title-filter">Top Web Series</h2>

      {/* Genre Filter Buttons */}
      <div className="genre-filters">
        {uniqueGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleFilter(genre)}
            className={`filter-button ${selectedGenre === genre ? 'active' : ''}`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Web Series Grid */}
      <div className="webseries-grid-filter">
        {filteredSeries.map((series) => (
          <div
            key={series.id}
            className="webseries-card-filter"
            onClick={() => handleCardClick(series.title)}
          >
            <img src={series.image} alt={series.title} className="webseries-image-filter" />
            <h3 className="webseries-name-filter">{series.title}</h3>
            <p className="webseries-genre-filter">Genre: {series.genre}</p>
            <p className="webseries-rating-filter">Rating: {series.rating}</p>
            <p className="webseries-year-filter">Year: {series.release_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
