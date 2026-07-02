# API Documentation - MSF Donation Portal

## Overview

RESTful API for processing charitable donations via M-Pesa or Card payments. All responses follow a consistent JSON format with `success`, `message`, and optional `data` fields.

---

## Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:5000/api` |
| Production | `https://donation-api-msf.onrender.com/api` |

**Note:** The API accepts routes both with the `/api` prefix and at the root level for flexibility in deployment.

---

## Authentication

Currently no authentication required. Production deployment should implement:
- API key validation
- Request signing
- Rate limiting per IP/API key

---

## Response Format

All endpoints return JSON in this format:

### Success Response (2xx)
```json
{
  "success": true,
  "message": "Descriptive message",
  "data": {
    /* response payload */
  }
}
```

### Error Response (4xx, 5xx)
```json
{
  "success": false,
  "message": "Error description",
  "data": {
    "code": "ERROR_CODE",
    "reason": "Detailed reason",
    "retryable": true/false
  }
}
```

---

## Endpoints

### 0. GET / (Root)

**API status and available endpoints**

#### Request

**URL**: `GET /` or `GET /api`

#### Response (200)

```json
{
  "success": true,
  "message": "Donation API is running",
  "endpoints": ["/health", "/api/donate", "/api/donations"]
}
```

#### Example cURL Request

```bash
curl -X GET http://localhost:5000/
```

---

### 1. POST /donate

**Submit a donation with payment details**

#### Request

**URL**: `POST /api/donate`

**Content-Type**: `application/json`

**Body**:
```json
{
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "amount": 1000,
  "paymentMethod": "mpesa",
  "cardDetails": {
    "number": "4242424242424242",
    "expiry": "12/26",
    "cvv": "123"
  }
}
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `donorName` | string | Yes | Donor's full name (2-100 characters) |
| `donorEmail` | string | Yes | Valid email address (max 255 chars) |
| `amount` | number | Yes | Donation amount in KES (> 0, < 999,999,999) |
| `paymentMethod` | string | Yes | Either `"mpesa"` or `"card"` |
| `cardDetails` | object | Conditional | Required if `paymentMethod` = `"card"` |
| `cardDetails.number` | string | Conditional | Card number (13-19 digits) |
| `cardDetails.expiry` | string | Conditional | Expiry date in `MM/YY` format |
| `cardDetails.cvv` | string | Conditional | CVV code (3-4 digits) |

#### Response - Success (200)

```json
{
  "success": true,
  "message": "Donation processed successfully",
  "data": {
    "transactionId": "TXN-20260701-A4B2C9E1",
    "donorEmail": "john@example.com",
    "amount": 1000,
    "paymentMethod": "mpesa",
    "status": "completed",
    "timestamp": "2026-07-01T14:45:00Z",
    "receiptUrl": "/receipts/TXN-20260701-A4B2C9E1.pdf"
  }
}
```

#### Response - Validation Error (400)

```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "errors": {
      "donorName": "Name is required and must be a non-empty string",
      "donorEmail": "Email format is invalid",
      "amount": "Amount must be greater than 0",
      "paymentMethod": "Payment method must be either \"mpesa\" or \"card\""
    }
  }
}
```

#### Response - Payment Declined (402)

```json
{
  "success": false,
  "message": "Payment processing failed",
  "data": {
    "code": "PAYMENT_DECLINED",
    "reason": "M-Pesa balance insufficient. Please top up and try again.",
    "retryable": true
  }
}
```

#### Response - Server Error (500)

```json
{
  "success": false,
  "message": "Internal server error",
  "data": {
    "code": "SERVER_ERROR",
    "reason": "Payment gateway timeout",
    "retryable": true
  }
}
```

#### Example cURL Request

```bash
curl -X POST http://localhost:5000/api/donate \
  -H "Content-Type: application/json" \
  -d '{
    "donorName": "Jane Smith",
    "donorEmail": "jane@example.com",
    "amount": 5000,
    "paymentMethod": "mpesa"
  }'
