import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import styles from './MovingRatingCard.module.css'; // Import your CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt } from '@fortawesome/free-solid-svg-icons';

const MovingRatingCard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Fetch movies from the backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/movies/');
        setMovies(response.data); // Set the fetched movies data
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies(); // Call the function to fetch movies when component mounts
  }, []);

  // Parse the rating (out of 10) and convert it to a 5-star rating
  const parseRating = (rating) => {
    const numericRating = parseFloat(rating) || 0; // Ensure the rating is numeric
    return Math.round(numericRating / 2); // Convert 10-point rating to 5 stars
  };

  // Handle card click and navigate to the movie detail page
  const handleCardClick = (slug) => {
    navigate(`/movies/${slug}`); // Navigate to the dynamic route for each movie
  };

  const handleSeeAllClick = () => {
    navigate('/movies'); // Navigate to the /movies page when button is clicked
  };

  const carouselItems = [...movies, ...movies]; // Duplicate items for seamless loop

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.headingContainer}>
        <div className={styles.headingIconContainer}>
          <h1 className={styles.carouselHeading}>Trending Movies</h1>
          <FontAwesomeIcon icon={faBolt} className={styles.thunderIcon} />
        </div>
        <button className={styles.seeAllButton} onClick={handleSeeAllClick}>
          See All
        </button>
      </div>
      <div className={styles.carouselWrapper}>
        <div className={styles.Carousel}>
          {carouselItems.map((item, index) => {
            const stars = parseRating(item.rating); // Convert 10-point rating to 5-star scale

            return (
              <div
                key={index}
                className={styles.carouselItem}
                onClick={() => handleCardClick(item.slug)} // Navigate to slug on card click
              >
                <img src={item.image} alt={item.title} />
                <div className={styles.carouselDetails}>
                  <h3 className={styles.movieTitle}>{item.title}</h3>
                  <div className={styles.movieRating}>
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={styles.ratingStar}
                        style={{
                          color: i < stars ? '#FFD700' : '#ccc', // Fill stars based on rating
                        }}
                      />
                    ))}
                  </div>
                  <p className={styles.movieDescription}>{item.genre}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovingRatingCard;
