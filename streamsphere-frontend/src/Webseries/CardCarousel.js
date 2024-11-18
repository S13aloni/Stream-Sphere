import React, { useState, useEffect } from 'react';
import styles from './CardCarousel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CardCarousel = ({ webSeries }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % webSeries.length);
    }, 5000); // Adjust the timing as needed
    return () => clearInterval(interval);
  }, [webSeries]);

  const getSlideClass = (index) => {
    if (index === currentIndex) return styles.activeSlide;
    if (index === (currentIndex - 1 + webSeries.length) % webSeries.length) return styles.prevSlide;
    if (index === (currentIndex + 1) % webSeries.length) return styles.nextSlide;
    return styles.hiddenSlide;
  };

  const handleCardClick = (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-'); // Convert title to slug format
    navigate(`/webseries/${slug}`);
  };

  return (
    <div className={styles.carouselContainer}>
      {webSeries.map((series, index) => (
        <div
          key={series.id}
          className={`${styles.carouselItem} ${getSlideClass(index)}`}
          onClick={() => handleCardClick(series.title)}
        >
          <img src={series.image} alt={series.title} className={styles.image} />
          <div className={styles.details}>
            <h1 className={styles.movieTitle}>{series.title}</h1>
            <p>{series.genre}</p>
            <p>{series.rating}</p>
            <p>{series.duration}</p>
            <p>{series.release_year}</p>
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

export default CardCarousel;