```

#### Example JavaScript Request (Axios)

```javascript
import axios from 'axios';

const donationData = {
  donorName: "Jane Smith",
  donorEmail: "jane@example.com",
  amount: 5000,
  paymentMethod: "mpesa"
};

axios.post('http://localhost:5000/api/donate', donationData)
  .then(response => {
    console.log('Success:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response.data);
  });
```

---

### 2. GET /donations

**Retrieve all donations (testing endpoint)**

#### Request

**URL**: `GET /api/donations`

#### Response (200)

```json
{
  "success": true,
  "message": "Retrieved 5 donations",
  "data": {
    "count": 5,
    "donations": [
      {
        "transactionId": "TXN-20260701-A4B2C9E1",
        "donorEmail": "john@example.com",
        "amount": 1000,
        "paymentMethod": "mpesa",
        "status": "completed",
        "timestamp": "2026-07-01T14:45:00Z",
        "receiptUrl": "/receipts/TXN-20260701-A4B2C9E1.pdf"
      }
      /* ... more donations ... */
    ]
  }
}
```

#### Example cURL Request

```bash
curl -X GET http://localhost:5000/api/donations
```

---

### 3. GET /donations/:transactionId

**Retrieve a specific donation by transaction ID**

#### Request

**URL**: `GET /api/donations/TXN-20260701-A4B2C9E1`

#### Response - Found (200)

```json
{
  "success": true,
  "message": "Donation found",
  "data": {
    "transactionId": "TXN-20260701-A4B2C9E1",
    "donorEmail": "john@example.com",
    "amount": 1000,
    "paymentMethod": "mpesa",
    "status": "completed",
    "timestamp": "2026-07-01T14:45:00Z",
    "receiptUrl": "/receipts/TXN-20260701-A4B2C9E1.pdf"
  }
}
```

#### Response - Not Found (404)

```json
{
  "success": false,
  "message": "Donation not found"
}
```

#### Example cURL Request

```bash
curl -X GET http://localhost:5000/api/donations/TXN-20260701-A4B2C9E1
```

---

### 4. GET /health

**Health check endpoint**

#### Request

**URL**: `GET /health`

#### Response (200)

```json
{
  "status": "ok",
  "timestamp": "2026-07-01T14:45:00Z"
}
```

#### Example cURL Request

```bash
curl -X GET http://localhost:5000/health
```

---

## Error Codes & Meanings

| Code | HTTP Status | Description | Retryable |
|------|-------------|-------------|-----------|
| `VALIDATION_FAILED` | 400 | Input validation errors | No |
| `INVALID_METHOD` | 400 | Unsupported payment method | No |
| `MISSING_CARD_DETAILS` | 400 | Card details missing for card payment | No |
| `INSUFFICIENT_FUNDS` | 402 | M-Pesa balance too low | Yes |
| `CARD_DECLINED` | 402 | Card issuer declined payment | Yes |
| `INVALID_CARD` | 402 | Card number invalid | No |
| `INVALID_PIN` | 402 | Wrong M-Pesa PIN entered | Yes |
| `TIMEOUT` | 402 | Payment timeout (M-Pesa STK, network) | Yes |
| `SERVER_ERROR` | 500 | Internal server error | Yes |

---

## Payment Method Details

### M-Pesa Flow

1. **Client sends**: `paymentMethod: "mpesa"`
2. **Server simulates**: STK Push with configurable success rate (default 85%)
3. **Possible outcomes**:
   - ✅ Success (85% chance)
   - ❌ Insufficient funds (5% chance)
   - ❌ Invalid PIN (5% chance)
   - ❌ Timeout (5% chance)

**Test**: M-Pesa always works with valid donation data

### Card Flow

**Test Card Numbers**:

| Card Number | Result | Use Case |
|-------------|--------|----------|
| `4242 4242 4242 4242` | ✅ Success | Testing happy path |
| `4000 0000 0000 0002` | ❌ Declined | Testing error handling |
| Any other number | ❌ Invalid | Testing validation |

**Production**: Replace with real Stripe/IntaSend integration

---

## Rate Limiting (Future)

Current implementation: None

**Recommended for production**:
```
- 100 requests per minute per IP
- 1000 requests per hour per API key
- 429 Too Many Requests response
```

---

## CORS Headers

Configured to allow requests from frontend origin:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Environment (development/production) |
| `PORT` | 5000 | Server port |
| `FRONTEND_URL` | http://localhost:3000 | Frontend origin for CORS |
| `MPESA_SUCCESS_RATE` | 0.85 | M-Pesa success probability (0-1) |
| `PAYMENT_TIMEOUT_MS` | 3000 | Payment simulation delay (ms) |
| `DEBUG` | true | Enable debug logging |

---

## Examples

### Complete Donation Flow (M-Pesa)

```bash
# 1. Submit M-Pesa donation
curl -X POST http://localhost:5000/api/donate \
  -H "Content-Type: application/json" \
  -d '{
    "donorName": "Alice Johnson",
    "donorEmail": "alice@example.com",
    "amount": 2500,
    "paymentMethod": "mpesa"
  }'

