import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';
import MovieList from '../Home/MovieList';
import VideoBanner from '../Home/VideoBanner';
import WebList from '../Home/WebList';
import BubbleLayout from '../Webseries/BubbleLayout';
import BubbleLayoutM from '../Movies/BubbleLayoutM';
import MovingRatingCard from "../Home/MovingRatingCard";
import MovingRatingCardWeb from '../Home/MovingRatingCardWeb';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState([]);
  const [webSeries, setWebSeries] = useState([]);
  const [movies,setMovies] = useState([]);

  useEffect(() => {
    // Simulate loading time or fetch data
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed


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
    const fetchWebSeries = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/webseries/');
        const data = await response.json();
        setWebSeries(data);
      } catch (error) {
        console.error('Error fetching web series:', error);
      }
    };

    fetchWebSeries();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/movies/');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Navbar />
      <VideoBanner videobanners={videoData} />
      
      <MovieList/>
      <MovingRatingCard/>
      <BubbleLayoutM movies={movies}/>

      <WebList/>
      <MovingRatingCardWeb/>
      <BubbleLayout webSeries={webSeries}/>

      <Footer />
    </div>
  );
};

export default HomePage;
