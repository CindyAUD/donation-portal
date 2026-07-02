import React, { useState } from 'react';
import axios from 'axios';
import PaymentMethodSelect from './PaymentMethodSelect';
import MpesaModal from './MpesaModal';
import CardForm from './CardForm';
import ErrorDisplay from './ErrorDisplay';
import '../styles/form.css';

function DonationForm({ onSuccess, isLoading, setIsLoading }) {
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    amount: '',
    paymentMethod: 'mpesa',
  });

  const [errors, setErrors] = useState({});
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.donorName.trim()) {
      newErrors.donorName = 'Name is required';
    }
    
    if (!formData.donorEmail.trim()) {
      newErrors.donorEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.donorEmail)) {
      newErrors.donorEmail = 'Invalid email format';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setGeneralError(null);

    if (formData.paymentMethod === 'mpesa') {
      setShowMpesaModal(true);
      // M-Pesa flow will be handled in MpesaModal component
    } else {
      // Card flow - submit directly
      await submitDonation();
    }
  };

  const submitDonation = async (cardDetails = null) => {
    try {
      const payload = {
        donorName: formData.donorName,
        donorEmail: formData.donorEmail,
        amount: parseFloat(formData.amount),
        paymentMethod: formData.paymentMethod,
      };

      if (cardDetails) {
        payload.cardDetails = cardDetails;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/donate`,
        payload
      );

      if (response.data.success) {
        onSuccess(response.data.data);
      } else {
        setGeneralError(response.data.message || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Donation submission error:', error);
      setGeneralError(
        error.response?.data?.message || 
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
      setShowMpesaModal(false);
    }
  };

  const handleMpesaConfirm = async () => {
    await submitDonation();
  };

  return (
    <div className="donation-form-container">
      <div className="form-header">
        <h1>Support MSF Eastern Africa</h1>
        <p>Your donation helps save lives and improve health in Eastern Africa</p>
      </div>

      {generalError && <ErrorDisplay message={generalError} />}

      <form onSubmit={handleSubmit} className="donation-form">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="donorName">Full Name *</label>
          <input
            type="text"
            id="donorName"
            name="donorName"
            value={formData.donorName}
            onChange={handleInputChange}
            placeholder="John Doe"
            className={errors.donorName ? 'input-error' : ''}
            disabled={isLoading}
          />
          {errors.donorName && (
            <span className="error-message">{errors.donorName}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="donorEmail">Email Address *</label>
          <input
            type="email"
            id="donorEmail"
            name="donorEmail"
            value={formData.donorEmail}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className={errors.donorEmail ? 'input-error' : ''}
            disabled={isLoading}
          />
          {errors.donorEmail && (
            <span className="error-message">{errors.donorEmail}</span>
          )}
        </div>

        {/* Amount Field */}
        <div className="form-group">
          <label htmlFor="amount">Donation Amount (KES) *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="1000"
            className={errors.amount ? 'input-error' : ''}
            disabled={isLoading}
            min="1"
          />
          {errors.amount && (
            <span className="error-message">{errors.amount}</span>
          )}
        </div>

        {/* Payment Method Selection */}
        <PaymentMethodSelect
          selectedMethod={formData.paymentMethod}
          onMethodChange={(method) => setFormData(prev => ({
            ...prev,
            paymentMethod: method
          }))}
          disabled={isLoading}
        />

        {/* Card Form (conditionally shown) */}
        {formData.paymentMethod === 'card' && (
          <CardForm
            onCardDetailsReady={(details) => {
              setFormData(prev => ({
                ...prev,
                cardDetails: details
              }));
            }}
            disabled={isLoading}
          />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Donate Now'}
        </button>

        <p className="terms-text">
          By donating, you agree to our Terms of Service and Privacy Policy
        </p>
      </form>

      {/* M-Pesa Modal */}
      {showMpesaModal && (
        <MpesaModal
          amount={formData.amount}
          onConfirm={handleMpesaConfirm}
          onCancel={() => {
            setShowMpesaModal(false);
            setIsLoading(false);
          }}
        />
      )}
    </div>
  );
}

export default DonationForm;