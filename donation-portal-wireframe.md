# MSF Donation Portal - Wireframe

## 1. Home/Donation Form (Mobile - Primary View)

```
┌─────────────────────────────┐
│  MSF Eastern Africa         │  ← Header with logo
│  Donate Now                 │
├─────────────────────────────┤
│                             │
│  🔒 Your donation is secure │  ← Security assurance banner
│     We protect your data    │
│                             │
├─────────────────────────────┤
│                             │
│  DONATION FORM              │
│                             │
│  Full Name *                │
│  ┌─────────────────────────┐│
│  │ John Doe                ││
│  └─────────────────────────┘│
│                             │
│  Email Address *            │
│  ┌─────────────────────────┐│
│  │ john@example.com        ││
│  └─────────────────────────┘│
│                             │
│  Donation Amount (KES) *    │
│  ┌─────────────────────────┐│
│  │ 1000                    ││
│  └─────────────────────────┘│
│                             │
│  Payment Method *           │
│  ┌──────────┐  ┌──────────┐│
│  │ 📱 M-Pesa│  │ 💳 Card  ││
│  │ (Select) │  │          ││
│  └──────────┘  └──────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │    DONATE NOW           ││
│  │    (Primary CTA)        ││
│  └─────────────────────────┘│
│                             │
│  By donating you agree to   │
│  our Terms & Privacy Policy │
│                             │
└─────────────────────────────┘
```

---

## 2. Payment Method: M-Pesa (Mobile - Active State)

```
┌─────────────────────────────┐
│  MSF Eastern Africa         │
├─────────────────────────────┤
│                             │
│  🔒 Your donation is secure │
│                             │
├─────────────────────────────┤
│                             │
│  DONATION: KES 1,000        │
│  TO: MSF Eastern Africa     │
│                             │
│  ✓ Full Name: John Doe      │
│  ✓ Email: john@example.com  │
│                             │
│  Selected: 📱 M-Pesa        │
│                             │
│  ┌─────────────────────────┐│
│  │    PROCEED TO PAYMENT   ││
│  └─────────────────────────┘│
│                             │
└─────────────────────────────┘
```

---

## 3. M-Pesa STK Push Modal (Overlay)

```
┌─────────────────────────────┐
│   ╔═════════════════════╗   │
│   ║  📱 ENTER M-PESA PIN║   │ ← Modal overlay (centered)
│   ╚═════════════════════╝   │
│                             │
│   An STK prompt will appear │
│   on your phone shortly.    │
│                             │
│   Enter your M-Pesa PIN on  │
│   your device to confirm.   │
│                             │
│   ⏱️  Time Remaining:       │
│   [========] 45 seconds     │
│                             │
│   Status: Waiting for       │
│   confirmation...           │
│                             │
│   ┌──────────────────────┐  │
│   │  Cancel              │  │
│   └──────────────────────┘  │
│                             │
└─────────────────────────────┘
```

---

## 4. Card Payment Form (Mobile)

```
┌─────────────────────────────┐
│  MSF Eastern Africa         │
├─────────────────────────────┤
│                             │
│  🔒 Your donation is secure │
│                             │
├─────────────────────────────┤
│                             │
│  DONATION: KES 1,000        │
│  TO: MSF Eastern Africa     │
│                             │
│  CARD DETAILS               │
│                             │
│  Full Name *                │
│  ┌─────────────────────────┐│
│  │ John Doe                ││
│  └─────────────────────────┘│
│                             │
│  Card Number *              │
│  ┌─────────────────────────┐│
│  │ 4242 4242 4242 4242     ││
│  └─────────────────────────┘│
│                             │
│  Expiry Date *   CVV *      │
│  ┌──────────┐   ┌────────┐  │
│  │ MM / YY  │   │ 123    │  │
│  └──────────┘   └────────┘  │
│                             │
│  ┌─────────────────────────┐│
│  │  SUBMIT PAYMENT         ││
│  └─────────────────────────┘│
│                             │
│  💡 Test: 4242... = Success │
│         4000... = Declined  │
│                             │
└─────────────────────────────┘
```

---

## 5. Success Screen (Mobile)

```
┌─────────────────────────────┐
│  MSF Eastern Africa         │
├─────────────────────────────┤
│                             │
│         🎉 SUCCESS! 🎉      │
│                             │
│   Thank you for your        │
│   generous donation!        │
│                             │
│   ━━━━━━━━━━━━━━━━━━━━━━   │
│                             │
│   DONATION RECEIPT          │
│                             │
│   Amount:                   │
│   KES 1,000                 │
│                             │
│   Payment Method:           │
│   M-Pesa                    │
│                             │
│   Transaction ID:           │
│   TXN-20260701-A4B2C9E1     │
│                             │
│   Donor Email:              │
│   john@example.com          │
│                             │
│   Date & Time:              │
│   1 July 2026, 2:45 PM      │
│                             │
│   ━━━━━━━━━━━━━━━━━━━━━━   │
│                             │
│   ✓ Confirmation email sent │
│     to john@example.com     │
│                             │
│   Your donation will help   │
│   save lives in Eastern     │
│   Africa.                   │
│                             │
│   ┌─────────────────────────┐│
│   │  DOWNLOAD RECEIPT       ││
│   └─────────────────────────┘│
│                             │
│   ┌─────────────────────────┐│
│   │  DONATE AGAIN           ││
│   └─────────────────────────┘│
│                             │
└─────────────────────────────┘
```

