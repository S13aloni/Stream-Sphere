import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UPIPayment.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const UPIPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { plan } = location.state || {};

    const [upiId, setUpiId] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (plan) {
            setAmount(plan.price);
        }
    }, [plan]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to mobile number input page
        navigate('/enter-mobile', { state: { plan } });
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
            <div className="upi-payment-container">
                <h1 className="upi-heading">UPI Payment</h1>
                <form onSubmit={handleSubmit} className="upi-form">
                    <label htmlFor="upi-id" className="upi-label">UPI ID:</label>
                    <input
                        type="text"
                        id="upi-id"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="upi-input"
                        required
                    />

                    <label htmlFor="amount" className="upi-label">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        readOnly
                        className="upi-input"
                        required
                    />

                    <button type="submit" className="upi-submit-button">Submit Payment</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default UPIPayment;
