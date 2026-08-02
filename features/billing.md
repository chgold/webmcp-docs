---
title: Billing & Payments
description: Manage your Goldnat subscription, payment methods, credit purchases, auto top-up, and transaction history.
---

# Billing & Payments

The Billing page is your central hub for subscription management, credit purchases, and payment history. Access it from **Billing** in the sidebar.

## Current Plan and Balance

At the top of the Billing page, you see:

- **Current Plan** — your active subscription tier (Free, Pro, Harness, or Team)
- **Credits Balance** — your available credits
- **Monthly Allocation** — how many credits your plan provides per billing cycle
- **Next Renewal** — the date your subscription renews and credits reset

## Buying Credits

One-time credit packages supplement your monthly allocation:

1. Go to **Billing** > **Buy Credits**.
2. Choose a package:

| Package | Credits | Price | Value |
|---------|---------|-------|-------|
| Starter | 250 | $5.00 | $0.020 / credit |
| Standard | 600 | $10.00 | $0.017 / credit |
| Pro | 1,300 | $20.00 | $0.015 / credit |
| Bulk | 3,500 | $50.00 | $0.014 / credit |

3. Click **Buy**. A Paddle checkout overlay opens — enter your payment details there.
4. Once payment completes, credits are added to your account instantly.

Purchased credits **never expire**, unlike monthly allocation credits.

## Auto Top-Up

Avoid running out of credits with automatic purchasing:

1. Go to **Billing** > **Auto Top-up**.
2. Enable the toggle.
3. Configure:
   - **Threshold** — buy credits when balance drops below this number (e.g., 100)
   - **Amount** — how many credits to purchase each time (e.g., 500)
   - **Monthly Limit** — maximum credits to auto-purchase per month (optional; leave empty for no limit)
4. Click **Save Settings**.

Auto top-up requires an active paid subscription. When triggered, Paddle charges your subscription's payment method via a one-time charge — no separate card setup needed.

::: tip
A good starting configuration: threshold of 100 credits, purchase amount of 500 credits, monthly limit of 2,000 credits. Adjust based on your usage patterns shown in Analytics.
:::

## Upgrading Plans

1. Scroll to **Choose a Plan** on the Billing page.
2. Click **Upgrade** on the desired tier.
3. A Paddle checkout overlay opens — enter your payment details there.
4. Billing is prorated — you pay only for the remaining days in the current billing cycle.
5. New features and credits are available immediately.

## Downgrading Plans

1. Click **Downgrade** on a lower tier.
2. Review the changes:
   - The downgrade takes effect at the end of the current billing period.
   - Features above the new tier's limits will become inaccessible.
   - Remaining credits are preserved.
3. Confirm.

## Cancellation

1. Click **Cancel Subscription**.
2. Review the consequences:
   - Downgraded to Free at period end
   - Agents, scheduling, webhooks disabled
   - Monthly credits stop renewing
   - Workspace access suspended
3. Confirm cancellation.

You can **Reactivate** at any time before the period ends to restore your subscription.

## Transaction History

The **Billing History** section shows all past transactions:

| Column | Description |
|--------|-------------|
| **Date** | When the transaction occurred |
| **Description** | What was purchased (credits, plan change, etc.) |
| **Credits** | Number of credits involved |
| **Status** | Completed or Refunded |

Click **View Receipt** to see the receipt for a transaction.

## Credit Breakdown

Credits come from two sources:

- **Monthly allocation** — granted at the start of each billing cycle, expire at renewal
- **Purchased credits** — bought as one-time packages, never expire

The Billing page shows each source with its balance and expiry date. Monthly credits are consumed first.

## Refunds

If you purchased credits by mistake:
1. Find the transaction in Billing History.
2. Click **Refund**.
3. Confirm. The credits are deducted from your balance and the charge is reversed.

::: warning
Refunds deduct credits from your current balance. If you have already spent the credits, the refund will reduce your balance below zero — future credits will first replenish the negative balance.
:::
