import React, { useState, useEffect } from 'react';
import '../styles/modal.css';

function MpesaModal({ amount, onConfirm, onCancel }) {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onCancel();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onCancel]);

  const handleConfirmClick = () => {
    setIsConfirmed(true);
    onConfirm();
  };

  const progressPercentage = (timeRemaining / 60) * 100;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>📱 Enter M-Pesa PIN</h2>
        
        <div className="modal-body">
          <p className="modal-instruction">
            An STK prompt will appear on your phone shortly.
          </p>
          <p className="modal-instruction">
            Enter your M-Pesa PIN on your device to confirm the donation of <strong>KES {parseFloat(amount).toLocaleString()}</strong>.
          </p>

          <div className="timer-section">
            <p className="timer-label">Time Remaining:</p>
            <div className="timer-display">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="timer-text">{timeRemaining} seconds</p>
            </div>
          </div>

          <div className="status-section">
            <p className="status-text">
              {isConfirmed ? '✓ Confirming payment...' : '⏳ Waiting for confirmation...'}
            </p>
          </div>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
            disabled={isConfirmed}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleConfirmClick}
            disabled={isConfirmed}
          >
            Confirm on Phone
          </button>
        </div>
      </div>
    </div>
  );
}

export default MpesaModal;