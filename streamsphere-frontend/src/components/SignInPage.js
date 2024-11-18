import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LoadingScreen from './LoadingScreen';
import './SignInPage.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  const handleGetStarted = async () => {
    // Check if the email entered is the admin email
    if (email.trim().toLowerCase() === "admin@gmail.com") {
      navigate("/ott-admin"); // Redirect to admin page
      return;
    }
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/verify-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }), // Trim email to remove extra spaces
      });
  
      const data = await response.json();
  
      if (response.ok && data.status === 'success') {
        localStorage.setItem('userEmail', email.trim());
        navigate('/passwordpage'); // Redirect to password page
      } else {
        const message = "You need to create your account";
        setError(data.message + "\n" + message);
    
        // Set a timeout to navigate after 2 seconds
        setTimeout(() => {
            navigate("/signup");
        }, 2000); // 2000 milliseconds = 2 seconds
    }    
    } catch (err) {
      setError('An error occurred while verifying the email');
    }
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

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
      <div className="signin-page">
        <div className="signin-background">
          <div className="signin-overlay">
            <h1>Unlimited movies and web series</h1>
            <p>Ready to watch? Enter your email to enter into the unimaginable world of stories.</p>
            <div className="signin-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button onClick={handleGetStarted} className="get-started-btn">Get Started</button>
            </div>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <h6>New to Stream Sphere?</h6>
            <button onClick={handleCreateAccount} className="create-account-btn">Create Account</button>
          </div>
        </div>
      </div>
      <div className="curve-line"></div> {/* Curved red line */}
      
      <div className="cards-container-signin">
        <div className="card-signin">
          <h3>Enjoy on your TV</h3>
          <p>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
          <img src="icon1.jpg" alt="Icon 1" class="card-icon-signin" />
        </div>
        <div className="card-signin">
          <h3>Download your shows to watch offline</h3>
          <p>Save your favourites easily and always have something to watch.</p>
          <img src="icon2.jpg" alt="Icon 2" class="card-icon-signin" />
        </div>
        <div className="card-signin">
          <h3>Watch everywhere</h3>
          <p>Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.</p>
          <img src="icon3.jpg" alt="Icon " class="card-icon-signin" />
        </div>
        <div className="card-signin">
          <h3>Create profiles for kids</h3>
          <p>Send kids on adventures with their favourite characters in a space made just for them — free with your membership.</p>
          <img src="icon4.jpg" alt="Icon 4" class="card-icon-signin" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
