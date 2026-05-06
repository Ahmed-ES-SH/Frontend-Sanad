# Direct Payment & Auto-Order Creation Integration Plan

This document outlines the API integration points and frontend flow for the **Direct Payment** feature. This flow allows a user to pay for a service *before* a `ServiceOrder` is officially created in the system. Upon successful payment, the backend automatically generates the order and notifies the frontend in real time.

## Architectural Overview

1. **Frontend**: Calls `POST /api/payments/create-intent` with the service details (`serviceId`, `userId`, `amount`).
2. **Frontend**: Completes the payment using Stripe.js and the returned `clientSecret`.
3. **Backend**: Receives a webhook from Stripe (`payment_intent.succeeded`).
4. **Backend**: Detects the `serviceId` in the metadata and automatically creates the `ServiceOrder`.
5. **Backend**: Broadcasts an `ORDER_CREATED` WebSocket notification to the user.
6. **Frontend**: Listens for the `ORDER_CREATED` notification and safely routes the user to their new order.

---

## 1. Create Payment Intent

**Endpoint:** `POST /api/payments/create-intent`  
**Description:** Initializes a Stripe payment intent enriched with metadata for auto-order creation.

### Request Body
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `amount` | `number` | **Yes** | Total amount in dollars (e.g., `50.00`). |
| `description` | `string` | **Yes** | Description to appear in Stripe (e.g., "Direct Service Payment"). |
| `userId` | `number` | **Yes** | The numeric ID of the user purchasing the service. |
| `serviceId` | `string` (UUID) | **Yes** | The UUID of the service being purchased. |
| `currency` | `string` | No | Currency code, defaults to `"usd"`. |

**Example Request:**
```json
{
  "amount": 150.00,
  "currency": "usd",
  "description": "Premium Service Payment",
  "userId": 123,
  "serviceId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Expected Response (201 Created)
```json
{
  "clientSecret": "pi_3N5xYz2eZvKYlo2C0bXcQpRt_secret_...",
  "paymentId": "123e4567-e89b-12d3-a456-426614174000",
  "stripePaymentIntentId": "pi_3N5xYz2eZvKYlo2C0bXcQpRt"
}
```

*Note: Use the `clientSecret` with Stripe.js to complete the payment UI.*

---

## 2. WebSockets: Listening for Real-Time Order Creation

Once Stripe processes the payment, the backend will auto-create the order via webhooks and notify the client.

### Event Details
- **WebSocket Event Name:** `ORDER_CREATED` (via your existing notification listener).
- **Notification Type Enum:** `"ORDER_CREATED"`

### Expected Notification Payload
```typescript
interface OrderCreatedPayload {
  userId: number;
  type: 'ORDER_CREATED';
  title: string;          // e.g., "Order Placed"
  message: string;        // e.g., "Your order for 'Service Name' has been placed and payment confirmed."
  data: {
    orderId: string;      // The newly auto-generated ServiceOrder UUID
    isRedirect: boolean;  // 🔴 IMPORTANT: Routing flag (see details below)
  };
}
```

---

## 3. Frontend Routing Logic & Idempotency (`isRedirect`)

Because Webhooks can theoretically be retried by Stripe, or users might double-submit, the backend implements an **Idempotency Guard**. The frontend must handle the `isRedirect` flag properly when receiving the `ORDER_CREATED` socket event.

### Pseudo-code for Frontend WebSocket Handler

```javascript
socket.on('notification', (notification) => {
  if (notification.type === 'ORDER_CREATED') {
    const { orderId, isRedirect } = notification.data;
    
    // Stop any loading spinners on the checkout page
    setCheckoutLoading(false);

    if (isRedirect) {
      // isRedirect = true indicates this payment already resulted in an order.
      // E.g., The user refreshed the page after paying or a delayed webhook arrived.
      // Action: Silently redirect the user to the existing order screen.
      toast.info('You already have an active order for this payment.');
      router.push(`/orders/${orderId}`);
    } else {
      // isRedirect = false indicates this is a brand new order.
      // Action: Show a success animation/toast and navigate to the order tracking page.
      toast.success('Payment successful! Your order has been created.');
      router.push(`/orders/${orderId}?success=true`);
    }
  }
});
```

---

## Summary of the Dev Workflow

1. User clicks "Pay Now" on a service page.
2. Frontend calls `POST /api/payments/create-intent` passing `userId` and `serviceId`.
3. Frontend mounts the Stripe Element using the `clientSecret`.
4. User completes payment. Frontend shows a loading spinner (do NOT redirect immediately).
5. Stripe fires webhook `payment_intent.succeeded` -> Backend auto-creates order.
6. Backend fires `ORDER_CREATED` socket event.
7. Frontend socket listener catches `ORDER_CREATED`, hides the spinner, and redirects the user to the new `orderId`.
