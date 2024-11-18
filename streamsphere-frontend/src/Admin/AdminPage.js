import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Assuming you have a CSS file for styling

const AdminPage = () => {
  const navigate = useNavigate();

  // Function to navigate to Add Movie or Add Web Series page
  const handleNavigation = (page) => {
    if (page === 'movie') {
      navigate('/add-movie');
    } else if (page === 'webseries') {
      navigate('/add-webseries');
    }
  };

  function navigateBack(){
    navigate("/signin")
  }

  return (
    <div className="admin-page">
      <button className='btn-admin' onClick={navigateBack}>Back</button>
      <h1>Admin Panel</h1>
      <div className="admin-options">
        <div className="admin-card" onClick={() => handleNavigation('movie')}>
          <h3>Add Movie</h3>
          <p>Click to add a new movie to the platform</p>
        </div>
        <div className="admin-card" onClick={() => handleNavigation('webseries')}>
          <h3>Add Web Series</h3>
          <p>Click to add a new web series to the platform</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
