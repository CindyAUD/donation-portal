import React from 'react';
import '../styles/securityBanner.css';

function SecurityBanner() {
  return (
    <div className="security-banner">
      <div className="security-banner-content">
        <span className="security-icon">🔒</span>
        <p>
          <strong>Your donation is secure.</strong> We protect your personal 
          and payment information with industry-standard encryption.
        </p>
      </div>
    </div>
  );
}

export default SecurityBanner;