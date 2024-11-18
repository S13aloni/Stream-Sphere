import React, { useState } from 'react';
import './AdminPage.css'; // Reusing the same CSS
import {useNavigate } from "react-router-dom"

const AddWebSeries = () => {
  const [seriesDetails, setSeriesDetails] = useState({
    title: '',
    genre: '',
    rating: '',
    seasons: '',
    release_year: '',  // Make sure this matches the key in Django
    image: null,
    description: '',
    episodes: [{ title: '', number: '', duration: '', seasonNumber: '', releaseDate: '', description: '', image: null }]
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate=useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeriesDetails({
      ...seriesDetails,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setSeriesDetails({
      ...seriesDetails,
      image: e.target.files[0] // Capture the selected image file
    });
  };

  const handleEpisodeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEpisodes = [...seriesDetails.episodes];
    updatedEpisodes[index] = {
      ...updatedEpisodes[index],
      [name]: value
    };
    setSeriesDetails({
      ...seriesDetails,
      episodes: updatedEpisodes
    });
  };

  const handleEpisodeImageChange = (index, e) => {
    const updatedEpisodes = [...seriesDetails.episodes];
    updatedEpisodes[index].image = e.target.files[0]; // Capture selected episode image
    setSeriesDetails({
      ...seriesDetails,
      episodes: updatedEpisodes
    });
  };

  const addEpisode = () => {
    setSeriesDetails({
      ...seriesDetails,
      episodes: [...seriesDetails.episodes, { title: '', number: '', duration: '', seasonNumber: '', releaseDate: '', description: '', image: null }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    
    // Append series details to formData
    formData.append('title', seriesDetails.title);  // Updated key
    formData.append('genre', seriesDetails.genre);
    formData.append('rating', seriesDetails.rating);
    formData.append('seasons', seriesDetails.seasons);
    formData.append('release_year', seriesDetails.release_year); // Ensure this matches Django's expected key
    formData.append('description', seriesDetails.description);
    formData.append('image', seriesDetails.image); // Assuming `image` is a File object
  
    // Append episodes to formData
    seriesDetails.episodes.forEach((episode, index) => {
      formData.append(`episodes[${index}][episodeTitle]`, episode.title); // Updated key
      formData.append(`episodes[${index}][episodeNumber]`, episode.number); // Updated key
      formData.append(`episodes[${index}][duration]`, episode.duration);
      formData.append(`episodes[${index}][seasonNumber]`, episode.seasonNumber);
      formData.append(`episodes[${index}][releaseDate]`, episode.releaseDate);
      formData.append(`episodes[${index}][episodeDescription]`, episode.description);
      if (episode.image) {
        formData.append(`episodes[${index}][episodeImage]`, episode.image); // Updated key
      }
    });
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/add-webseries/', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json(); // Parse JSON response
  
      if (response.ok) {
        setSuccess('Web Series added successfully!');
        alert('Web Series added successfully!');
        setError('');
        setSeriesDetails({ // Reset form
          title: '',
          genre: '',
          rating: '',
          seasons: '',
          release_year: '',
          image: null,
          description: '',
          episodes: [{ title: '', number: '', duration: '', seasonNumber: '', releaseDate: '', description: '', image: null }]
        });
      } else {
        const errorMsg = data?.error || 'Failed to add web series. Please check the details.';
        setError(errorMsg);
        alert(errorMsg);
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while submitting the web series.';
      setError(errorMessage);
      alert(errorMessage);
    }
  };
  function navigateBack(){
    navigate("/ott-admin")
  }

  return (
    <div className="admin-page">
      <button className='btn-admin' onClick={navigateBack}>Back</button>
      <h1>Add a New Web Series</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="title"  // Ensure these match the keys in the Django view
          placeholder="Title"
          value={seriesDetails.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={seriesDetails.genre}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating"
          value={seriesDetails.rating}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="seasons"
          placeholder="Seasons"
          value={seriesDetails.seasons}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="release_year"  // Ensure this matches the key in Django
          placeholder="Release Year"
          value={seriesDetails.release_year}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={seriesDetails.description}
          onChange={handleInputChange}
          required
        />
        <h2>Episodes</h2>
        {seriesDetails.episodes.map((episode, index) => (
          <div key={index}>
            <input
              type="text"
              name="title"
              placeholder="Episode Title"
              value={episode.title}
              onChange={(e) => handleEpisodeChange(index, e)}
              required
            />
            <input
              type="number"
              name="number"
              placeholder="Episode Number"
              value={episode.number}
              onChange={(e) => handleEpisodeChange(index, e)}
              required
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={episode.duration}
              onChange={(e) => handleEpisodeChange(index, e)}
              required
            />
            <input
              type="number"
              name="seasonNumber"
              placeholder="Season Number"
              value={episode.seasonNumber}
              onChange={(e) => handleEpisodeChange(index, e)}
              required
            />
            <input
              type="date"
              name="releaseDate"
              placeholder="Release Date"
              value={episode.releaseDate}
              onChange={(e) => handleEpisodeChange(index, e)}
              required
            />
            <textarea
              name="description"
              placeholder="Episode Description"
              value={episode.description}
              onChange={(e) => handleEpisodeChange(index, e)}
              required
            />
            <input
              type="file"
              name="episodeImage"
              onChange={(e) => handleEpisodeImageChange(index, e)}
              accept="image/*"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addEpisode} className="submit-btn">Add Episode</button>
        <button type="submit" className="submit-btn">Add Web Series</button>

      </form>
    </div>
  );
};

export default AddWebSeries;
