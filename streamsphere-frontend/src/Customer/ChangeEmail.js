import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./ChangeEmail.css";

const ChangeEmail = () => {
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = async (e) => {
        e.preventDefault();
        const userEmail = localStorage.getItem('userEmail'); // Current email

        if (!newEmail) {
            setError('Please enter a new email.');
            return;
        }

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/customer/update/`, {
                current_email: userEmail,
                new_email: newEmail,
            });

            

            // Update the localStorage with the new email
            localStorage.setItem('userEmail', newEmail);

            // Navigate back to the customer details page after a delay
            setTimeout(() => {
                navigate('/customer-details');
            }, 2000);

            // Show success alert
            alert('Your email has been successfully updated.');
            setError('');

        } catch (err) {
            setError('Failed to update email.');
            setSuccess('');
            console.error(err);
        }
    };

    return (
        <div className="unique-email-update-container">
            <h2 className="unique-email-update-title">Change Email</h2>
            {error && <p className="unique-email-update-message unique-email-update-message-error">{error}</p>}
            {success && <p className="unique-email-update-message unique-email-update-message-success">{success}</p>}
            <form className="unique-email-update-form" onSubmit={handleEmailChange}>
                <label className="unique-email-update-label" htmlFor="email">New Email:</label>
                <input
                    className="unique-email-update-input"
                    type="email"
                    id="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                />
                <button type="submit" className="unique-email-update-button">Update Email</button>
            </form>
        </div>
    );
};

export default ChangeEmail;
