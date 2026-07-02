const express = require('express');
const { v4: uuidv4 } = require('uuid');
const validateDonation = require('../middleware/validation');
const { simulatePayment } = require('../utils/paymentSimulator');
const { formatResponse } = require('../utils/responseFormatter');

const router = express.Router();

// In-memory storage for donations (for demo purposes)
const donations = [];

/**
 * POST /api/donate
 * Submit a donation with payment method
 */
router.post('/donate', validateDonation, async (req, res) => {
  try {
    const { donorName, donorEmail, amount, paymentMethod, cardDetails } = req.body;

    // Simulate payment processing
    const paymentResult = await simulatePayment(paymentMethod, cardDetails, amount);

    if (!paymentResult.success) {
      return res.status(402).json(
        formatResponse(false, paymentResult.message, {
          code: paymentResult.code,
          reason: paymentResult.reason,
          retryable: paymentResult.retryable
        })
      );
    }

    // Create donation record
    const transactionId = `TXN-${formatDate(new Date())}-${generateShortId()}`;
    const donationRecord = {
      transactionId,
      donorName,
      donorEmail,
      amount: parseFloat(amount),
      paymentMethod,
      status: 'completed',
      timestamp: new Date().toISOString(),
      receiptUrl: `/receipts/${transactionId}.pdf`
    };

    // Store donation (in-memory)
    donations.push(donationRecord);

    // Log for debugging
    if (process.env.DEBUG === 'true') {
      console.log(`💝 Donation received:`, donationRecord);
    }

    res.status(200).json(
      formatResponse(true, 'Donation processed successfully', donationRecord)
    );
  } catch (error) {
    console.error('Error processing donation:', error);
    res.status(500).json(
      formatResponse(false, 'Internal server error', {
        code: 'SERVER_ERROR',
        reason: error.message,
        retryable: true
      })
    );
  }
});

/**
 * GET /api/donations (for admin/testing)
 * Retrieve all donations
 */
router.get('/donations', (req, res) => {
  res.status(200).json(
    formatResponse(true, `Retrieved ${donations.length} donations`, {
      count: donations.length,
      donations: donations
    })
  );
});

/**
 * GET /api/donations/:transactionId
 * Retrieve a specific donation
 */
router.get('/donations/:transactionId', (req, res) => {
  const donation = donations.find(d => d.transactionId === req.params.transactionId);

  if (!donation) {
    return res.status(404).json(
      formatResponse(false, 'Donation not found')
    );
  }

  res.status(200).json(
    formatResponse(true, 'Donation found', donation)
  );
});

/**
 * Utility: Format date as YYYYMMDD
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

/**
 * Utility: Generate random hex string for Transaction ID
 */
function generateShortId() {
  return Math.random().toString(16).substring(2, 10).toUpperCase();
}

module.exports = router;