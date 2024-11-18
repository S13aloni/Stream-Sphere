import React, { useState, useEffect } from 'react';
import "./MoviePage.css"
import Navbar from './Navbar'; // Import Navbar component
import Footer from './Footer'; // Import Footer component
import LoadingScreen from './LoadingScreen';
import CardFlip1 from '../Movies/CardFlip1';
import BubbleLayoutM from '../Movies/BubbleLayoutM';
import MoviesCarousel from '../Movies/MoviesCarousel';
import MasonryLayoutM from '../Movies/MasonryLayoutM';
import CardCarouselM from '../Movies/CardCarouselM';
import SeriesGridM from '../Movies/SeriesGridM';
import HoverGridM from '../Movies/HoverGridM';
import CubeM from '../Movies/CubeM';
import FilterM from '../Movies/FilterM';
import VideoBannerM from '../Movies/VideoMovie';

const MoviesPage = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [videoData, setVideoData] = useState([]);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/movies/');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching web series:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/videos/');
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error('Failed to fetch video data:', error);
      }
    };

    fetchVideoData();
  }, []);

  useEffect(() => {
    // Simulate loading time or fetch data
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Navbar />
      <div className="movies-page">
        <VideoBannerM videobanners={videoData}/>
        <MoviesCarousel movies={movies}/>
        <CardFlip1 movies={movies}/>
        <BubbleLayoutM movies={movies}/>
        <CardCarouselM movies={movies}/>
        <MasonryLayoutM movies={movies}/>
        <SeriesGridM movies={movies}/>
        <HoverGridM movies={movies}/>
        <CubeM movies={movies}/>
        <FilterM/>
      </div>
      <Footer />
    </div>
  );
};

export default MoviesPage;
