// import React, { useState } from 'react';
// import './SubscriptionPlan.css';
// import Navbar from './Navbar';
// import Footer from './Footer';

// const SubscriptionPlans = () => {
//     const [selectedPlan, setSelectedPlan] = useState(null);

//     const plans = [
//         {
//             name: 'Basic',
//             price: '₹199',
//             features: [
//                 { label: 'Resolution', value: '480p' },
//                 { label: 'Supported Devices', value: 'Mobile' },
//                 { label: 'Screens', value: '1 Screen at a time' },
//                 { label: 'Content', value: 'Limited Movies & Web Series' },
//             ],
//             className: 'plan-basic',
//         },
//         {
//             name: 'Standard',
//             price: '₹499',
//             features: [
//                 { label: 'Resolution', value: '1080p' },
//                 { label: 'Supported Devices', value: 'TV, Mobile, Laptop' },
//                 { label: 'Screens', value: '2 Screens at a time' },
//                 { label: 'Content', value: 'All Movies & Web Series' },
//             ],
//             className: 'plan-standard',
//         },
//         {
//             name: 'Premium',
//             price: '₹799',
//             features: [
//                 { label: 'Resolution', value: '4K + HDR' },
//                 { label: 'Supported Devices', value: 'TV, Mobile, Laptop' },
//                 { label: 'Screens', value: '4 Screens at a time' },
//                 { label: 'Content', value: 'All Movies & Web Series' },
//                 { label: 'Extras', value: 'Offline Downloads' },
//             ],
//             className: 'plan-premium',
//         },
//     ];

//     const handleCardClick = (index) => {
//         setSelectedPlan(index);
//     };

//     const handleNextClick = () => {
//         if (selectedPlan !== null) {
//             // Proceed to the next page or handle the selection
//             console.log(`Selected plan: ${plans[selectedPlan].name}`);
//             // Navigate to the next page or perform an action here
//         } else {
//             alert('Please select a plan before proceeding.');
//         }
//     };

//     return (
//         <div>
//             <Navbar/>
//         <div className="subscription-container">
//             <h1 className="subscription-heading">Choose Your Plan</h1>
//             <div className="plans-grid">
//                 {plans.map((plan, index) => (
//                     <div
//                         key={index}
//                         className={`plan-card ${plan.className} ${selectedPlan === index ? 'selected' : ''}`}
//                         onClick={() => handleCardClick(index)}
//                     >
//                         {selectedPlan === index && <span className="tick-mark">✔</span>}
//                         <h2 className="plan-name">{plan.name}</h2>
//                         <p className="plan-price">{plan.price} / month</p>
//                         <ul className="plan-features">
//                             {plan.features.map((feature, i) => (
//                                 <li key={i}>
//                                     <span className="feature-label">{feature.label}:</span>
//                                     <span className="feature-value">{feature.value}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//             <button className="nextButton" onClick={handleNextClick}>
//                 NEXT
//             </button>
//         </div>
//         <Footer/>
//         </div>
//     );
// };

// export default SubscriptionPlans;
// src/SubscriptionPlans.js
import React, { useState, useEffect } from 'react';
import './SubscriptionPlan.css';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

const SubscriptionPlans = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/subscription-plans/')
            .then(response => setPlans(response.data))
            .catch(error => console.error('Error fetching subscription plans:', error));
    }, []);

    const handleCardClick = (index) => {
        setSelectedPlan(index);
    };

    const handleNextClick = () => {
        if (selectedPlan !== null) {
            // Redirect to Payment Page with selected plan details
            navigate('/payment', { state: { plan: plans[selectedPlan] } });
        } else {
            alert('Please select a plan before proceeding.');
        }
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
            <div className="subscription-container">
                <h1 className="subscription-heading">Choose Your Plan</h1>
                <div className="plans-grid">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`plan-card ${plan.name.toLowerCase()} ${selectedPlan === index ? 'selected' : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            {selectedPlan === index && <span className="tick-mark">✔</span>}
                            <h2 className="plan-name">{plan.name}</h2>
                            <p className="plan-price">₹{plan.price} / month</p>
                            <ul className="plan-features">
                                <li><span className="feature-label">Resolution:</span><span className="feature-value">{plan.resolution}</span></li>
                                <li><span className="feature-label">Supported Devices:</span><span className="feature-value">{plan.supported_devices}</span></li>
                                <li><span className="feature-label">Screens:</span><span className="feature-value">{plan.screens}</span></li>
                                <li><span className="feature-label">Content:</span><span className="feature-value">{plan.content}</span></li>
                                {plan.extras && <li><span className="feature-label">Extras:</span><span className="feature-value">{plan.extras}</span></li>}
                            </ul>
                        </div>
                    ))}
                </div>
                <button className="nextButton-Sub" onClick={handleNextClick}>
                    NEXT
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default SubscriptionPlans;
