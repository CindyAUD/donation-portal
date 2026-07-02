import React, { useState } from 'react';
import '../styles/cardForm.css';

function CardForm({ onCardDetailsReady, disabled }) {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });

  const [cardErrors] = useState({});

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry as MM/YY
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
      }
    }

    // Limit CVV to 3-4 digits
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    onCardDetailsReady({
      number: cardData.number.replace(/\s/g, ''),
      expiry: cardData.expiry,
      cvv: cardData.cvv
    });
  };

  return (
    <div className="card-form-section">
      <h3>Card Details</h3>

      <div className="form-group">
        <label htmlFor="cardNumber">Card Number *</label>
        <input
          type="text"
          id="cardNumber"
          name="number"
          value={cardData.number}
          onChange={handleCardChange}
          placeholder="4242 4242 4242 4242"
          maxLength="19"
          disabled={disabled}
          className={cardErrors.number ? 'input-error' : ''}
        />
        <p className="hint-text">💡 Test: 4242... = Success | 4000... = Declined</p>
      </div>

      <div className="card-row">
        <div className="form-group">
          <label htmlFor="expiry">Expiry Date *</label>
          <input
            type="text"
            id="expiry"
            name="expiry"
            value={cardData.expiry}
            onChange={handleCardChange}
            placeholder="MM/YY"
            maxLength="5"
            disabled={disabled}
            className={cardErrors.expiry ? 'input-error' : ''}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cvv">CVV *</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cardData.cvv}
            onChange={handleCardChange}
            placeholder="123"
            maxLength="4"
            disabled={disabled}
            className={cardErrors.cvv ? 'input-error' : ''}
          />
        </div>
      </div>
    </div>
  );
}

export default CardForm;