---
title: API Reference
description: Complete reference of all WebMCP Master API endpoints — authentication, sessions, chat, vault, agents, billing, and more.
---

# API Reference

Base URL: `https://webmcp-master.ai/api`

All authenticated endpoints require a JWT cookie (set automatically by the browser after login). MCP endpoints use Bearer token authentication.

## Authentication

### GET /auth/me/full

Returns the authenticated user's full profile including plan, balance, and settings.

**Auth:** JWT cookie
**Response:**
```json
{
  "id": "user_abc123",
  "email": "user@example.com",
  "name": "Jane Smith",
  "tier": "pro",
  "balance": 850,
  "isAdmin": false,
  "settings": {
    "language": "en",
    "personalPrompt": "...",
    "hasApiKey": true
  }
}
```

### POST /auth/accept-terms

Accept the terms of service (required on first login).

**Auth:** JWT cookie
**Body:** None
**Response:** `{ "ok": true }`

### POST /auth/logout

Invalidate the current JWT and clear the auth cookie.

**Auth:** JWT cookie
**Response:** `{ "ok": true }`

## Sessions

### POST /sessions

Create a new chat session.

**Auth:** JWT cookie
**Body:**
```json
{
  "modelId": "claude-sonnet-4-20250514",
  "siteWhitelist": ["community.example.com"],
  "toolAllowList": [],
  "toolDenyList": ["*_delete_*"]
}
```
**Response:**
```json
{
  "token": "sess_abc123",
  "model": { "id": "claude-sonnet-4-20250514", "name": "Claude Sonnet 4" },
  "sites": ["community.example.com"],
  "toolAllowList": [],
  "toolDenyList": ["*_delete_*"]
}
```

### GET /sessions/:token

Retrieve session details by token.

**Auth:** JWT cookie
**Response:** Session object (same as POST response).

### GET /sessions/:token/tools

List available tools for the session. Rebuilds the tool registry from manifests if the Redis cache has expired.

**Auth:** JWT cookie
**Response:**
```json
{
  "tools": [
    {
      "name": "community_search_threads",
      "description": "Search forum threads by keyword",
      "input_schema": { ... },
      "site": "community.example.com"
    }
  ],
  "toolAllowList": [],
  "toolDenyList": ["*_delete_*"]
}
```

### PATCH /sessions/:token/tools

Update tool allow/deny lists for the session.

**Auth:** JWT cookie
**Body:**
```json
{
  "toolAllowList": ["community_search_*"],
  "toolDenyList": ["*_delete_*", "*_admin_*"]
}
```
**Response:** Updated session object.

## Chat

### POST /chat

Send a message and receive a streaming AI response via SSE.

**Auth:** JWT cookie
**Headers:** `Content-Type: application/json`
**Body:**
```json
{
  "sessionToken": "sess_abc123",
  "message": "Search for recent support threads",
  "conversationId": "conv_xyz789"
}
```

**Response:** Server-Sent Events stream

| Event | Data | Description |
|-------|------|-------------|
| `text` | `{ "text": "..." }` | Streamed text chunk |
| `tool_use` | `{ "name": "...", "input": {...} }` | Tool call initiated |
| `tool_result` | `{ "name": "...", "result": {...} }` | Tool call completed |
| `artifact` | `{ "title": "...", "type": "...", "content": "..." }` | Artifact generated |
| `done` | `{ "creditsUsed": 5, "conversationId": "..." }` | Stream complete |
| `error` | `{ "message": "...", "code": "..." }` | Error occurred |

## Conversations

### GET /conversations

List all conversations for the authenticated user.

**Auth:** JWT cookie
**Query:** `?search=keyword&modelId=...&from=2026-01-01&to=2026-05-11`
**Response:** Array of conversation summaries.

### POST /conversations

Create a new conversation.

**Auth:** JWT cookie
**Body:** `{ "title": "My conversation", "groupId": "grp_123" }`

### PATCH /conversations/:id

Update conversation title or group.

**Auth:** JWT cookie
**Body:** `{ "title": "New title", "groupId": "grp_456" }`

### DELETE /conversations/:id

Delete a conversation and all its messages.

**Auth:** JWT cookie

### POST /conversations/groups

Create a conversation group.

**Body:** `{ "name": "Support Chats", "color": "#6366f1" }`

### PATCH /conversations/groups/:id

Update a group name or color.

### DELETE /conversations/groups/:id

Delete a group. Conversations in the group become ungrouped.

## Vault

### GET /vault

List all vault tokens for the authenticated user.

**Auth:** JWT cookie
**Response:**
```json
[
  {
    "id": "vt_abc123",
    "domain": "community.example.com",
    "platform": "xenforo",
    "status": "active",
    "lastUsed": "2026-05-10T14:30:00Z",
    "createdAt": "2026-04-01T10:00:00Z"
  }
]
```

### POST /vault

Add a new site to the vault.

**Auth:** JWT cookie
**Body:**
```json
{
  "siteUrl": "https://community.example.com",
  "token": "bearer-token-value",
  "platform": "xenforo"
}
```

### PATCH /vault/:id

Update a vault token.

**Body:** `{ "token": "new-token-value" }`

### DELETE /vault/:id

Remove a site from the vault.

## Groups

### GET /groups

List all site groups.

### POST /groups

Create a site group.

