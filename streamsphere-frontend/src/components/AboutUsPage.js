import React from 'react';
import './AboutUsPage.css';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUsPage = () => {
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-hero">
        <h1 className="about-heading">About Stream Sphere</h1>
        <p className="about-subheading">Your Gateway to Unlimited Entertainment</p>
      </div>

      <section className="about-content">
        <div className="about-card">
          <h2>Who We Are</h2>
          <p>
            Stream Sphere is a leading OTT platform offering a wide range of movies, web series, and exclusive content
            from around the globe. We aim to bring entertainment closer to you, wherever you are.
          </p>
        </div>
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            To revolutionize the way you watch movies and series by providing a seamless, personalized, and affordable
            streaming experience. With Stream Sphere, you get access to endless entertainment anytime, anywhere.
          </p>
        </div>
        <div className="about-card">
          <h2>What We Offer</h2>
          <ul>
            <li>Thousands of movies and TV shows</li>
            <li>Exclusive web series and documentaries</li>
            <li>Multiple genres to explore</li>
            <li>Personalized recommendations</li>
            <li>Multi-device support</li>
          </ul>
        </div>
      </section>

      

      <Footer />
    </div>
  );
};

export default AboutUsPage;