---

## 6. Error State - Invalid Input (Mobile)

```
┌─────────────────────────────┐
│  MSF Eastern Africa         │
├─────────────────────────────┤
│                             │
│  ⚠️  PLEASE CORRECT ERRORS  │
│                             │
├─────────────────────────────┤
│                             │
│  Email Address *            │
│  ┌─────────────────────────┐│
│  │ invalid-email ❌        ││  ← Red border/highlighting
│  └─────────────────────────┘│
│  Invalid email format       │  ← Error message
│                             │
│  Donation Amount (KES) *    │
│  ┌─────────────────────────┐│
│  │ 0 ❌                   ││  ← Red border
│  └─────────────────────────┘│
│  Amount must be > 0 KES     │  ← Error message
│                             │
│  ┌─────────────────────────┐│
│  │  DONATE NOW             ││  ← Disabled until fixed
│  │  (Disabled)             ││
│  └─────────────────────────┘│
│                             │
└─────────────────────────────┘
```

---

## 7. Error State - Payment Failed (Mobile)

```
┌─────────────────────────────┐
│  MSF Eastern Africa         │
├─────────────────────────────┤
│                             │
│         ❌ PAYMENT FAILED   │
│                             │
│   Your M-Pesa payment was   │
│   not confirmed. Possible   │
│   reasons:                  │
│                             │
│   • Insufficient balance    │
│   • STK prompt timed out    │
│   • Incorrect PIN entered   │
│                             │
│   ━━━━━━━━━━━━━━━━━━━━━━   │
│                             │
│   What you can do:          │
│                             │
│   ┌─────────────────────────┐│
│   │  TRY AGAIN              ││
│   │  (Same method)          ││
│   └─────────────────────────┘│
│                             │
│   ┌─────────────────────────┐│
│   │  TRY DIFFERENT METHOD   ││
│   │  (Switch to Card)       ││
│   └─────────────────────────┘│
│                             │
│   Need help?                │
│   Email: support@msf.org    │
│                             │
└─────────────────────────────┘
```

---

## 8. Desktop View (Responsive Layout)

```
┌─────────────────────────────────────────────────────────────┐
│             MSF EASTERN AFRICA - DONATE                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌──────────────────────────────┐  │
│  │                 │    │  DONATION FORM               │  │
│  │  MSF Logo &     │    │                              │  │
│  │  Impact Story   │    │  Name:    [_________________]│  │
│  │  (Left Sidebar) │    │  Email:   [_________________]│  │
│  │                 │    │  Amount:  [_________________]│  │
│  │  "Your donation │    │                              │  │
│  │   transforms    │    │  Payment Method:             │  │
│  │   lives"        │    │  ☐ M-Pesa   ☐ Card          │  │
│  │                 │    │                              │  │
│  │                 │    │  🔒 Secure & Private         │  │
│  │                 │    │                              │  │
│  │                 │    │  ┌──────────────────────────┐│  │
│  │                 │    │  │   DONATE NOW             ││  │
│  │                 │    │  └──────────────────────────┘│  │
│  │                 │    │                              │  │
│  └─────────────────┘    └──────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Design Principles

| Element | Design Decision | Why |
|---------|-----------------|-----|
| **Security Banner** | Top, sticky, prominent 🔒 | Builds trust immediately |
| **Color scheme** | MSF brand + trust colors (blues) | Professional, nonprofit feel |
| **Form layout** | Single column, clear labels | Mobile-first, accessibility |
| **Payment methods** | Large, visual buttons | Easy selection, obvious distinction |
| **Modals** | Center overlay, dark background | Focus on critical action (PIN entry) |
| **Error states** | Red highlights + clear messages | Immediate feedback, no ambiguity |
| **Success screen** | Celebratory tone + Transaction ID | Confirmation + proof of donation |
| **CTAs** | Primary (DONATE NOW) + Secondary (TRY AGAIN) | Clear hierarchy, next actions obvious |

---

## Responsive Breakpoints

- **Mobile**: 320px - 767px (Primary design)
- **Tablet**: 768px - 1023px (Stacked layout adjustments)
- **Desktop**: 1024px+ (Side-by-side layout)

---

## Accessibility Considerations

- All form fields have labels (not just placeholders)
- Error messages linked to fields via `aria-describedby`
- Color + icons for errors (not just red)
- High contrast for readability
- Tab order follows logical flow
- Countdown timer has text + visual indicator