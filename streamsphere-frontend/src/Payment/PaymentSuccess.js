import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const PaymentSuccess = () => {
    const [animationDone, setAnimationDone] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Automatically navigate to the home page or dashboard after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationDone(true);
            navigate('/home');  
            // Change to whatever page you want to navigate to
        }, 5000);

        return () => clearTimeout(timer); // Cleanup timeout if the component unmounts
    }, [navigate]);

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
            <div className="payment-success-container">
                <div className={`success-icon ${animationDone ? 'done' : ''}`}>
                    <div className="circle"></div>
                    {/* Use Unicode tick symbol instead of CSS-drawn tick */}
                    <span className="tick-symbol">✔</span>
                </div>
                <h1 className='headingPay'>Payment Successful!</h1>
                <p className='pPay'>Thank you for your payment. You will be redirected shortly.</p>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentSuccess;
