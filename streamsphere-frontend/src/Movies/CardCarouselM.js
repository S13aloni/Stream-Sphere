import React, { useState, useEffect } from 'react';
import styles from './CardCarouselM.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CardCarouselM = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Adjust the timing as needed
    return () => clearInterval(interval);
  }, [movies]);

  const getSlideClass = (index) => {
    if (index === currentIndex) return styles.activeSlide;
    if (index === (currentIndex - 1 + movies.length) % movies.length) return styles.prevSlide;
    if (index === (currentIndex + 1) % movies.length) return styles.nextSlide;
    return styles.hiddenSlide;
  };

  const handleCardClick = (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-'); // Convert title to slug format
    navigate(`/movies/${slug}`);
  };

  return (
    <div className={styles.carouselContainer}>
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`${styles.carouselItem} ${getSlideClass(index)}`}
          onClick={() => handleCardClick(movie.title)}
        >
          <img src={movie.image} alt={movie.title} className={styles.image} />
          <div className={styles.details}>
            <h1 className={styles.movieTitle}>{movie.title}</h1>
            <p>{movie.genre}</p>
            <p>{movie.rating}</p>
            <p>{movie.duration}</p>
            <p>{movie.release_year}</p>
            <div className={styles.buttonContainer}>
              <button className={styles.button}>
                <FontAwesomeIcon icon={faPlay} className={styles.icon} />
                Watch Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCarouselM;
