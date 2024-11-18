import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage'; // Import SignInPage
import HomePage from './components/HomePage';
import MoviesPage from './components/MoviePage';
import WebseriesPage from './components/WebseriesPage';
import SubscriptionPlans from './components/SubscriptionPlan';
import PasswordPage from './components/PasswordPage';
import SearchResultsPage from './components/SearchResultsPage';
import MovieDetailsPage from './components/MovieDetailsPage';
import WebSeriesDetailPage from './components/WebSeriesDetailPage';
import PaymentPage from './Payment/PaymentPage';
import PaymentSuccess from './Payment/PaymentSuccess';
import DebitCardDetails from './Payment/DebitCardDetails';
import UPIPayment from './Payment/UPIPayment';
import 'bootstrap/dist/css/bootstrap.min.css';
import EnterMobile from './Payment/EnterMobile';
import CreditCardPayment from './Payment/CreditCardPayment';
import OTPConfirmation from './Payment/OTPConfirmation';
import NetBankingPayment from './Payment/NetBankingPayment';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomerDetails from './Customer/CustomerDetails';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import ChangeEmail from './Customer/ChangeEmail';
import ChangeMobile from './Customer/ChangeMobile';
import ChangePassword from './Customer/ChangePassword';
import AdminPage from './Admin/AdminPage';
import AddMovie from './Admin/AddMovie';
import AddWebSeries from './Admin/AddWebseries';



const App = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={isSignedUp ? <HomePage /> : <Navigate to="/signin" />} // Redirect to SignInPage by default
        />
        <Route
          path="/signup"
          element={
            <SignUpPage onSkip={() => setIsSignedUp(true)} onComplete={() => setIsSignedUp(true)} />
          }
        />
        <Route path="/signin" element={<SignInPage />} /> {/* Add route for SignInPage */}

        <Route path='/ott-admin' element={<AdminPage/>}/>
        <Route path='/add-movie' element={<AddMovie/>}/>
        <Route path='/add-webseries' element={<AddWebSeries/>}/>

        <Route path="/home" element={<HomePage />} /> {/* Ensure HomePage route exists */}
        <Route path="/movies" element={<MoviesPage />} /> {/* Route for MoviesPage */}
        <Route path="/webseries" element={<WebseriesPage />} /> {/* Route for WebseriesPage */}
        <Route path='subscriptionplan' element={<SubscriptionPlans/>}/>
        <Route path='/passwordpage' element={<PasswordPage/>}/>
        <Route path="/search" element={<SearchResultsPage/>} />
        <Route path="/movies/:slug" element={<MovieDetailsPage />} />
        <Route path="/webseries/:slug" element={<WebSeriesDetailPage />} />
        <Route path="/customer-details" element={<CustomerDetails/>} />

        
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/debit-card" element={<DebitCardDetails />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/upi-payment" element={<UPIPayment />} />
        <Route path="/enter-mobile" element={<EnterMobile />} />
        <Route path="/otp-confirmation" element={<OTPConfirmation/>} />
        <Route path="/credit-card" element={<CreditCardPayment />} />
        <Route path="/net-banking" element={<NetBankingPayment />} />
        <Route path='/about-us' element={<AboutUsPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/privacy' element={<PrivacyPolicy/>}/>

        <Route path="/change-email" element={<ChangeEmail />} />
        <Route path="/change-mobile" element={<ChangeMobile />} />
        <Route path="/change-password" element={<ChangePassword />} />


        {/* Add other routes as needed */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
