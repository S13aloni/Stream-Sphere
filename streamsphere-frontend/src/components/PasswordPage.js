import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './PasswordPage.css';
import LoadingScreen from './LoadingScreen';

const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve email from localStorage
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email is found, redirect back to sign-in page
      navigate('/');
    }
  }, [navigate]);

  const handleSignIn = () => {
    if (!password) {
      setErrorMessage('Please enter your password.');
    } else {
      // Handle authentication here (this is just a placeholder)
      navigate('/home');
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic (placeholder)
    alert('Forgot password feature coming soon!');
  };

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
      <div className="password-page">
        <div className="password-card">
          <h2>Welcome back!</h2>
          <h3>Joining Stream Sphere is easy.</h3>
          <p>Enter your password and you'll be watching in no time.</p>
          <div className="email-display">
            <strong>Email: </strong>{email}
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage('');  // Clear error message when user starts typing
            }}
            required
          />
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          <div className="forgot-password-link" onClick={handleForgotPassword}>
            Forgot Password?
          </div>
          <button onClick={handleSignIn} className="nextBtn-Pass">Next</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordPage;
