import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './MovieDetailsPage.css'; // Add styles as needed
import { FaPlay } from 'react-icons/fa'; // Import the play icon
import LoadingScreen from './LoadingScreen';

const MovieDetailsPage = () => {
  const { slug } = useParams(); // Extract the slug from the URL
  const navigate = useNavigate(); // Initialize navigate function
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false); // Manage description expansion

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/movies/${slug}/`);
        setMovie(response.data);
      } catch (err) {
        setError('Error fetching movie details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [slug]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) return <LoadingScreen/>
  if (error) return <p>{error}</p>;

  const handleToggleDescription = () => {
    setExpanded(!expanded);
  };

  const descriptionText = expanded ? movie.description : movie.description.substring(0, 200) + '...';

  const handleSubscribeClick = () => {
    navigate('/subscriptionplan'); // Use navigate to programmatically navigate
  };

  return (
    <div className="movie-details-page">
      <Navbar />
      {movie && (
        <div className="movie-details-hero">
          <img
            src={`http://localhost:8000/${movie.image}`}
            alt={movie.title}
            className="movie-details-hero-image"
          />
          <div className="movie-details-overlay">
            <div className="movie-details-info">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-rating">Rating: {movie.rating}</p>
              <p className="movie-genre">Genre: {movie.genre}</p>
              <p className="movie-quality">Quality: {movie.quality}</p>
              {/* <p className="movie-year">Release Year: {movie.year}</p> */}
              <p className="movie-description">
                {descriptionText}
                <span onClick={handleToggleDescription} className="view-more-link">
                  {expanded ? ' View Less' : ' View More'}
                </span>
              </p>
              <button className="subscribe-button" onClick={handleSubscribeClick}>
                <FaPlay className="play-icon" />
                Subscribe to Watch
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MovieDetailsPage;
