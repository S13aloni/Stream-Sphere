import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerDetails.css'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LoadingScreen from '../components/LoadingScreen';

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        setError('No email found. Please sign in.');
        setLoading(false);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/customer/detail/?email=${email}`);
        setCustomer(response.data);
      } catch (err) {
        setError('Error fetching customer details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [navigate]);

  if (loading) return <LoadingScreen />;
  if (error) return <p className='error-cust-det'>{error}</p>;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = () => {
    navigate('/change-email'); // Navigate to the email change page
  };

  const handleMobileChange = () => {
    navigate('/change-mobile'); // Navigate to the mobile change page
  };

  const handlePasswordChange = () => {
    navigate('/change-password'); // Navigate to the mobile change page
  };


  return (
    <div>
      <Navbar />
      <div className="customer-details-container">
        <div className="user-section">
          <div className="user-info">
            <div className="user-icon">
              <i className="fas fa-user-circle"></i>
            </div>
            <h2 className="user-name">{customer.first_name} {customer.last_name}</h2>
          </div>
        </div>

        <div className="details-section">
          <div className="email-section">
            <p className="p-detail"><strong>Email:</strong> {customer.email}</p>
            <button className="change-button" onClick={handleEmailChange}>Change Email</button>
          </div>

          <div className="email-section">
            <p className="p-detail"><strong>Mobile Number:</strong> {customer.mobile}</p>
            <button className="change-button" onClick={handleMobileChange}>Change Mobile</button>
          </div>

          <div className="password-section">
            <p className="p-detail">
              <strong>Password:</strong> {showPassword ? customer.password : '****'}
              <i className={`eye-icon ${showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}`} onClick={handleShowPassword}></i>
            </p>
            <button className="change-button" onClick={handlePasswordChange}>Change Password</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerDetails;
