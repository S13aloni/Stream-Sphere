import React from 'react';
import './WebCarousel.css';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Slider from 'react-slick';

const WebCarousel = ({ webSeries }) => {
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
        <h1 className='heading-webcare'>WebSeries</h1>
        <div className="timeline">
          <Slider {...settings}>
            {webSeries.map((series) => (
              <div className="timeline-item" key={series.id}>
                 <Link to={`/webseries/${series.slug}`} className="timeline-content">
                  <img src={series.image} alt={series.title} />
                  <h4>{series.title}</h4>
                  <p>Rating: {series.rating} IMDb</p>
                  <p>Seasons: {series.seasons}</p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        </div>
      );
};

export default WebCarousel;
