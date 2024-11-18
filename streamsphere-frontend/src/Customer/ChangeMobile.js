import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChangeMobile.css'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LoadingScreen from '../components/LoadingScreen';

const ChangeMobile = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMobile, setNewMobile] = useState('');
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
                console.log(response.data);
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

    const handleMobileChange = async () => {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            alert('No email found in local storage!');
            return;
        }

        try {
            const response = await axios.put('http://127.0.0.1:8000/api/customer/update/mobile/', {
                email: email,
                new_mobile: newMobile
            });

            if (response.status === 200) {
                alert('Mobile number updated successfully!');
                setNewMobile(''); // Clear the input
                navigate('/customer-details'); // Navigate to Customer Detail page
            }
        } catch (error) {
            console.error('Error updating mobile number:', error);
            alert('Failed to update mobile number. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="customer-update-container">
                <h1 className="customer-update-title">Change Mobile Number</h1>
                <div className="customer-update-card">
                    <p className="customer-update-label"><strong>Current Mobile:</strong> {customer.mobile}</p>
                    <input 
                        type="text" 
                        className="customer-update-input" 
                        value={newMobile} 
                        onChange={(e) => setNewMobile(e.target.value)} 
                        placeholder="Enter new mobile number" 
                    />
                    <button className="customer-update-button" onClick={handleMobileChange}>Update Mobile</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ChangeMobile;
