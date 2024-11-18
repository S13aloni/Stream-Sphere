import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChangePassword.css'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; 
import LoadingScreen from '../components/LoadingScreen';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const ChangePassword = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false); // State to toggle old password visibility
    const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle new password visibility
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            const email = localStorage.getItem('userEmail');
            if (!email) {
                setError('No email found. Please sign in.');
                setLoading(false);
                setTimeout(() => {
                    navigate("/signin");
                }, 2000);
                return;
            }

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/customer/detail/?email=${email}`);
                setCustomer(response.data);
            } catch (err) {
                setError('Error fetching customer details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerDetails();
    }, [navigate]);
    

    if (loading) return <LoadingScreen />;
    if (error) return <p className='customer-update-message-error'>{error}</p>;

    const handlePasswordChange = async () => {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            alert('No email found in local storage!');
            return;
        }

        // Check if the old password matches
        if (oldPassword !== customer.password) {
            alert('Old password is incorrect!');
            return;
        }

        // Check if the new password is the same as the old password
        if (newPassword === oldPassword) {
            alert('The new password cannot be the same as the old password!');
            return;
        }

        try {
            const response = await axios.put('http://127.0.0.1:8000/api/customer/update/password/', {
                email: email,
                new_password: newPassword
            });

            if (response.status === 200) {
                alert('Password updated successfully!');
                setOldPassword(''); // Clear the old password input
                setNewPassword(''); // Clear the new password input
                navigate('/customer-details'); // Navigate to Customer Detail page
            }
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Failed to update password. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="customer-update-container-password">
                <h1 className="customer-update-title-password">Change Password</h1>
                <div className="customer-update-card-password">
                    {/* Old Password Field */}
                    <label className="customer-update-label-password">Old Password:</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showOldPassword ? 'text' : 'password'} // Toggle between text and password
                            className="customer-update-input-password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Enter old password"
                        />
                        <span 
                            className="password-toggle-icon"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                        >
                            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* New Password Field */}
                    <label className="customer-update-label-password">New Password:</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showNewPassword ? 'text' : 'password'} // Toggle between text and password
                            className="customer-update-input-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                        <span 
                            className="password-toggle-icon"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button className="customer-update-button-password" onClick={handlePasswordChange}>Update Password</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ChangePassword;
