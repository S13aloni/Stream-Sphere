import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './WebseriesPage.css'; // Custom CSS for styling

import SeriesGrid from '../Webseries/SeriesGrid';
import MasonryLayout from '../Webseries/MasonryLayout';
import HoverGrid from '../Webseries/HoverGrid';
import BubbleLayout from '../Webseries/BubbleLayout';
import Cube from '../Webseries/Cube';
import CardFlip from '../Webseries/CardFlip';
import WebCarousel from '../Webseries/WebCarousel';
import CardCarousel from '../Webseries/CardCarousel';
import Filter from '../Webseries/Filter';
import LoadingScreen from './LoadingScreen';
import VideoBannerW from '../Webseries/VideoWebseries';

const WebSeriesPage = () => {
  const [webSeries, setWebSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState([]);



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
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingScreen/>
  }

  return (
    <div>
      <Navbar />
      <div className="webseries-page">
        <VideoBannerW videobanners={videoData}/>
        <WebCarousel webSeries={webSeries}/>
        <CardFlip webSeries={webSeries}/>
        <BubbleLayout webSeries={webSeries}/>
        <CardCarousel webSeries={webSeries}/>
        <MasonryLayout webSeries={webSeries} />
        <SeriesGrid webSeries={webSeries} />
        <HoverGrid webSeries={webSeries}/>
        <Cube webSeries={webSeries}/>
        <Filter/>
      </div>
      <Footer />
    </div>
  );
};

export default WebSeriesPage;
