import React from 'react';
import './MoviesCarouselM.css';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Slider from 'react-slick';

const MoviesCarousel = ({ movies }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
    };

    return (
      <div className='div-timeline'>
        <h1 className='heading-webcare'>Movies</h1>
        <div className="timeline">
          <Slider {...settings}>
            {movies.map((movie) => (
              <div className="timeline-item" key={movie.id}>
                 <Link to={`/movies/${movie.slug}`} className="timeline-content">
                  <img src={movie.image} alt={movie.title} />
                  <h4>{movie.title}</h4>
                  <p>Rating: {movie.rating} IMDb</p>
                  <p>Seasons: {movie.duration}</p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        </div>
      );
};

export default MoviesCarousel;
