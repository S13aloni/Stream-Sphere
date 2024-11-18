import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import './SignUpPage.css'; // Import the CSS for styling

const SignUpPage = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[789][0-9]{9}$/;

    if (!formData.first_name) newErrors.first_name = 'Name is required';
    if (!formData.last_name) newErrors.last_name = 'Surname is required';
    if (!emailPattern.test(formData.email)) newErrors.email = 'Email address is invalid';
    if (!mobilePattern.test(formData.mobile)) newErrors.mobile = 'Mobile number must be 10 digits';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContinue = async () => {
    if (validate()) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/signup/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          navigate('/signin');
        } else {
          const errorData = await response.json();
          setErrors(errorData);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };
  
  

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {/* <Navbar /> */}
      <div className="signup-page">
        <div className="signup-form-card">
          <h1>New to Stream Sphere?</h1>
          <form className="signup-form">
            <input
              type="text"
              name="first_name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}

            <input
              type="text"
              name="last_name"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleChange}
            />
            {errors.surname && <p className="error-message">{errors.surname}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <p className="error-message">{errors.mobile}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}

            <div className="signup-description">
              To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.
            </div>
            <button type="button" className="continue-btn" onClick={handleContinue}>Continue</button>
          </form>
          <div className="signin-link">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default SignUpPage;
