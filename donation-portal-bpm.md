# MSF Donation Portal - Business Process Map

```mermaid
flowchart TD
    A["🎯 Donor Visits Portal"] --> B["📝 Enter Details<br/>Name, Email, Amount"]
    
    B --> C{Valid<br/>Input?}
    C -->|No| D["❌ Show Error<br/>Highlight Fields"]
    D --> B
    
    C -->|Yes| E["💳 Select Payment Method"]
    
    E --> F{Payment<br/>Method?}
    
    %% M-Pesa Path
    F -->|M-Pesa| G["📱 Initiate STK Push"]
    G --> H["⏱️ Show Countdown Modal<br/>60s Timer"]
    H --> I["User Enters PIN<br/>on Device"]
    I --> J{Payment<br/>Confirmed?}
    
    J -->|Yes| K["✅ Payment Authorized"]
    J -->|No| L["❌ M-Pesa Error<br/>Insufficient Funds / Timeout"]
    L --> M["🔄 Retry Option"]
    M --> E
    
    %% Card Path
    F -->|Card| N["💳 Enter Card Details<br/>Number, CVV, Expiry"]
    N --> O{Valid<br/>Card?}
    O -->|No| P["❌ Invalid Card<br/>Show Error"]
    P --> N
    
    O -->|Yes| Q["🔒 Submit to Backend<br/>Tokenized Payment"]
    Q --> R{Payment<br/>Processing?}
    
    R -->|Declined| S["❌ Card Declined<br/>Try Another Method"]
    S --> E
    
    R -->|Timeout| T["❌ Network Error<br/>Try Again"]
    T --> Q
    
    R -->|Success| K
    
    %% Success Path
    K --> U["🎉 Display Success Screen"]
    U --> V["📋 Show Transaction ID<br/>Donation Confirmed"]
    V --> W["📧 Send Confirmation Email<br/>to Donor"]
    W --> X["✨ Show Receipt Details<br/>Amount, Method, Date"]
    X --> Y["🙏 Thank You Message<br/>& Share Impact"]
    Y --> Z["End - Donation Complete"]
```

---

## Flow Breakdown

| Stage | Actor | Actions | Notes |
|-------|-------|---------|-------|
| **Entry** | Donor | Submits name, email, amount | Frontend validation only |
| **Selection** | Donor | Chooses M-Pesa or Card | Routes to payment flow |
| **M-Pesa Flow** | System | Triggers STK Push, shows 60s countdown | User enters PIN on phone |
| **Card Flow** | Donor | Fills card form | Backend tokenizes (mocked) |
| **Processing** | Backend | Validates, simulates payment | Returns success/failure |
| **Confirmation** | System | Shows Transaction ID, sends receipt | Builds trust, closing loop |

---

## Error Handling

- **Invalid input** → Loop back to form
- **Payment declined** → Option to retry with same/different method
- **Network timeout** → Retry button + support email fallback
- **M-Pesa timeout** → 60s countdown expires → Retry

---

## Key Design Decisions

1. **Validation split**: Frontend (UX) + Backend (security)
2. **STK Push simulation**: Countdown timer + manual confirm for demo
3. **Card mocking**: Test cards (4242, 4000) to avoid PCI scope
4. **Success feedback**: Transaction ID + simulated email = trust
5. **Error paths**: All errors allow retry or method change