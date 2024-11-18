import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CreditCardPayment.css'; // Add your styles here
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const CreditCardPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { plan } = location.state || {};
    
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);


    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate payment submission
        // Navigate to the payment success page after submission
        navigate('/payment-success');
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
            <div className="credit-card-payment-container">
                <h1 className="credit-card-heading">Credit Card Payment</h1>
                <form onSubmit={handleSubmit} className="credit-card-form">
                    <label htmlFor="card-number" className="credit-card-label">Card Number:</label>
                    <input
                        type="text"
                        id="card-number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="credit-card-input"
                        required
                    />

                    <label htmlFor="expiry-date" className="credit-card-label">Expiry Date (MM/YY):</label>
                    <input
                        type="text"
                        id="expiry-date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="credit-card-input"
                        required
                    />

                    <label htmlFor="cvv" className="credit-card-label">CVV:</label>
                    <input
                        type="password"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="credit-card-input"
                        required
                    />

                    <label htmlFor="name" className="credit-card-label">Cardholder Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="credit-card-input"
                        required
                    />

                    <button type="submit" className="credit-card-submit-button">Submit Payment</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CreditCardPayment;