**Body:**
```json
{
  "name": "Production Forums",
  "siteIds": ["vt_abc123", "vt_def456"],
  "toolDenyList": ["*_delete_*"]
}
```

### PATCH /groups/:id

Update group name, sites, or deny list.

### DELETE /groups/:id

Delete a site group.

## Agents

### GET /agents

List all agents for the authenticated user.

### POST /agents

Create a new agent.

**Body:**
```json
{
  "name": "Support Bot",
  "description": "Monitors support threads",
  "systemPrompt": "You are a support assistant...",
  "modelId": "claude-sonnet-4-20250514",
  "siteWhitelist": ["community.example.com"],
  "maxRounds": 5,
  "triggerType": "scheduled",
  "schedule": "0 */2 * * *",
  "isActive": true
}
```

### PATCH /agents/:id

Update agent configuration.

### DELETE /agents/:id

Delete an agent and all its run history.

### POST /agents/:id/run

Trigger a manual run of the agent.

**Response:** `{ "runId": "run_abc123" }`

## Runs

### GET /runs

List agent runs for the authenticated user.

**Query:** `?agentId=...&status=done&from=...&to=...`

### GET /runs/:id

Get run details including steps, status, credits, and duration.

**Response:**
```json
{
  "id": "run_abc123",
  "agentId": "agent_xyz",
  "status": "done",
  "triggeredBy": "manual",
  "startedAt": "2026-05-11T10:00:00Z",
  "completedAt": "2026-05-11T10:02:30Z",
  "credits": 12,
  "steps": [
    { "type": "thinking", "content": "..." },
    { "type": "tool_call", "name": "...", "input": {...} },
    { "type": "tool_result", "result": {...} },
    { "type": "output", "content": "..." }
  ]
}
```

### POST /runs/:id/cancel

Cancel a running agent run.

## Billing

### GET /billing/plans

List available subscription plans.

### POST /billing/checkout

Initiate a plan upgrade or credit purchase checkout.

**Body:** `{ "planId": "pro" }` or `{ "creditPackage": "standard" }`

### POST /billing/portal

Generate a Stripe customer portal session URL.

### GET /billing/payment-methods

List saved payment methods.

### POST /billing/payment-methods

Add a new payment method (Stripe card).

### DELETE /billing/payment-methods/:id

Remove a payment method.

### POST /billing/purchase-credits

Purchase a credit package using a saved payment method.

**Body:** `{ "packageId": "standard", "paymentMethodId": "pm_123" }`

### GET /billing/auto-topup

Get auto top-up configuration.

### PATCH /billing/auto-topup

Update auto top-up settings.

**Body:**
```json
{
  "enabled": true,
  "threshold": 100,
  "amount": 500,
  "monthlyLimit": 2000
}
```

### GET /billing/transactions

List purchase history.

### POST /billing/transactions/:id/refund

Refund a credit purchase.

## Credits

### GET /credits/balance

Get the current credit balance.

**Response:** `{ "balance": 850 }`

### GET /credits/breakdown

Get detailed credit breakdown by source.

**Response:**
```json
[
  { "type": "welcome", "granted": 50, "spent": 50, "remaining": 0, "expiresAt": null },
  { "type": "monthly", "granted": 1000, "spent": 200, "remaining": 800, "expiresAt": "2026-06-01" },
  { "type": "purchased", "granted": 500, "spent": 0, "remaining": 500, "expiresAt": null }
]
```

## Analytics

### GET /analytics

Get usage analytics for a date range.

**Query:** `?from=2026-05-01&to=2026-05-11`

**Response:**
```json
{
  "totalCalls": 342,
  "creditsUsed": 1250,
  "inputTokens": 450000,
  "outputTokens": 120000,
  "byModel": [
    { "model": "Claude Sonnet 4", "calls": 200, "credits": 900 },
    { "model": "Claude Haiku", "calls": 142, "credits": 350 }
  ],
  "daily": [
    { "date": "2026-05-01", "calls": 30, "credits": 110 }
  ]
}
```

## Directory

### GET /directory

List sites in the public directory.

**Auth:** JWT cookie
**Query:** `?search=forum&platform=xenforo&verified=true`

### POST /directory/sites

Register a new site in the directory.

**Auth:** JWT cookie
**Body:**
```json
{
  "url": "https://mysite.com",
  "name": "My Site",
  "description": "A community forum",
  "manifestUrl": "https://mysite.com/.well-known/webmcp.json"
}
```

## MCP (External Access)

MCP endpoints use Bearer token authentication instead of JWT cookies. These are used by external MCP clients.

### POST /mcp/tools/list

List available tools for the authenticated token.

**Auth:** Bearer token
**Response:** Array of tool definitions.

### POST /mcp/tools/call

Execute a tool call.

**Auth:** Bearer token
**Body:**
```json
{
  "name": "community_search_threads",
  "arguments": { "query": "login issues", "limit": 5 }
}
```

## Webhooks

### POST /webhooks/agent/:agentId

Trigger a webhook-triggered agent.

**Auth:** `X-Webhook-Secret` header
**Body:** JSON payload matching the agent's webhook schema.
**Response:** `{ "runId": "run_abc123" }`

## Common Error Responses

All errors follow a consistent format:

```json
{
  "error": "Human-readable message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

See [Error Codes](/reference/error-codes) for the full list.
