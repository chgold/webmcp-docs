---
title: "Tutorial: Product Update Monitor"
description: Step-by-step tutorial to create an agent that monitors a store for product changes and posts updates.
---

# Product Update Monitor

In this tutorial, you will create an agent that periodically checks an online store for product changes (price drops, new items, stock changes) and posts update summaries to a forum or blog.

**Time:** 20 minutes
**Requirements:** Harness plan or higher, a connected store site and a connected forum/blog site

## What You Will Build

An agent that:
1. Queries a store site for recent product changes
2. Identifies notable changes (new products, price drops, out-of-stock items)
3. Generates a formatted update summary
4. Posts the summary to a community forum or blog

## Step 1: Set Up Your Sites

You need two sites connected in your vault:

1. **Store site** — with tools like `search_products`, `get_product`, `list_categories`
2. **Forum/Blog site** — with tools like `create_post` or `create_thread`

Create a **Site Group** containing both sites:
1. Go to **Site Groups** > **Create Group**.
2. Name: "Store Monitor Group".
3. Add both sites.
4. Add deny rules: `store_delete_*`, `store_admin_*` (safety — block destructive tools).

## Step 2: Create the Agent

1. Go to **Agents** > **New Agent**.
2. Configure:

| Field | Value |
|-------|-------|
| **Name** | Product Update Monitor |
| **Description** | Checks store for changes and posts updates |
| **Model** | Claude Haiku |
| **Sites** | Store Monitor Group |
| **Max Rounds** | 6 |
| **Trigger** | Scheduled |

3. Set the schedule: **Every day at 09:00** (cron: `0 9 * * *`).

4. Enter the system prompt:

```
You are a product update monitor for our online store.

TASK:
1. Search for products that were updated or added in the 
   last 24 hours. Use the search_products tool with a 
   date filter if available, or search by recent additions.

2. For each product found (up to 20), check for:
   - New products (added in the last 24 hours)
   - Price changes (compare current price to description 
     or metadata)
   - Stock status changes (newly out of stock or back in stock)

3. Generate a summary post with the following sections:
   - New Arrivals (products added today)
   - Price Drops (products with reduced prices)
   - Back in Stock (products that are available again)
   - Out of Stock Alerts (popular items no longer available)

4. Post the summary to the forum using the create_post 
   tool in the "Store Updates" category.
   Title: "Store Update — [Today's Date]"

RULES:
- Only post if there are actual changes to report.
- If no changes are found, output "No product changes 
  detected today" and do NOT create a post.
- Format prices with currency symbol ($).
- Include product names and direct links where available.
```

5. Click **Create**.

## Step 3: Test Manually

1. Click **Run Now**.
2. Monitor the run timeline.
3. Expected behavior:
   - Round 1: Agent calls `search_products` to find recent changes
   - Round 2-3: Agent calls `get_product` for details on changed items
   - Round 4: Agent generates the summary
   - Round 5: Agent calls `create_post` to publish the update

## Step 4: Review the Output

Check your forum for the posted update:

```markdown
# Store Update — May 11, 2026

## New Arrivals
- **Ultra Widget Pro** — $49.99 — High-performance widget 
  with advanced features
- **Eco Pack Starter Kit** — $29.99 — Environmentally 
  friendly starter bundle

## Price Drops
- **Standard Widget** — was $24.99, now **$19.99** (20% off)
- **Premium Connector Cable** — was $15.99, now **$11.99**

## Back in Stock
- **Wireless Adapter v3** — Previously sold out, now 
  available ($34.99)

## Out of Stock
- **Limited Edition Gold Widget** — No longer available
```

## Step 5: Fine-Tune

### Change Detection Strategy

If your store's API does not support date-filtered searches, use an alternative approach in the prompt:

```
Since the store API does not support date filtering:
1. Search for the top 20 products sorted by last modified date.
2. Focus on products where the update timestamp is within 
   the last 24 hours.
3. If modification dates are not available, search for 
   products in each category and compare with the previous 
   run's data (use your knowledge of what was reported 
   yesterday).
```

### Credit Budget Management

Monitor your agent's credit usage:

- **Target**: under 5 credits per run with Claude Haiku
- **If too high**: reduce max rounds, simplify the prompt, or limit the product count
- **If too low**: the agent is not doing enough work; increase the product limit or add more detail

### Handling Edge Cases

Update the prompt for scenarios like:
- Store is down or returns errors
- No products have changed (do not post an empty update)
- Too many changes (summarize the top 10 and link to the store)

## Cost Estimate

Using Claude Haiku with 6 max rounds:
- Per run: approximately 3-8 credits
- Daily schedule: 3-8 credits/day
- Monthly: 90-240 credits/month

## Variations

### Real-Time Monitoring with Webhooks

If your store platform supports webhooks for product changes:
1. Change the trigger to **Webhook**.
2. Configure the store to send webhooks on product create/update events.
3. The agent runs immediately when a change occurs instead of waiting for the daily schedule.

### Multi-Store Monitoring

Add multiple store sites to the group and update the prompt to check all stores. The summary post can include a section for each store.

### Price Alert Agent

Create a focused agent that only monitors price drops and sends notifications (via a webhook to Slack or email) instead of posting to a forum.
