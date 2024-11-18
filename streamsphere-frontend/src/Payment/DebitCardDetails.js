import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DebitCardDetails.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const DebitCardDetails = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Validate inputs (card number, expiry date, CVV, etc.)
        console.log('Processing Payment...');

        // Simulate payment submission delay (e.g., to integrate with a real payment gateway)
        setTimeout(() => {
            // After successful payment submission, navigate to the PaymentSuccess page
            navigate('/payment-success');
        }, 1000);
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
            <div className="debit-card-container">
                <h1 className='headingDebit'>Enter Debit Card Details</h1>
                <form onSubmit={handlePaymentSubmit} className="debit-card-form">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                            maxLength="16"
                            placeholder="Enter your 16-digit card number"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input
                            type="text"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="password"
                            id="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                            maxLength="3"
                            placeholder="3-digit CVV"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardHolderName">Cardholder Name</label>
                        <input
                            type="text"
                            id="cardHolderName"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            required
                            placeholder="Name on the card"
                        />
                    </div>
                    <button type="submit" className="payButton">
                        Submit Payment
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default DebitCardDetails;