# Response (Success):
{
  "success": true,
  "message": "Donation processed successfully",
  "data": {
    "transactionId": "TXN-20260701-B5C3D2E4",
    "donorEmail": "alice@example.com",
    "amount": 2500,
    "paymentMethod": "mpesa",
    "status": "completed",
    "timestamp": "2026-07-01T15:30:00Z",
    "receiptUrl": "/receipts/TXN-20260701-B5C3D2E4.pdf"
  }
}

# 2. Retrieve the donation
curl -X GET http://localhost:5000/api/donations/TXN-20260701-B5C3D2E4
```

### Complete Donation Flow (Card - Success)

```bash
# 1. Submit card donation
curl -X POST http://localhost:5000/api/donate \
  -H "Content-Type: application/json" \
  -d '{
    "donorName": "Bob Williams",
    "donorEmail": "bob@example.com",
    "amount": 10000,
    "paymentMethod": "card",
    "cardDetails": {
      "number": "4242 4242 4242 4242",
      "expiry": "12/26",
      "cvv": "123"
    }
  }'

# Response (Success):
{
  "success": true,
  "message": "Donation processed successfully",
  "data": {
    "transactionId": "TXN-20260701-C6D4E5F6",
    "donorEmail": "bob@example.com",
    "amount": 10000,
    "paymentMethod": "card",
    "status": "completed",
    "timestamp": "2026-07-01T15:35:00Z",
    "receiptUrl": "/receipts/TXN-20260701-C6D4E5F6.pdf"
  }
}
```

### Card Decline Scenario

```bash
# Submit with decline test card
curl -X POST http://localhost:5000/api/donate \
  -H "Content-Type: application/json" \
  -d '{
    "donorName": "Carol Brown",
    "donorEmail": "carol@example.com",
    "amount": 5000,
    "paymentMethod": "card",
    "cardDetails": {
      "number": "4000 0000 0000 0002",
      "expiry": "12/26",
      "cvv": "123"
    }
  }'

# Response (Declined):
{
  "success": false,
  "message": "Payment processing failed",
  "data": {
    "code": "CARD_DECLINED",
    "reason": "The card was declined by the issuer. Please try another payment method.",
    "retryable": true
  }
}
```

---

## Testing

### Using Postman

1. Import this API documentation
2. Set collection variables:
   - `base_url`: `http://localhost:5000/api`
3. Test each endpoint with provided examples
4. Verify error handling with invalid inputs

### Using Jest/Supertest

```javascript
const request = require('supertest');
const app = require('../backend/src/server');

describe('POST /api/donate', () => {
  it('should accept valid M-Pesa donation', async () => {
    const res = await request(app)
      .post('/api/donate')
      .send({
        donorName: 'Test User',
        donorEmail: 'test@example.com',
        amount: 1000,
        paymentMethod: 'mpesa'
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.transactionId).toBeDefined();
  });
});
```


