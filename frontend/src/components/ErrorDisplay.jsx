import React from 'react';
import '../styles/error.css';

function ErrorDisplay({ message, onDismiss }) {
  return (
    <div className="error-container">
      <div className="error-banner">
        <span className="error-icon">❌</span>
        <div className="error-content">
          <p className="error-title">Payment Failed</p>
          <p className="error-message">{message}</p>
        </div>
        {onDismiss && (
          <button className="error-close" onClick={onDismiss}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorDisplay;