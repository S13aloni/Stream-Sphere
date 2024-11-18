import React from 'react';
import './PrivacyPolicy.css';
import Navbar from './Navbar';
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <Navbar />
      <div className="privacy-hero">
        <h1 className="privacy-heading">Privacy Policy</h1>
        <p className="privacy-subheading">Your Privacy Matters to Us</p>
      </div>

      <section className="privacy-content">
        <h2>Introduction</h2>
        <p>
          Welcome to Stream Sphere! Your privacy is important to us. This privacy policy outlines the types of information we collect, how we use it, and your rights regarding your data.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>Personal Information: Name, email address, and payment information.</li>
          <li>Usage Data: Information about how you use our services.</li>
          <li>Cookies: Small files stored on your device to enhance your experience.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>
          We use your information to:
        </p>
        <ul>
          <li>Provide and maintain our services.</li>
          <li>Improve your experience on our platform.</li>
          <li>Communicate with you regarding your account and services.</li>
          <li>Process transactions and send notifications.</li>
        </ul>

        <h2>Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your personal data.</li>
          <li>Withdraw consent for processing your personal data.</li>
        </ul>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our privacy policy from time to time. Any changes will be posted on this page with an updated effective date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at <a href="mailto:support@streamsphere.com">support@streamsphere.com</a>.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
