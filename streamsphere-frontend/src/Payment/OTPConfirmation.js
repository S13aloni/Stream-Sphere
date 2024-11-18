import React,{useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OTPConfirmation.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const OTPConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const { plan } = location.state || {};

    // Automatically navigate to the success page after a short delay
    React.useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/payment-success');
        }, 2000); // Adjust the delay as needed

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
            <div className="otp-confirmation-container">
                <h1 className="confirmation-heading">OTP Verified Successfully!</h1>
                <p className="confirmation-message">Your payment is being processed. You will be redirected shortly.</p>
            </div>
            <Footer />
        </div>
    );
};

export default OTPConfirmation;
