import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FilterM.css'; // Importing the CSS file for styling

const FilterM = () => {
  const [movieList, setMovieList] = useState([]); // State to hold the list of movies
  const [filteredMovies, setFilteredMovies] = useState([]); // State for filtered movies
  const [selectedGenre, setSelectedGenre] = useState('All'); // Track the selected genre
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of movies from the API
    fetch('http://localhost:8000/api/movies/') // Assuming this is the endpoint for movies
      .then((response) => response.json())
      .then((data) => {
        setMovieList(data); // Set the movie list
        setFilteredMovies(data); // Initially show all movies
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  // Function to handle genre filtering
  const handleFilter = (genre) => {
    setSelectedGenre(genre);
    if (genre === 'All') {
      setFilteredMovies(movieList); // Show all movies if "All" is selected
    } else {
      // Filter movies that include the selected genre in their genre string
      const filtered = movieList.filter((movie) =>
        movie.genre.split('|').map(g => g.trim()).includes(genre)
      );
      setFilteredMovies(filtered);
    }
  };

  // Handle card click to navigate to the movie details page
  const handleCardClick = (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-'); // Convert title to slug format
    navigate(`/${slug}`); // Navigate to the movie's details page
  };

  // Get unique genres for filter buttons by splitting movie genres and ensuring no duplicates
  const uniqueGenres = ['All', ...new Set(movieList.flatMap((movie) => 
    movie.genre.split('|').map(g => g.trim())
  ))];

  return (
    <div className="movies-showcase-container-filter">
      <h2 className="movie-title-filter">Top Movies</h2>

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

      {/* Movies Grid */}
      <div className="movie-grid-filter">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card-filter"
            onClick={() => handleCardClick(movie.title)}
          >
            <img src={movie.image} alt={movie.title} className="movie-image-filter" />
            <h3 className="movie-name-filter">{movie.title}</h3>
            <p className="movie-genre-filter">Genre: {movie.genre}</p>
            <p className="movie-rating-filter">Rating: {movie.rating}</p>
            <p className="movie-year-filter">Year: {movie.release_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterM;
