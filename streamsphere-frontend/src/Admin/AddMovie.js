import React, { useState } from 'react';
import './AdminPage.css'; // Assuming you'll reuse the same styles
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const [movieDetails, setMovieDetails] = useState({
    title: '',
    genre: '',
    rating: '',
    duration: '',
    quality: '',
    release_year: '',
    image: null,
    film_industry: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate=useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails({
      ...movieDetails,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setMovieDetails({
      ...movieDetails,
      image: e.target.files[0] // Capture the selected image file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(movieDetails).forEach((key) => {
      formData.append(key, movieDetails[key]);
    });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/add-movie/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Movie added successfully!');
        setError(''); // Clear any previous errors
        setMovieDetails({
          title: '',
          genre: '',
          rating: '',
          duration: '',
          quality: '',
          release_year: '',
          image: null,
          film_industry: '',
          description: ''
        }); // Reset form
      } else {
        setError('Failed to add movie. Please check the details.');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred while submitting the movie.');
      setSuccess('');
    }
  };
  function navigateBack(){
    navigate("/ott-admin")
  }

  return (
    <div className="admin-page">
      <button className='btn-admin' onClick={navigateBack}>Back</button>
      <h1>Add a New Movie</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movieDetails.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={movieDetails.genre}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating"
          value={movieDetails.rating}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={movieDetails.duration}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="quality"
          placeholder="Quality"
          value={movieDetails.quality}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="release_year"
          placeholder="Release Year"
          value={movieDetails.release_year}
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
        <input
          type="text"
          name="film_industry"
          placeholder="Film Industry"
          value={movieDetails.film_industry}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={movieDetails.description}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="submit-btn">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
