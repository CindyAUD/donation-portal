# MSF Eastern Africa Donation Portal

A responsive, secure online donations platform enabling donors to contribute using M-Pesa or Card payments.

**Live Demo:** [(https://donation-portal-nu.vercel.app/)]
**API Base URL:** [(https://donation-api-msf.onrender.com/health)]

## 📖 Overview

This project implements a full-stack donation portal for MSF Eastern Africa as part of their digital transformation initiative. The platform allows donors to make contributions securely using either M-Pesa (mobile money) or card payments.

**Key Objectives:**
- ✅ Demonstrate clean, maintainable code architecture
- ✅ Show thoughtful UX/UI design for donor trust
- ✅ Implement both frontend and backend validation
- ✅ Simulate payment processing (M-Pesa STK Push & Card)
- ✅ Provide robust error handling and user feedback

---

## ✨ Features

### Core Functionality
- **Responsive One-Page Donation Form**
  - Donor name, email, amount, payment method selection
  - Real-time frontend validation
  - Clear error messaging with field highlighting

- **Two Payment Methods**
  - **M-Pesa**: STK Push simulation with 60-second countdown timer
  - **Card**: Form with card number, expiry, CVV + auto-formatting

- **Security Assurance**
  - Sticky security banner throughout the donation flow
  - Trust-building messaging about data protection
  - Industry-standard practices documented

- **Payment Confirmation**
  - Success screen with unique Transaction ID
  - Donor receipt display (amount, method, date)
  - "Donate Again" functionality
  - Simulated email receipt notification

- **Comprehensive Error Handling**
  - Insufficient M-Pesa balance
  - Card declined scenarios
  - Network/timeout errors
  - Retry options for transient failures

### Technical Features
- **Form Validation**: Frontend (UX) + Backend (Security)
- **RESTful API**: Clean endpoints with consistent response format
- **CORS Enabled**: Ready for production cross-origin requests
- **In-Memory Storage**: Donations tracked during session
- **Configurable Payment Simulation**: Success rates, timeouts via .env
- **Accessibility**: Semantic HTML, ARIA labels, high contrast

---

## 🛠️ Technology Stack

### Backend
- **Framework**: Express.js (Node.js)
- **Language**: JavaScript (ES6+)
- **Key Libraries**:
  - `express`: Lightweight web framework
  - `cors`: Cross-origin resource sharing
  - `body-parser`: JSON request parsing
  - `uuid`: Transaction ID generation
  - `dotenv`: Environment variable management

**Why Express?**
- Lightweight and fast
- Perfect for REST APIs
- Minimal overhead
- Easy to deploy
- Great for demonstrating core architectural patterns

### Frontend
- **Framework**: React 18 (Hooks-based)
- **Language**: JSX/JavaScript (ES6+)
- **Key Libraries**:
  - `react`: UI component framework
  - `axios`: HTTP client for API calls
  - `react-dom`: React rendering engine

**Why React?**
- Component-based architecture (clean, reusable code)
- Excellent for forms and state management
- Strong ecosystem and tooling
- Great for demonstrating modern frontend patterns

### Styling
- **Plain CSS** with CSS Variables
- Mobile-first responsive design
- Dark mode support (media queries)
- Accessibility considerations (contrast, spacing)

**Why Plain CSS?**
- No build-time overhead
- Easy to review and modify
- Direct control over styling
- Demonstrates CSS fundamentals

---

## 📁 Project Structure

```
donation-portal/
├── backend/
│   ├── src/
│   │   ├── server.js                 # Express app entry point
│   │   ├── routes/
│   │   │   └── donations.js          # POST /api/donate endpoint
│   │   ├── middleware/
│   │   │   └── validation.js         # Input validation
│   │   └── utils/
│   │       ├── paymentSimulator.js   # Payment mocking
│   │       └── responseFormatter.js  # Consistent responses
│   ├── .env                          # Environment variables
│   ├── .env.example                  # Template
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── index.js                  # React entry point
│   │   ├── App.jsx                   # Root component
│   │   ├── components/
│   │   │   ├── DonationForm.jsx
│   │   │   ├── SecurityBanner.jsx
│   │   │   ├── PaymentMethodSelect.jsx
│   │   │   ├── MpesaModal.jsx
│   │   │   ├── CardForm.jsx
│   │   │   ├── SuccessScreen.jsx
│   │   │   └── ErrorDisplay.jsx
│   │   └── styles/
│   │       ├── App.css
│   │       ├── form.css
│   │       ├── modal.css
│   │       ├── paymentMethod.css
│   │       ├── cardForm.css
│   │       ├── error.css
│   │       ├── success.css
│   │       └── securityBanner.css
│   ├── public/
│   │   └── index.html
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md (this file)
```

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** or **yarn**
- **Git**

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/donation-portal.git
cd donation-portal
```

### Step 2: Backend Setup

```bash
cd backend
cp .env.example .env  # Create local environment file
npm install
```

### Step 3: Frontend Setup

```bash
cd ../frontend
cp .env.example .env  # Create local environment file
npm install
```

---

## 🏃 Running Locally

### Terminal 1: Start Backend
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
# Health check: http://localhost:5000/health
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm start
# Frontend runs on http://localhost:3000
```

### Verify Connection
- Frontend should load without CORS errors
- Test a donation flow end-to-end
- Check browser console for any errors

---

## 📡 API Documentation

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://donation-api-xxx.render.com/api`

### Endpoints

#### POST /api/donate
Submit a donation with payment method.

**Request:**
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

**Response (Success - 200):**
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

**Response (Validation Error - 400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "errors": {
      "donorEmail": "Invalid email format",
      "amount": "Amount must be greater than 0"
    }
  }
}
```

**Response (Payment Declined - 402):**
```json
{
  "success": false,
  "message": "Payment processing failed",
  "data": {
    "code": "PAYMENT_DECLINED",
    "reason": "M-Pesa balance insufficient",
    "retryable": true
  }
}
```

#### GET /api/donations
List all donations (testing endpoint).

**Response (200):**
```json
{
  "success": true,
  "message": "Retrieved 5 donations",
  "data": {
    "count": 5,
    "donations": [...]
  }
}
```

#### GET /api/donations/:transactionId
Get a specific donation by transaction ID.

**Response (200):**
```json
{
  "success": true,
  "message": "Donation found",
  "data": { /* donation object */ }
}
```

#### GET /health
Health check endpoint.

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2026-07-01T14:45:00Z"
}
```

---

## 🧪 Testing

### Test Card Numbers
- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **Any other**: Invalid card

### Test M-Pesa
- Simulates 85% success rate (configurable in `.env`)
- Random failures: insufficient funds, invalid PIN, timeout
- 3-second processing delay (configurable)

### Manual Testing Flows
1. **Valid M-Pesa donation** → Should succeed
2. **Invalid email** → Should show frontend error
3. **Card with success number** → Should show success screen
4. **Card with decline number** → Should show decline error
5. **Network retry** → Can retry failed donations

---

## 🌐 Deployment

### Prerequisites
- GitHub account (for repository)
- Render account (backend hosting)
- Vercel account (frontend hosting)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: MSF donation portal"
git branch -M main
git remote add origin https://github.com/yourusername/donation-portal.git
git push -u origin main
```

### Step 2: Deploy Backend to Render

1. Go to [render.com](https://render.com)
2. Click "New Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     ```
     NODE_ENV=production
     PORT=5000
     FRONTEND_URL=https://yourdomain.vercel.app
     MPESA_SUCCESS_RATE=0.85
     PAYMENT_TIMEOUT_MS=3000
     DEBUG=false
     ```
5. Deploy

**Get your backend URL**: `https://donation-api-xxx.render.com`

### Step 3: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Import from GitHub
4. Configure:
   - **Framework**: Detect "Create React App"
   - **Environment Variables**:
     ```
     REACT_APP_API_URL=https://donation-api-xxx.render.com/api
     REACT_APP_ENV=production
     ```
5. Deploy

**Get your frontend URL**: `https://yourdomain.vercel.app`

### Step 4: Update Backend CORS

Update backend `.env` on Render:
```
FRONTEND_URL=https://yourdomain.vercel.app
```

---

## 🎯 Design Decisions

### 1. Validation Split (Frontend + Backend)
- **Frontend**: Real-time validation for UX (email format, amount > 0)
- **Backend**: Strict validation for security (prevent tampering)
- **Why**: Balances user experience with security best practices

### 2. Payment Simulation
- **M-Pesa**: Random 85% success rate with realistic failure reasons
- **Card**: Test card numbers (4242 = success, 4000 = decline)
- **Why**: No PCI compliance burden, demonstrates payment flow thinking

### 3. In-Memory Storage
- Donations stored in Node array (lost on restart)
- **Why**: Scope of exercise, acceptable for demo, shows architectural thinking

### 4. Sticky Security Banner
- Always visible while scrolling
- Builds donor trust immediately
- **Why**: Donation context requires confidence in data safety

### 5. Transaction ID Format
- `TXN-YYYYMMDD-RANDOMHEX` (e.g., `TXN-20260701-A4B2C9E1`)
- **Why**: Looks realistic, easy to parse, unique per donation

### 6. Plain CSS Over Frameworks
- No Tailwind, Bootstrap, or CSS-in-JS
- CSS Variables for theming
- **Why**: Demonstrates CSS fundamentals, easier to review

---

## 🔐 Production Security

### Current Implementation (Demo)
- ✅ Frontend + Backend validation
- ✅ CORS protection
- ✅ Error messages don't leak sensitive info
- ✅ HTTPS-ready (automatic on Render/Vercel)

### Production Enhancements Needed

1. **Database Security**
   - Use PostgreSQL/MongoDB instead of in-memory
   - Implement row-level security
   - Encrypt sensitive fields at rest

2. **API Security**
   - Implement rate limiting (prevent abuse)
   - Add request signing/verification
   - Use API keys for authentication
   - Implement HTTPS/TLS everywhere

3. **Payment Security**
   - Integrate with real Stripe/IntaSend APIs
   - Tokenize card details (never store raw PAN)
   - PCI-DSS compliance audit
   - 3D Secure for card payments

4. **Data Protection**
   - Encrypt email addresses
   - Implement GDPR/privacy policy
   - Add data retention policies
   - Audit logging for all transactions

5. **Infrastructure**
   - WAF (Web Application Firewall)
   - DDoS protection
   - Monitoring & alerting
   - Regular security audits

6. **Email & Communications**
   - Verify email ownership
   - Implement DKIM/SPF for receipts
   - Use transactional email service (SendGrid, AWS SES)
   - Audit email delivery

---

## 🚀 Future Improvements

### Phase 2: Enhanced Features
- [ ] Donor account creation & login
- [ ] Donation history for registered donors
- [ ] Recurring/subscription donations
- [ ] Donation campaign tracking
- [ ] Multiple currency support (KES, USD, EUR)
- [ ] Admin dashboard for donation analytics
- [ ] Real email receipts with PDF generation
- [ ] SMS notifications for M-Pesa confirmation

### Phase 3: Advanced UX
- [ ] Animated progress indicators
- [ ] Suggested donation amounts
- [ ] Social sharing after donation
- [ ] Impact stories/testimonials carousel
- [ ] Multi-language support (Swahili, French)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Progressive Web App (PWA) capabilities
- [ ] Offline mode for form filling

### Phase 4: Technical Debt
- [ ] Convert to TypeScript for type safety
- [ ] Add comprehensive test suite (Jest, React Testing Library)
- [ ] Implement CI/CD pipeline (GitHub Actions)
- [ ] Add Swagger/OpenAPI documentation
- [ ] Database persistence (PostgreSQL)
- [ ] Real payment gateway integration
- [ ] Implement caching strategy
- [ ] Performance monitoring (Sentry, DataDog)

### Phase 5: Compliance & Scale
- [ ] GDPR compliance audit
- [ ] PCI-DSS certification
- [ ] SOC 2 compliance
- [ ] Load testing & auto-scaling
- [ ] CDN integration for static assets
- [ ] Analytics integration (Mixpanel, Amplitude)
- [ ] A/B testing framework

---

## 📝 Assumptions Made

1. **No Database Required**: Exercise scope allows in-memory storage; production would use PostgreSQL/MongoDB
2. **Simulated Payments**: No actual Stripe/M-Pesa integration needed for assessment
3. **Single Currency**: Demo uses KES only; production would support multiple
4. **No Authentication**: Open donations (no login required); production would verify donors
5. **Email Simulation**: Receipts shown on-screen (no actual email sending)
6. **Test Payments**: Card test numbers used (4242, 4000); production uses real gateways
7. **CORS Open**: Renders works during development; production restricts to domains
8. **Environment Variables**: All sensitive config via `.env` files

---

## 📞 Support & Contact

For questions about this implementation:
- Review the API documentation above
- Check deployment guides (Render, Vercel)
- Review code comments in key files


---

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ for MSF Eastern Africa**

*Last Updated: July 2026*