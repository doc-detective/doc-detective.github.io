---
sidebar_position: 7
---

# Billing & Usage

The billing API provides access to subscription information, usage metrics, and billing history for your Doc Detective account.

## Subscription Object

A subscription object contains the following properties:

```json
{
  "id": "sub_123456789",
  "account_id": "account_123456789",
  "plan": "pro",
  "status": "active",
  "current_period_start": "2025-08-01T00:00:00Z",
  "current_period_end": "2025-09-01T00:00:00Z",
  "trial_start": null,
  "trial_end": null,
  "cancel_at_period_end": false,
  "canceled_at": null,
  "created_at": "2025-08-01T00:00:00Z",
  "updated_at": "2025-08-01T00:00:00Z"
}
```

### Properties

- `id` (string): Unique identifier for the subscription
- `account_id` (string): ID of the account that owns this subscription
- `plan` (string): Subscription plan (`free`, `pro`, `enterprise`)
- `status` (string): Subscription status (`active`, `trialing`, `past_due`, `canceled`, `unpaid`)
- `current_period_start` (string): ISO 8601 timestamp of current billing period start
- `current_period_end` (string): ISO 8601 timestamp of current billing period end
- `trial_start` (string, nullable): ISO 8601 timestamp of trial period start
- `trial_end` (string, nullable): ISO 8601 timestamp of trial period end
- `cancel_at_period_end` (boolean): Whether subscription will cancel at period end
- `canceled_at` (string, nullable): ISO 8601 timestamp when subscription was canceled
- `created_at` (string): ISO 8601 timestamp of subscription creation
- `updated_at` (string): ISO 8601 timestamp of last update

## Get Subscription

Retrieve subscription information for your account.

```http
GET /billing/subscription
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "sub_123456789",
    "account_id": "account_123456789",
    "plan": "pro",
    "status": "active",
    "current_period_start": "2025-08-01T00:00:00Z",
    "current_period_end": "2025-09-01T00:00:00Z",
    "trial_start": null,
    "trial_end": null,
    "cancel_at_period_end": false,
    "canceled_at": null,
    "created_at": "2025-08-01T00:00:00Z",
    "updated_at": "2025-08-01T00:00:00Z"
  }
}
```

## Usage Object

A usage object contains the following properties:

```json
{
  "account_id": "account_123456789",
  "period_start": "2025-08-01T00:00:00Z",
  "period_end": "2025-09-01T00:00:00Z",
  "test_runs": {
    "used": 150,
    "limit": 1000,
    "unlimited": false
  },
  "storage": {
    "used": 2147483648,
    "limit": 10737418240,
    "unlimited": false
  },
  "api_requests": {
    "used": 5000,
    "limit": 50000,
    "unlimited": false
  }
}
```

### Properties

- `account_id` (string): ID of the account
- `period_start` (string): ISO 8601 timestamp of current billing period start
- `period_end` (string): ISO 8601 timestamp of current billing period end
- `test_runs` (object): Test run usage information
  - `used` (integer): Number of test runs used in current period
  - `limit` (integer): Maximum test runs allowed per period
  - `unlimited` (boolean): Whether test runs are unlimited
- `storage` (object): Storage usage information
  - `used` (integer): Storage used in bytes
  - `limit` (integer): Storage limit in bytes
  - `unlimited` (boolean): Whether storage is unlimited
- `api_requests` (object): API request usage information
  - `used` (integer): Number of API requests made in current period
  - `limit` (integer): Maximum API requests allowed per period
  - `unlimited` (boolean): Whether API requests are unlimited

## Get Usage

Retrieve current usage information for your account.

```http
GET /billing/usage
```

### Query Parameters

- `period_start` (string, optional): ISO 8601 timestamp to get usage for a specific period
- `period_end` (string, optional): ISO 8601 timestamp to get usage for a specific period

### Response

```json
{
  "success": true,
  "data": {
    "account_id": "account_123456789",
    "period_start": "2025-08-01T00:00:00Z",
    "period_end": "2025-09-01T00:00:00Z",
    "test_runs": {
      "used": 150,
      "limit": 1000,
      "unlimited": false
    },
    "storage": {
      "used": 2147483648,
      "limit": 10737418240,
      "unlimited": false
    },
    "api_requests": {
      "used": 5000,
      "limit": 50000,
      "unlimited": false
    }
  }
}
```

## Invoice Object

An invoice object contains the following properties:

```json
{
  "id": "inv_123456789",
  "account_id": "account_123456789",
  "subscription_id": "sub_123456789",
  "amount": 2900,
  "currency": "usd",
  "status": "paid",
  "period_start": "2025-08-01T00:00:00Z",
  "period_end": "2025-09-01T00:00:00Z",
  "due_date": "2025-08-01T00:00:00Z",
  "paid_at": "2025-08-01T10:30:00Z",
  "invoice_url": "https://billing.doc-detective.com/invoices/inv_123456789",
  "created_at": "2025-08-01T00:00:00Z"
}
```

### Properties

