# ANZ Worldline Solutions Payment Gateway Integration

This document describes the integration of **ANZ Worldline Solutions Hosted Checkout** into the Aussie Smart Energy MERN application.

---

## 1. Environment Variables Configuration

Add the following environment variables to your backend `.env` file (`server/.env`):

```env
# ANZ Worldline Payment Gateway Configuration
ANZ_MERCHANT_ID=your_anz_merchant_id
ANZ_API_KEY=your_anz_api_key
ANZ_API_SECRET=your_anz_api_secret
ANZ_API_ENDPOINT=payment.preprod.anzworldline-solutions.com.au
ANZ_ENVIRONMENT=sandbox
ANZ_WEBHOOK_SECRET=your_anz_webhook_secret
```

> **Note**: Placeholders are provided in `server/.env.example`. Server credentials must never be committed to repository or exposed to client-side JavaScript.

---

## 2. ANZ Worldline Merchant Portal Setup

1. Log into your **ANZ Worldline Merchant Back Office / Developer Portal**.
2. Navigate to **Developer / API Keys**.
3. Copy your **Merchant ID**, generate an **API Key ID**, and save the **Secret API Key**.
4. Navigate to **Webhooks** settings:
   - Set Webhook Notification URL: `https://yourdomain.com/api/payments/webhook`
   - Copy the Webhook Secret key into `ANZ_WEBHOOK_SECRET`.
5. Under **Hosted Checkout Configuration**:
   - Ensure Return URL redirection is allowed for your frontend domain (`http://localhost:5173/payment/result` or `https://aussiesmartenergy.vercel.app/payment/result`).

---

## 3. Architecture & Required Payment Flow

```
[React Frontend]
   │  1. User selects product/package & clicks "Pay Now with ANZ Worldline"
   ▼
[POST /api/payments/create]
   │  2. Server validates amount & creates PENDING Payment document in MongoDB
   │  3. Server invokes ANZ Worldline SDK (onlinepayments-sdk-nodejs)
   │  4. Server receives hostedCheckoutRedirectUrl & hostedCheckoutId
   ▼
[React Frontend]
   │  5. Redirects customer to ANZ Worldline Hosted Checkout page
   ▼
[ANZ Worldline Gateway]
   │  6. Customer completes credit card / payment details on secure gateway
   │  7. ANZ Worldline redirects customer back to /payment/result?paymentId=...
   ▼
[GET /api/payments/:paymentId/status]
   │  8. Backend verifies actual transaction status directly with ANZ Worldline API
   │  9. MongoDB Payment status updated (SUCCESS / FAILED / CANCELLED)
   ▼
[React Frontend]
   │ 10. Displays verified payment result page to customer
```

---

## 4. Key Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/payments/create` | Validates order details, creates `PENDING` DB record, and initializes ANZ Hosted Checkout session |
| `GET` | `/api/payments/:paymentId/status` | Verifies actual transaction status via ANZ API & updates MongoDB |
| `POST` | `/api/payments/webhook` | Handles asynchronous payment status events from ANZ Worldline |
| `GET` | `/api/payments/admin/all` | Admin endpoint to view payment records, search, filter, and view stats |

---

## 5. Running the Application Locally

1. **Install Dependencies**:
   ```bash
   # Root frontend dependencies
   npm install

   # Server backend dependencies
   cd server
   npm install
   ```

2. **Start Backend Server**:
   ```bash
   cd server
   npm run dev
   ```
   *(Runs on http://localhost:5000)*

3. **Start Frontend Dev Server**:
   ```bash
   npm run dev
   ```
   *(Runs on http://localhost:5173)*

---

## 6. How to Perform a Test Payment

1. Open the website at `http://localhost:5173/batteries/goodwe`.
2. Find any package card (e.g., **24kWh Solar Battery**).
3. Click **"Pay Now with ANZ Worldline"**.
4. Fill in First Name, Last Name, Email, Phone, and Address in the checkout modal.
5. Click **"Pay Now with ANZ Worldline"**.
6. The app will connect to ANZ Worldline and redirect to Hosted Checkout (or test simulation page in sandbox mode).
7. Upon completion/return to `/payment/result?paymentId=...`, the backend verifies the status and displays a verified receipt.
8. Log in to the Admin Portal at `/login/admin`, click **Payments** in the top header, and verify the transaction entry in MongoDB.

---

## 7. Switching from Test/Sandbox to Production

When ready to go live:
1. Update `ANZ_ENVIRONMENT` to `production` in `server/.env`.
2. Change `ANZ_API_ENDPOINT` to the live endpoint provided by ANZ Worldline Solutions (`payment.anzworldline-solutions.com.au`).
3. Replace `ANZ_MERCHANT_ID`, `ANZ_API_KEY`, and `ANZ_API_SECRET` with live production credentials.
4. Restart the backend service. No frontend or code changes are required.
