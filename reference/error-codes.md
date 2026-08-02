---
title: Error Codes
description: Complete reference of Goldnat API error codes with descriptions, HTTP status codes, and resolution steps.
---

# Error Codes

All API errors include a `code` field that identifies the specific error type. Use this reference to understand and resolve errors.

## Error Response Format

```json
{
  "error": "Human-readable error description",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

## Authentication Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `UNAUTHORIZED` | 401 | No valid authentication token provided | Sign in again; the JWT may have expired |
| `TOKEN_EXPIRED` | 401 | The JWT has expired | Refresh the page to obtain a new token |
| `TOKEN_REVOKED` | 401 | The JWT has been revoked (logout from another device) | Sign in again |
| `INVALID_TOKEN` | 401 | The token is malformed or invalid | Clear cookies and sign in again |
| `ADMIN_REQUIRED` | 403 | The endpoint requires admin privileges | Only admin users can access this endpoint |
| `TERMS_NOT_ACCEPTED` | 403 | User has not accepted the terms of service | Call `POST /auth/accept-terms` first |

## Rate Limiting Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `RATE_LIMITED` | 429 | Too many requests in the time window | Wait and retry; check the `Retry-After` header |
| `OUTGOING_RATE_LIMITED` | 429 | Too many outgoing tool calls to a site (10/min per domain) | Wait 60 seconds before retrying |

## Credit and Billing Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `NO_CREDITS` | 402 | Insufficient credit balance for the requested operation | Purchase credits or enable auto top-up on the Billing page |
| `NO_PAYMENT_METHOD` | 402 | No payment method on file for a purchase | Add a card on the Billing page |
| `PAYMENT_FAILED` | 402 | The payment charge was declined | Check your card details or use a different payment method |
| `SUBSCRIPTION_PAST_DUE` | 402 | Subscription payment is overdue | Update your payment method on the Billing page |

## Tier and Access Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `TIER_REQUIRED` | 403 | The feature requires a higher subscription tier | Upgrade your plan on the Billing page |
| `FEATURE_LIMIT_REACHED` | 403 | You have reached the limit for this feature on your tier (e.g., max agents, max sites) | Upgrade to a higher tier or remove unused items |
| `WORKSPACE_REQUIRED` | 403 | The operation requires a Team plan workspace | Upgrade to the Team plan |

## Session Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `INVALID_SESSION` | 400 | The session token is invalid or expired | Create a new session via `POST /sessions` |
| `SESSION_NOT_FOUND` | 404 | No session found with the provided token | The session may have expired; create a new one |
| `SESSION_EXPIRED` | 410 | The session has expired | Create a new session |

## Chat Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `CHAT_TIMEOUT` | 504 | The AI response took too long (90-second timeout) | Try again with a simpler prompt or a faster model |
| `STREAM_ABORTED` | 499 | The client disconnected during streaming | No action needed; the partial response is not saved |
| `MODEL_ERROR` | 502 | The AI provider returned an error | Try a different model or wait and retry |
| `TOOL_EXECUTION_ERROR` | 502 | A tool call to an external site failed | Check the site's status; the tool endpoint may be down |
| `SITE_UNAVAILABLE` | 503 | A connected site is not reachable | Verify the site is online and accessible |

## Vault Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `TOKEN_EXISTS` | 409 | A token for this site already exists in the vault | Use PATCH to update the existing token, or delete it first |
| `VAULT_LIMIT_REACHED` | 403 | Maximum sites in vault reached for your tier | Remove unused sites or upgrade your plan |
| `MANIFEST_NOT_FOUND` | 404 | Could not fetch the manifest from the site URL | Verify the URL is correct and the manifest is published |
| `MANIFEST_INVALID` | 422 | The manifest JSON is malformed or missing required fields | Fix the manifest; see the Manifest Format reference |

## Agent Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `AGENT_NOT_FOUND` | 404 | No agent found with the provided ID | Check the agent ID |
| `AGENT_LIMIT_REACHED` | 403 | Maximum agents reached for your tier | Delete unused agents or upgrade |
| `RUN_NOT_FOUND` | 404 | No run found with the provided ID | Check the run ID |
| `RUN_NOT_CANCELLABLE` | 400 | The run is not in a cancellable state (already completed or failed) | No action needed |
| `AGENT_ALREADY_RUNNING` | 409 | The agent already has an active run | Wait for the current run to finish |

## Webhook Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `WEBHOOK_SECRET_INVALID` | 401 | The `X-Webhook-Secret` header does not match | Verify the webhook secret in the agent configuration |
| `WEBHOOK_PAYLOAD_INVALID` | 422 | The request body does not match the webhook schema | Check the payload format against the agent's webhook schema |

## Validation Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `VALIDATION_ERROR` | 400 | Request body failed Zod schema validation | Check the error details for which fields are invalid |
| `INVALID_URL` | 400 | A provided URL is not valid | Ensure URLs include the protocol (https://) |
| `NOT_FOUND` | 404 | The requested resource does not exist | Check the ID or path |

## Workspace Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `WORKSPACE_NOT_FOUND` | 404 | No workspace found with the provided ID | Check the workspace ID |
| `PERMISSION_DENIED` | 403 | You do not have the required permission in this workspace | Contact the workspace admin for access |
| `MEMBER_NOT_FOUND` | 404 | The user is not a member of this workspace | Invite them first |
| `ROLE_CHANGE_FORBIDDEN` | 403 | Cannot change the owner's role | Ownership transfer is not supported via this endpoint |
