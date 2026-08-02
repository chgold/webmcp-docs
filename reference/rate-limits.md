---
title: Rate Limits
description: API rate limits, outgoing tool call limits, and how to handle 429 responses in Goldnat.
---

# Rate Limits

Goldnat applies rate limits at multiple levels to ensure platform stability and fair usage. This page documents all rate limit tiers and how to handle them.

## API Rate Limits

Rate limits are applied per user, tracked by JWT identity.

### General API Endpoints

| Window | Limit | Applies To |
|--------|-------|------------|
| 15 minutes | 500 requests | All authenticated endpoints |

This covers all `GET`, `POST`, `PATCH`, and `DELETE` requests to the API. Most users will never hit this limit under normal usage.

### Authentication Endpoints

| Window | Limit | Applies To |
|--------|-------|------------|
| 15 minutes | 10 requests | `/auth/*` endpoints |

A stricter limit on authentication endpoints to prevent brute-force attempts.

### Chat Endpoint

| Window | Limit | Applies To |
|--------|-------|------------|
| 1 minute | 20 requests | `POST /chat` |

The chat endpoint has its own limit to prevent rapid-fire message sending.

## Outgoing Rate Limits

Outgoing rate limits control how frequently the platform calls external sites on your behalf.

| Window | Limit | Scope |
|--------|-------|-------|
| 1 minute | 10 requests | Per user, per site domain |

This means each user can trigger at most 10 tool calls per minute to any single site. This protects external sites from being overwhelmed by automated tool calls.

### How This Affects Chat

In a single chat message, the AI can make multiple tool calls via the agentic loop. If the loop calls the same site more than 10 times in one minute, subsequent calls are delayed until the window resets.

### How This Affects Agents

Agents respect the same outgoing rate limit. An agent that needs to make many calls to a single site will pace itself automatically.

## Credit-Based Limits

Beyond rate limits, your credit balance acts as a soft limit:

- **Zero balance**: All AI interactions are blocked until credits are purchased or replenished
- **Insufficient balance**: The specific request is blocked if the estimated cost exceeds your balance

## Webhook Rate Limits

Incoming webhook triggers are queued, not rate-limited in the traditional sense:

- Multiple webhook triggers for the same agent are processed sequentially
- There is no limit on how many webhooks can be received, but runs are queued and executed one at a time
- A new run will not start until the previous run for that agent completes

## What Happens When Rate Limited

When you exceed a rate limit:

1. The API returns HTTP `429 Too Many Requests`.
2. The response includes a `Retry-After` header with the number of seconds to wait.
3. The response body includes the `RATE_LIMITED` error code.

```json
{
  "error": "Too many requests. Please try again in 45 seconds.",
  "code": "RATE_LIMITED",
  "statusCode": 429
}
```

Response headers:

```
HTTP/1.1 429 Too Many Requests
Retry-After: 45
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1715424000
```

## Handling 429 Responses

### In the Browser

The Goldnat frontend handles rate limits automatically — you will see a notification asking you to wait before retrying.

### In API Integrations

If you are calling the API programmatically:

```javascript
async function apiCall(url, options, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      const retryAfter = parseInt(
        response.headers.get('Retry-After') || '60', 
        10
      );
      console.log(`Rate limited. Retrying in ${retryAfter}s...`);
      await new Promise(r => setTimeout(r, retryAfter * 1000));
      continue;
    }
    
    return response;
  }
  throw new Error('Max retries exceeded');
}
```

### Best Practices

1. **Respect `Retry-After`** — do not retry before the specified time
2. **Implement exponential backoff** — if retries continue to fail, increase wait time
3. **Cache responses** — avoid redundant API calls for data that changes infrequently
4. **Batch operations** — combine multiple operations into fewer requests where possible
5. **Monitor your usage** — use the Analytics page to understand your request patterns

## Rate Limit Headers

Every API response includes rate limit headers:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed in the window |
| `X-RateLimit-Remaining` | Requests remaining in the current window |
| `X-RateLimit-Reset` | Unix timestamp when the window resets |
