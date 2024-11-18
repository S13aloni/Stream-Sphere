import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnterMobile.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const EnterMobile = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(''); // State to store generated OTP
    const [timer, setTimer] = useState(180); // 3 minutes in seconds
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [otpExpired, setOtpExpired] = useState(false); // State for OTP expiration message

    // Function to generate a random OTP (4 digits)
    const generateOtp = () => {
        return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a random 4-digit number
    };

    // Handle OTP sending
    const handleSendOtp = (e) => {
        e.preventDefault();
        
        // Regular expression to validate mobile number (10 digits, starting with 7, 8, or 9)
        const mobileNumberPattern = /^[789]\d{9}$/;

        if (!mobileNumberPattern.test(mobileNumber)) {
            alert("Please enter a valid 10-digit mobile number starting with 7, 8, or 9.");
            return;
        }

        console.log(`Sending OTP to ${mobileNumber}`);
        const newOtp = generateOtp(); // Generate a new OTP
        console.log(`Generated OTP: ${newOtp}`);
        setGeneratedOtp(newOtp); // Save the generated OTP in state
        setOtpSent(true);

        // Start the timer
        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    setOtpExpired(true); // Set OTP expired state
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Handle OTP submission and validation
    const handleSubmitOtp = (e) => {
        e.preventDefault();
        if (timer === 0) {
            alert('You have exceeded the OTP time. Please request a new OTP.');
            navigate('/enter-mobile'); // Navigate back to enter mobile number
            return;
        }

        console.log(`OTP entered: ${otp}`);
        if (otp === generatedOtp) {
            console.log('OTP verified successfully');
            navigate('/payment-success'); // Navigate to payment success page
        } else {
            alert('Invalid OTP. Please try again.');
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
            <div className="enter-mobile-container">
                <h1 className="mobile-heading">Enter Your Mobile Number</h1>
                {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="mobile-form">
                        <label htmlFor="mobile-number" className="mobile-label">Mobile Number:</label>
                        <input
                            type="text"
                            id="mobile-number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="mobile-input"
                            required
                        />
                        <button type="submit" className="send-otp-button">Send OTP</button>
                    </form>
                ) : (
                    <div className="otp-section">
                        <p>An OTP has been sent to your mobile number.</p>
                        
                        {/* Display the generated OTP (for debugging purposes) */}
                        <p style={{ color: 'red', fontWeight: 'bold' }}>Generated OTP (for testing): {generatedOtp}</p>

                        <div className="timer">
                            {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                        </div>
                        <form onSubmit={handleSubmitOtp} className="otp-form">
                            <label htmlFor="otp" className="otp-label">Enter OTP:</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="otp-input"
                                maxLength="4"
                                required
                            />
                            <button type="submit" className="otp-submit-button">Verify OTP</button>
                        </form>
                        {otpExpired && (
                            <p style={{ color: 'red', fontWeight: 'bold' }}>
                                You have exceeded the OTP time. Please request a new OTP.
                            </p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default EnterMobile;
