/**
 * Payment Simulator
 * Mocks M-Pesa STK Push and Card payment flows
 */

const MPESA_SUCCESS_RATE = parseFloat(process.env.MPESA_SUCCESS_RATE || 0.85);
const PAYMENT_TIMEOUT_MS = parseInt(process.env.PAYMENT_TIMEOUT_MS || 3000);

/**
 * Simulate payment processing
 * @param {string} paymentMethod - 'mpesa' or 'card'
 * @param {object} cardDetails - Card details (if card payment)
 * @param {number} amount - Donation amount
 * @returns {Promise<object>} - Payment result
 */
async function simulatePayment(paymentMethod, cardDetails, amount) {
  // Simulate network delay
  await sleep(PAYMENT_TIMEOUT_MS);

  if (paymentMethod === 'mpesa') {
    return simulateMpesaPayment(amount);
  } else if (paymentMethod === 'card') {
    return simulateCardPayment(cardDetails, amount);
  } else {
    return {
      success: false,
      message: 'Invalid payment method',
      code: 'INVALID_METHOD',
      reason: `Payment method '${paymentMethod}' not supported`,
      retryable: false
    };
  }
}

/**
 * Simulate M-Pesa STK Push payment
 */
function simulateMpesaPayment(amount) {
  const randomValue = Math.random();

  // Simulate random success/failure based on configured rate
  if (randomValue < MPESA_SUCCESS_RATE) {
    return {
      success: true,
      message: 'M-Pesa payment confirmed',
      method: 'mpesa'
    };
  } else {
    // Random M-Pesa failure scenario
    const failureReasons = [
      {
        code: 'INSUFFICIENT_FUNDS',
        reason: 'M-Pesa balance insufficient. Please top up and try again.'
      },
      {
        code: 'INVALID_PIN',
        reason: 'Invalid PIN entered. Please try again.'
      },
      {
        code: 'TIMEOUT',
        reason: 'STK prompt timed out. Please try again.'
      }
    ];

    const randomFailure = failureReasons[
      Math.floor(Math.random() * failureReasons.length)
    ];

    return {
      success: false,
      message: randomFailure.reason,
      code: randomFailure.code,
      reason: randomFailure.reason,
      retryable: true
    };
  }
}

/**
 * Simulate Card payment
 * Test card numbers:
 * - 4242 4242 4242 4242 = Success
 * - 4000 0000 0000 0002 = Declined
 */
function simulateCardPayment(cardDetails, amount) {
  if (!cardDetails || !cardDetails.number) {
    return {
      success: false,
      message: 'Card details missing',
      code: 'MISSING_CARD_DETAILS',
      reason: 'Card number is required',
      retryable: false
    };
  }

  const cardNumber = cardDetails.number.replace(/\s/g, '');

  // Success test card
  if (cardNumber.startsWith('4242')) {
    return {
      success: true,
      message: 'Card payment processed successfully',
      method: 'card'
    };
  }

  // Declined test card
  if (cardNumber.startsWith('4000')) {
    return {
      success: false,
      message: 'Your card was declined',
      code: 'CARD_DECLINED',
      reason: 'Card declined by issuer. Please try another payment method.',
      retryable: true
    };
  }

  // Invalid card (any other number)
  return {
    success: false,
    message: 'Invalid card number',
    code: 'INVALID_CARD',
    reason: 'The card number is invalid. Please check and try again.',
    retryable: false
  };
}

/**
 * Utility: Sleep function for simulating network delay
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  simulatePayment,
  simulateMpesaPayment,
  simulateCardPayment
};