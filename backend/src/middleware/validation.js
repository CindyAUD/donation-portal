/**
 * Validation Middleware
 * Validates incoming donation requests
 */

const { formatResponse } = require('../utils/responseFormatter');

/**
 * Validate donation request payload
 */
function validateDonation(req, res, next) {
  const { donorName, donorEmail, amount, paymentMethod, cardDetails } = req.body;
  const errors = {};

  // Validate donor name
  if (!donorName || typeof donorName !== 'string' || donorName.trim().length === 0) {
    errors.donorName = 'Donor name is required and must be a non-empty string';
  } else if (donorName.length < 2) {
    errors.donorName = 'Donor name must be at least 2 characters';
  } else if (donorName.length > 100) {
    errors.donorName = 'Donor name must not exceed 100 characters';
  }

  // Validate email
  if (!donorEmail || typeof donorEmail !== 'string') {
    errors.donorEmail = 'Email is required';
  } else if (!isValidEmail(donorEmail)) {
    errors.donorEmail = 'Email format is invalid';
  }

  // Validate amount
  if (amount === undefined || amount === null || amount === '') {
    errors.amount = 'Amount is required';
  } else {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      errors.amount = 'Amount must be a valid number';
    } else if (numAmount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (numAmount > 999999999) {
      errors.amount = 'Amount exceeds maximum limit';
    }
  }

  // Validate payment method
  if (!paymentMethod || !['mpesa', 'card'].includes(paymentMethod)) {
    errors.paymentMethod = 'Payment method must be either "mpesa" or "card"';
  }

  // Validate card details if payment method is card
  if (paymentMethod === 'card') {
    if (!cardDetails) {
      errors.cardDetails = 'Card details are required for card payments';
    } else {
      const cardErrors = validateCardDetails(cardDetails);
      if (Object.keys(cardErrors).length > 0) {
        errors.cardDetails = cardErrors;
      }
    }
  }

  // If there are validation errors, return 400 response
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(
      formatResponse(false, 'Validation failed', { errors })
    );
  }

  // Validation passed, proceed to next middleware
  next();
}

/**
 * Validate card details
 */
function validateCardDetails(cardDetails) {
  const errors = {};

  if (!cardDetails.number || cardDetails.number.trim().length === 0) {
    errors.number = 'Card number is required';
  } else {
    const cleanNumber = cardDetails.number.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleanNumber)) {
      errors.number = 'Card number must be between 13 and 19 digits';
    }
  }

  if (!cardDetails.expiry || cardDetails.expiry.trim().length === 0) {
    errors.expiry = 'Expiry date is required';
  } else if (!/^\d{2}\/\d{2,4}$/.test(cardDetails.expiry)) {
    errors.expiry = 'Expiry date must be in MM/YY format';
  }

  if (!cardDetails.cvv || cardDetails.cvv.trim().length === 0) {
    errors.cvv = 'CVV is required';
  } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
    errors.cvv = 'CVV must be 3-4 digits';
  }

  return errors;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

module.exports = validateDonation;