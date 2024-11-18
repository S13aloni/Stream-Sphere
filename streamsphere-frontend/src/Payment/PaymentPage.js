import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyCheck, faUniversity, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import './PaymentPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const { plan } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePayment = () => {
        if (paymentMethod) {
            if (paymentMethod === 'Debit Card') {
                navigate('/debit-card', { state: { plan } });
            } else if (paymentMethod === 'UPI') {
                navigate('/upi-payment', { state: { plan } });
            } else if (paymentMethod === 'Credit Card') {
                navigate('/credit-card', { state: { plan } });
            } else if (paymentMethod === "Net Banking") {
                navigate('/net-banking', { state: { plan } });
            } else {
                console.log(`Selected Payment Method: ${paymentMethod}`);
                alert(`Payment for ${plan.name} plan (${plan.price}) will be processed via ${paymentMethod}.`);
            }
        } else {
            alert('Please select a payment method.');
        }
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
            <Navbar />
            <div className="payment-container">
                <h1 className='headingPP'>Complete Your Purchase</h1>
                {plan ? (
                    <div className="plan-details">
                        <h2>Selected Plan: {plan.name}</h2>
                        <p>Price: ₹{plan.price} / month</p>
                        <ul>
                            <li>Resolution: {plan.resolution}</li>
                            <li>Supported Devices: {plan.supported_devices}</li>
                            <li>Screens: {plan.screens}</li>
                            <li>Content: {plan.content}</li>
                            {plan.extras && <li>Extras: {plan.extras}</li>}
                        </ul>
                    </div>
                ) : (
                    <p>No plan selected. Please go back and select a plan.</p>
                )}

                <h3>Select Payment Method</h3>
                <div className="payment-options">
                    <label>
                        <input
                            type="radio"
                            value="Credit Card"
                            checked={paymentMethod === 'Credit Card'}
                            onChange={() => setPaymentMethod('Credit Card')}
                        />
                        <FontAwesomeIcon icon={faCreditCard} className='icon-payment-type'/> Credit Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Debit Card"
                            checked={paymentMethod === 'Debit Card'}
                            onChange={() => setPaymentMethod('Debit Card')}
                        />
                        <FontAwesomeIcon icon={faMoneyCheck} className='icon-payment-type'/> Debit Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="UPI"
                            checked={paymentMethod === 'UPI'}
                            onChange={() => setPaymentMethod('UPI')}
                        />
                        <FontAwesomeIcon icon={faMobileAlt} className='icon-payment-type'/> UPI
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Net Banking"
                            checked={paymentMethod === 'Net Banking'}
                            onChange={() => setPaymentMethod('Net Banking')}
                        />
                        <FontAwesomeIcon icon={faUniversity} className='icon-payment-type' /> Net Banking
                    </label>
                </div>

                <button className="payButton" onClick={handlePayment}>
                    Pay Now
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentPage;