- `id` (string): Unique identifier for the invoice
- `account_id` (string): ID of the account that owns this invoice
- `subscription_id` (string): ID of the subscription this invoice is for
- `amount` (integer): Invoice amount in cents
- `currency` (string): Currency code (e.g., "usd")
- `status` (string): Invoice status (`draft`, `open`, `paid`, `void`, `uncollectible`)
- `period_start` (string): ISO 8601 timestamp of billing period start
- `period_end` (string): ISO 8601 timestamp of billing period end
- `due_date` (string): ISO 8601 timestamp when payment is due
- `paid_at` (string, nullable): ISO 8601 timestamp when invoice was paid
- `invoice_url` (string): URL to view/download the invoice
- `created_at` (string): ISO 8601 timestamp of invoice creation

## List Invoices

Retrieve billing history for your account.

```http
GET /billing/invoices
```

### Query Parameters

- `limit` (integer, optional): Number of invoices to return (default: 50, max: 100)
- `offset` (integer, optional): Number of invoices to skip (default: 0)
- `status` (string, optional): Filter by invoice status

### Response

```json
{
  "success": true,
  "data": {
    "invoices": [
      {
        "id": "inv_123456789",
        "account_id": "account_123456789",
        "subscription_id": "sub_123456789",
        "amount": 2900,
        "currency": "usd",
        "status": "paid",
        "period_start": "2025-08-01T00:00:00Z",
        "period_end": "2025-09-01T00:00:00Z",
        "due_date": "2025-08-01T00:00:00Z",
        "paid_at": "2025-08-01T10:30:00Z",
        "invoice_url": "https://billing.doc-detective.com/invoices/inv_123456789",
        "created_at": "2025-08-01T00:00:00Z"
      }
    ],
    "total": 1,
    "limit": 50,
    "offset": 0
  }
}
```

## Get Invoice

Retrieve a specific invoice.

```http
GET /billing/invoices/{invoice_id}
```

### Parameters

- `invoice_id` (string): The invoice ID

### Response

```json
{
  "success": true,
  "data": {
    "id": "inv_123456789",
    "account_id": "account_123456789",
    "subscription_id": "sub_123456789",
    "amount": 2900,
    "currency": "usd",
    "status": "paid",
    "period_start": "2025-08-01T00:00:00Z",
    "period_end": "2025-09-01T00:00:00Z",
    "due_date": "2025-08-01T00:00:00Z",
    "paid_at": "2025-08-01T10:30:00Z",
    "invoice_url": "https://billing.doc-detective.com/invoices/inv_123456789",
    "created_at": "2025-08-01T00:00:00Z"
  }
}
```

## Subscription Plans

### Free Plan
- **Test Runs**: 100 per month
- **Storage**: 1 GB
- **API Requests**: 1,000 per month
- **Support**: Community support
- **Price**: $0/month

### Pro Plan
- **Test Runs**: 1,000 per month
- **Storage**: 10 GB
- **API Requests**: 50,000 per month
- **Support**: Email support
- **Price**: $29/month

### Enterprise Plan
- **Test Runs**: Unlimited
- **Storage**: 100 GB
- **API Requests**: Unlimited
- **Support**: Priority support
- **Additional Features**: 
  - Custom contexts
  - Advanced analytics
  - SSO integration
  - Dedicated support
- **Price**: Contact sales

## Usage Limits

### Test Runs
- Each test execution counts as one test run
- Cancelled tests still count toward usage
- Usage resets at the beginning of each billing period

### Storage
- Includes all uploaded files and generated assets
- Screenshots, recordings, and test files count toward storage
- Files are automatically cleaned up based on retention policies

### API Requests
- All API calls count toward the limit
- Authentication requests are included
- Rate limiting may apply before reaching monthly limits

## Billing Cycle

- **Monthly billing**: Charges occur on the same day each month
- **Usage tracking**: Resets at the beginning of each billing period
- **Prorated charges**: Plan changes are prorated for the current period
- **Grace period**: 7-day grace period for failed payments

## Payment Methods

Supported payment methods:
- Credit cards (Visa, MasterCard, American Express)
- Debit cards
- Bank transfers (Enterprise plans only)

## Webhooks

Billing events can trigger webhooks to your application:

### Available Events
- `subscription.created`
- `subscription.updated`
- `subscription.canceled`
- `invoice.created`
- `invoice.paid`
- `invoice.payment_failed`
- `usage.limit_reached`

### Webhook Payload Example

```json
{
  "event": "invoice.paid",
  "data": {
    "id": "inv_123456789",
    "account_id": "account_123456789",
    "amount": 2900,
    "status": "paid",
    "paid_at": "2025-08-01T10:30:00Z"
  },
  "timestamp": "2025-08-01T10:30:00Z"
}
```

## Error Responses

### 402 Payment Required

```json
{
  "success": false,
  "error": {
    "code": "USAGE_LIMIT_EXCEEDED",
    "message": "Monthly test run limit exceeded. Upgrade your plan to continue."
  }
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "INVOICE_NOT_FOUND",
    "message": "Invoice not found"
  }
}
```

### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "SUBSCRIPTION_REQUIRED",
    "message": "This feature requires an active subscription"
  }
}
```