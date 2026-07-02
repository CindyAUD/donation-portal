# MSF Eastern Africa Donation Portal

A responsive donor-facing donation portal for MSF Eastern Africa with a React frontend and an Express backend. The app supports simulated M-Pesa and card payments, validation, success/error feedback, and basic donation tracking.

---

## Overview

This project demonstrates a small full-stack donation flow for a nonprofit campaign. It includes:

- a React donation form
- an Express API for submitting and viewing donations
- simulated payment processing for M-Pesa and card payments
- basic validation and error handling

---

## Features

- Responsive donation form with name, email, amount, and payment method selection
- Frontend validation for common input errors
- Backend validation for security and payload consistency
- Simulated M-Pesa and card payment flows
- Success and error states for donors
- In-memory donation storage for local demo purposes

---

## Tech Stack

### Backend
- Node.js
- Express.js
- dotenv
- cors
- body-parser
- uuid

### Frontend
- React 18
- React DOM
- axios
- CSS modules / plain CSS

---

## Project Structure

```text
donation-portal/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── middleware/
│   │   │   └── validation.js
│   │   ├── routes/
│   │   │   └── donation.js
│   │   └── utils/
│   │       ├── paymentSimulator.js
│   │       └── responseFormatter.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── utils/
│   ├── package.json
│   └── README.md
└── README.md
```

---

## Setup

### Prerequisites

- Node.js 16 or newer
- npm
- Git

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd donation-portal
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Create environment files

Create a backend environment file:

```bash
cd ../backend
copy .env.example .env
```

If the file is empty, add values such as:

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
DEBUG=true
MPESA_SUCCESS_RATE=0.85
PAYMENT_TIMEOUT_MS=3000
```

Create a frontend environment file:

```bash
cd ../frontend
copy .env.example .env
```

Add:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

---

## Running Locally

### Start the backend

```bash
cd backend
npm run dev
```

The backend will start on http://localhost:5000 by default. If port 5000 is already busy, it will try the next available port.

### Start the frontend

```bash
cd frontend
npm start
```

The frontend will run on http://localhost:3000.

---

## API Endpoints

### Base URL

- Development: http://localhost:5000/api

### POST /api/donate

Submit a donation.

Request body example:

```json
{
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "amount": 1000,
  "paymentMethod": "card",
  "cardDetails": {
    "number": "4242 4242 4242 4242",
    "expiry": "12/26",
    "cvv": "123"
  }
}
```

### GET /api/donations

Retrieve all stored donations (demo/testing endpoint).

### GET /api/donations/:transactionId

Retrieve one donation by transaction ID.

### GET /health

Health check endpoint.

---

## Testing

### Test cards

- Success: 4242 4242 4242 4242
- Declined: 4000 0000 0000 0002
- Any other number: invalid card

### Suggested manual checks

1. Submit a valid donation with card payment
2. Submit a donation with an invalid email
3. Try a declined card number
4. Confirm the success/error UI behaves as expected

---

## Troubleshooting

### Error: EADDRINUSE: address already in use :::5000

This means another process is already using port 5000.

You can:

- stop the old process and try again, or
- set a different port in the backend .env file

Example:

```env
PORT=5001
```

### Error: Cannot find module './routes/donations'

The backend currently uses the route file at [backend/src/routes/donation.js](backend/src/routes/donation.js). Make sure the import in [backend/src/server.js](backend/src/server.js) points to that file.

### Frontend cannot reach the API

Ensure that:

- the backend is running
- the frontend .env contains the correct REACT_APP_API_URL
- the backend CORS settings allow http://localhost:3000

---

## Deployment Notes

The app is currently designed for local demo use. For production, you would typically replace the in-memory storage with a database and integrate real payment processing.

---

## License

MIT
