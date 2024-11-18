import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faTv, faTimes, faSearch, faBell, faUser, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for user dropdown visibility
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    if (searchVisible) setSearchVisible(false);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (sidebarVisible) setSidebarVisible(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchValue = searchQuery.trim();
    if (searchValue) {
      navigate(`/search?query=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/signin');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleSidebar}
            aria-controls="sidebar"
            aria-expanded={sidebarVisible}
            aria-label="Toggle sidebar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">
            <img src="logo3.jpg" alt="Stream Sphere Logo" className="navbar-logo" />
            Stream Sphere
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies">
                  <FontAwesomeIcon icon={faFilm} /> Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/webseries">
                  <FontAwesomeIcon icon={faTv} /> Web Series
                </Link>
              </li>
            </ul>
          </div>
          
          <button className="search-btn" onClick={toggleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <Link to="/subscriptionplan" style={{ textDecoration: 'none' }}>
            <button className="btn subscription-btn">
              <FontAwesomeIcon icon={faBell} className="me-2" />
              Subscribe
            </button>
          </Link>

          {/* User Dropdown Toggle */}
          <div className="user-dropdown">
            <button className="btn user-btn" onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faUser} />
            </button>

            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/customer-details" className="dropdown-item">
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                  Profile
                </Link>
                <button className="dropdown-item" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {sidebarVisible && <div className="overlay" onClick={toggleSidebar}></div>}
      {sidebarVisible && (
        <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`} id="sidebar">
          <button className="close-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="sidebar-content">
            <a className="sidebar-brand" href="#">
              <img src="logo3.jpg" alt="Stream Sphere Logo" className="sidebar-logo" />
              <h2 className="sidebar-heading">Stream Sphere</h2>
            </a>
            <ul className="sidebar-nav">
              <li>
                <Link to="/home" className="nav-link">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="nav-link">
                  <FontAwesomeIcon icon={faFilm} /> Movies
                </Link>
              </li>
              <li>
                <Link to="/webseries" className="nav-link">
                  <FontAwesomeIcon icon={faTv} /> Web Series
                </Link>
              </li>
            </ul>
            <p>&copy; 2024 Stream Sphere. All rights reserved.</p>
          </div>
        </div>
      )}

      {searchVisible && (
        <div className="search-container">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search for movies, web series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" className="close-btn" onClick={handleClearSearch}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;
