import React from 'react';
import '../styles/success.css';

function SuccessScreen({ data, onStartOver }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ', ' + date.toLocaleTimeString();
  };

  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-header">
          <h1>🎉 Thank You!</h1>
          <p>Your generous donation has been received</p>
        </div>

        <div className="receipt-section">
          <h2>Donation Receipt</h2>
          
          <div className="receipt-item">
            <span className="receipt-label">Amount:</span>
            <span className="receipt-value">KES {parseFloat(data.amount).toLocaleString()}</span>
          </div>

          <div className="receipt-item">
            <span className="receipt-label">Payment Method:</span>
            <span className="receipt-value">
              {data.paymentMethod === 'mpesa' ? '📱 M-Pesa' : '💳 Card'}
            </span>
          </div>

          <div className="receipt-item">
            <span className="receipt-label">Transaction ID:</span>
            <span className="receipt-value transaction-id">{data.transactionId}</span>
          </div>

          <div className="receipt-item">
            <span className="receipt-label">Donor Email:</span>
            <span className="receipt-value">{data.donorEmail}</span>
          </div>

          <div className="receipt-item">
            <span className="receipt-label">Date & Time:</span>
            <span className="receipt-value">{formatDate(data.timestamp)}</span>
          </div>
        </div>

        <div className="confirmation-message">
          <p>✓ Confirmation email has been sent to <strong>{data.donorEmail}</strong></p>
        </div>

        <div className="impact-message">
          <h3>Your Impact</h3>
          <p>
            Your donation helps MSF Eastern Africa deliver critical medical services 
            to vulnerable populations. Thank you for your compassion and support.
          </p>
        </div>

        <div className="success-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={onStartOver}
          >
            Donate Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessScreen;