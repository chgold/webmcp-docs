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

## Billing and Usage Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `INSUFFICIENT_CREDITS` | 402 | AI usage was attempted without a connected AI provider key | Connect your own API key (BYOK) in **Settings** — see the [BYOK Guide](/guides/byok) |
| `INSUFFICIENT_WORKSPACE_CREDITS` | 402 | A workspace agent ran without a workspace AI key configured | Add a workspace AI key in the workspace settings |
| `PAYMENT_FAILED` | 402 | A subscription payment charge was declined | Check your card details or use a different payment method |
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
| `GOAL_SITE_MISMATCH` | 400 | A goal references a site that is not one of the agent's sites | Only attach goals built for the agent's connected sites |

## Goal Building Errors

These can occur when creating a goal for a site (see [Goals & Capabilities](/features/capabilities)).

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `NO_SITES` | 400 | The chosen site is not connected to your account | Connect the site in your vault first |
| `NO_TOOLS` | 400 | The site currently exposes no tools to build the goal from | See the reason below and act accordingly |
| `MODEL_UNAVAILABLE` | 409 | No AI model is available to build the goal | Ask an admin to connect an AI provider, or choose an existing goal |
| `BUILD_EMPTY` | 422 | The goal needs tools this site does not offer | Adjust the goal, or use a site that exposes the needed tools |

When a `NO_TOOLS` error is returned, it includes a `reason` explaining why:

| Reason | Meaning | Resolution |
|--------|---------|------------|
| `auth_failed` | The connection to the site has expired or is no longer valid | Reconnect the site, then try again |
| `unreachable` | The site could not be reached (it may be down or blocked by a network filter) | Try again later |
| `empty_manifest` | The site is connected but currently exposes no tools | Nothing to build from on this site right now |

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

## Account Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `SESSION_REVOKED` | 401 | This sign-in was ended — for example when your organization required SSO or removed you | Sign in again |
| `SSO_REQUIRED` | 403 | Your organization requires signing in with its single sign-on | Use **Sign in with your organization (SSO)** — see [Domains & Single Sign-On](/organizations/sso) |
| `ACCOUNT_DEACTIVATED` | 403 | Your organization disabled this account through its identity provider | Contact your organization's administrator |
| `ACCOUNT_SUSPENDED` | 403 | The account is temporarily suspended | Wait until the suspension ends, or contact support |
| `ACCOUNT_BANNED` | 403 | The account is banned | Contact support |

## Agent Ownership and AI Key Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `KEY_SOURCE_INVALID` | 400 | The agent's AI key cannot run the chosen model (wrong provider, missing key, model not covered by credits) | Choose a matching key or another model — the agent dialog shows the reason |
| `KEY_CHANGE_AFFECTS_AGENTS` | 409 | Replacing or deleting a workspace AI key would stop agents that use it | Choose what happens to those agents, then save again |
| `AGENT_EXPAND_CREATOR_ONLY` | 403 | Only the agent's creator can add sites, turn tools back on, grant writes or add a webhook | Ask the creator, or have an admin transfer the agent to you |
| `AGENT_TRANSFER_FORBIDDEN` | 403 | Only workspace admins can transfer an agent | Ask a workspace admin |
| `TRANSFER_TARGET_NOT_MEMBER` | 400 | The new owner is not a member of the workspace | Invite them first |
| `TRANSFER_MISSING_SITES` | 409 | The new owner is not connected to some of the agent's sites | Confirm the transfer anyway, or have them connect the sites first |

## Security and Governance Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `INSUFFICIENT_PERMISSIONS` | 403 | You lack the workspace permission this action needs (for example **Manage security**) | Ask the workspace owner for the permission |
| `KEY_INVALID` / `KEY_REVOKED` / `KEY_EXPIRED` | 401 | The Org API key is not recognised, was revoked, or expired | Create or rotate a key — see [Org API](/organizations/org-api) |
| `INSUFFICIENT_SCOPE` | 403 | The Org API key lacks the scope this endpoint needs | Create a key with the needed scope |
| `SELF_REVOKE` | 400 | An Org API key tried to revoke itself through the API | Revoke it from the Security page |
| `NO_SCOPES` | 400 | A key must have at least one scope | Choose a scope |
| `INVALID_TOOL_PATTERN` | 400 | A tool policy pattern is not a tool name, a prefix ending in `*`, or `*` | Fix the pattern |
| `DUPLICATE_POLICY` | 409 | The same tool policy already exists | No action needed |
| `INVALID_DATADOG_SITE` | 400 | The Datadog site is not one of the supported sites | Choose your Datadog site from the list |
| `FORBIDDEN_URL` | 400 | The URL points to a private or internal network address | Use a public address |
| `HTTPS_REQUIRED` | 400 | The URL must use `https` | Use an `https` URL |

## Domain and Personal-Transfer Errors

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| `INVALID_DOMAIN` | 400 | The domain is not valid | Enter a bare domain such as `example.com` |
| `PUBLIC_DOMAIN` | 400 | Public mail domains (gmail.com, outlook.com…) cannot be verified | Use your organization's own domain |
| `DOMAIN_TAKEN` | 409 | Another workspace already verified this domain | Contact support if the domain is yours |
| `TXT_NOT_FOUND` | 422 | The verification TXT record was not found | Add the record at the domain itself and wait a few minutes for DNS |
| `DNS_LOOKUP_FAILED` | 502 | The domain's DNS could not be queried | Try again later |
| `NOT_MANAGED` | 400 | The account is not managed by an organization | Personal-content transfer applies only to managed accounts |
| `TRANSFER_DISABLED` | 403 | Your organization switched personal-content transfer off | Ask your organization's administrator |
| `TARGET_NOT_FOUND` | 404 | No active account uses that email | Sign up with it first |
| `SAME_ACCOUNT` | 400 | The target is the same account | Choose your other account |
| `TARGET_MANAGED` | 400 | The target account belongs to the same organization | Choose a personal account |
| `TRANSFER_PENDING` | 409 | A transfer is already waiting for approval | Cancel it first |
| `NOT_PENDING` | 409 | The transfer is no longer waiting (accepted, declined, cancelled or expired) | No action needed |
