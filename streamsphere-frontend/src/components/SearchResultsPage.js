import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchResultsPage.css';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';

const SearchResultsPage = () => {
  const query = new URLSearchParams(window.location.search).get('query') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/search/`, {
          params: { query },
        });
        setResults(response.data);
      } catch (err) {
        setError('Error fetching search results');
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleCardClick = (result) => {
    const slug = result.title.toLowerCase().replace(/\s+/g, '-');
    if (result.genre) { 
      navigate(result.genre.includes('Movie') ? `/movies/${slug}` : `/webseries/${slug}`);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <h1 className="search-h1">Search Results for "{query}"</h1>
      <div className="search-grid">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div
              key={`${result.id}-${index}`}  
              className="search-card"
              onClick={() => handleCardClick(result)}
            >
              <img 
                src={`http://localhost:8000/media/${result.image}`} 
                alt={result.title} 
                className="result-image" 
              />
              <h2 className="search-h2">{result.title}</h2>
              <p className="search-p">Rating: {result.rating} IMDb</p>
              <p className="search-p">Genre: {result.genre}</p>
            </div>
          ))
        ) : (
          <p className="search-p">No results found</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
