import React from 'react';
import '../styles/paymentMethod.css';

function PaymentMethodSelect({ selectedMethod, onMethodChange, disabled }) {
  return (
    <div className="form-group">
      <label>Payment Method *</label>
      <div className="payment-methods">
        <button
          type="button"
          className={`payment-method-btn ${selectedMethod === 'mpesa' ? 'active' : ''}`}
          onClick={() => onMethodChange('mpesa')}
          disabled={disabled}
        >
          <span className="method-icon">📱</span>
          <span className="method-name">M-Pesa</span>
        </button>
        
        <button
          type="button"
          className={`payment-method-btn ${selectedMethod === 'card' ? 'active' : ''}`}
          onClick={() => onMethodChange('card')}
          disabled={disabled}
        >
          <span className="method-icon">💳</span>
          <span className="method-name">Card</span>
        </button>
      </div>
    </div>
  );
}

export default PaymentMethodSelect;