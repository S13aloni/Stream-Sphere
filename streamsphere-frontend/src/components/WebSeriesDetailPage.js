import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './WebSeriesDetailPage.css';
import { FaPlay } from 'react-icons/fa';
import LoadingScreen from './LoadingScreen';

const WebSeriesDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [webSeries, setWebSeries] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchWebSeriesDetails = async () => {
      try {
        const webSeriesResponse = await axios.get(`http://127.0.0.1:8000/api/webseries/${slug}/`);
        setWebSeries(webSeriesResponse.data);

        const episodesResponse = await axios.get(`http://127.0.0.1:8000/api/webseries/${slug}/episodes/`);
        setEpisodes(episodesResponse.data);
      } catch (err) {
        setError('Error fetching web series details or episodes');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWebSeriesDetails();
  }, [slug]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingScreen/>
  }
  if (error) return <p>{error}</p>;

  const handleToggleDescription = () => {
    setExpanded(!expanded);
  };

  const descriptionText = expanded ? webSeries.description : webSeries.description.substring(0, 200) + '...';

  const handleSubscribeClick = () => {
    navigate('/subscriptionplan');
  };

  // Group episodes by season
  const episodesBySeason = episodes.reduce((acc, episode) => {
    const season = episode.season_number;
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(episode);
    return acc;
  }, {});

  

  return (
    <div className="webseries-details-page">
      <Navbar/>
      {webSeries && (
        <div className="webseries-details-hero">
          <img
            src={`http://127.0.0.1:8000${webSeries.image}`}
            alt={webSeries.title}
            className="webseries-details-hero-image"
          />
          <div className="webseries-details-overlay">
            <div className="webseries-details-info">
              <h1 className="webseries-title">{webSeries.title}</h1>
              <p className="webseries-genre">Genre: {webSeries.genre}</p>
              <p className="webseries-seasons">Seasons: {webSeries.seasons}</p>
              <p className="webseries-description">
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

      {/* Display the episodes grouped by season */}
      <div className="episodes-section">
        <h2>Episodes</h2>
        {Object.entries(episodesBySeason).map(([season, episodes]) => (
          <div key={season}>
            <h3>Season {season}</h3>
            <ul className="episode-list">
            {episodes.map((episode) => (
              <li key={episode.id} className="episode-item">
                <div className="episode-content">
                  <img
                    src={`http://127.0.0.1:8000${episode.episode_image}`} // Assuming each episode has an image field
                    alt={episode.episode_title}
                    className="episode-image"
                  />
                  <div className="episode-details">
                    <h4>{episode.episode_title}</h4>
                    <p>Duration: {episode.duration}</p>
                    <p>{episode.episode_description}</p>
                  </div>
                </div>
              </li>
            ))}
            </ul>
          </div>
        ))}
      </div>

      <Footer/>
    </div>
  );
};

export default WebSeriesDetailPage;
