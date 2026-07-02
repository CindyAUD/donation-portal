import React, { useState } from 'react';
import SecurityBanner from './components/SecurityBanner';
import DonationForm from './components/DonationForm';
import SuccessScreen from './components/SuccessScreen';
import './App.css';

function App() {
  const [donationData, setDonationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDonationSuccess = (data) => {
    setDonationData(data);
  };

  const handleStartOver = () => {
    setDonationData(null);
  };

  return (
    <div className="App">
      <SecurityBanner />
      
      <main className="main-container">
        {donationData ? (
          <SuccessScreen 
            data={donationData} 
            onStartOver={handleStartOver}
          />
        ) : (
          <DonationForm 
            onSuccess={handleDonationSuccess}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 MSF Eastern Africa. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;