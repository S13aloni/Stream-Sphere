import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './NetBankingPayment.css'; // Add your styles here
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const NetBankingPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const { plan } = location.state || {};
    
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');

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
            <div className="net-banking-payment-container">
                <h1 className="net-banking-heading">Net Banking Payment</h1>
                <form onSubmit={handleSubmit} className="net-banking-form">
                    <label htmlFor="bank-name" className="net-banking-label">Bank Name:</label>
                    <input
                        type="text"
                        id="bank-name"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="net-banking-input"
                        required
                    />

                    <label htmlFor="account-number" className="net-banking-label">Account Number:</label>
                    <input
                        type="text"
                        id="account-number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="net-banking-input"
                        required
                    />

                    <label htmlFor="ifsc-code" className="net-banking-label">IFSC Code:</label>
                    <input
                        type="text"
                        id="ifsc-code"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        className="net-banking-input"
                        required
                    />

                    <button type="submit" className="net-banking-submit-button">Submit Payment</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default NetBankingPayment;
