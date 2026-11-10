---
title: Org API
description: Read a workspace's inventory and audit log, manage tool policies and cut access from your security platform or SIEM, with a scoped Org API key.
---

# Org API

The Org API lets your own systems — a SIEM, a security platform, an offboarding script — see what a workspace's agents can reach and cut access without a person in the loop. It is the same data and the same actions as the workspace's [Security page](/organizations/).

An Org API key belongs to **one workspace** and **never acts as a person**: it cannot chat, run agents or use anyone's connections. It is not accepted anywhere else in goldnat, and personal keys are not accepted here.

## Creating a key

1. Open the workspace's **Security** page and go to **Integration keys**.
2. Click **New key**, give it a name, and choose its **scopes** and **lifetime** (default 90 days, at most 365).
3. Copy the key. It is shown **once**; goldnat stores only a hash of it.

Keys look like `gnat_org_…`. See [leaked keys](/organizations/#leaked-keys-revoke-themselves).

### Scopes

| Scope | Allows |
|-------|--------|
| `inventory:read` | Members, agents, connections, credentials, summary and findings, per-agent tool access, tool policies and the tool catalog, key-change impact. |
| `audit:read` | The audit log. |
| `revoke:write` | Revoke a connection, pause an agent, revoke an Org API key. Give it only to systems you trust to act. |
| `policy:write` | Add and remove workspace tool policies. |

A call outside the key's scopes is refused with `403 INSUFFICIENT_SCOPE` and recorded in the audit log as `org_api.scope_denied`.

## Making requests

Base URL:

```
https://goldnat.ai/api/org/v1
```

Send the key as a Bearer token. Request and response bodies are JSON.

```bash
curl https://goldnat.ai/api/org/v1/whoami \
  -H "Authorization: Bearer gnat_org_…"
```

```json
{ "keyId": "…", "prefix": "gnat_org_Ab3x", "workspaceId": "…", "scopes": ["inventory:read", "audit:read"] }
```

### Pagination

List endpoints that can grow return `{ "items": [...], "nextCursor": "…" }`. Pass `cursor=<nextCursor>` to get the next page; `nextCursor` is `null` on the last page. `limit` sets the page size (members and agents: up to 200; audit: up to 500).

### Errors

Errors return a JSON body `{ "error": "…", "code": "…" }`.

| Status | Code | Meaning |
|--------|------|---------|
| 401 | `UNAUTHORIZED` | No Bearer token. |
| 401 | `KEY_INVALID` | The key is not recognised. |
| 401 | `KEY_REVOKED` | The key was revoked. |
| 401 | `KEY_EXPIRED` | The key passed its expiry date. |
| 403 | `INSUFFICIENT_SCOPE` | The key lacks the scope this endpoint needs. |
| 400 | `VALIDATION_ERROR` | A parameter or body field is invalid. |
| 404 | `NOT_FOUND` | No such resource in this workspace. |
| 429 | `RATE_LIMITED` | Too many requests; retry after the `Retry-After` header. |

## Endpoints

| Method | Path | Scope |
|--------|------|-------|
| GET | `/whoami` | any |
| GET | `/inventory/summary` | `inventory:read` |
| GET | `/inventory/members` | `inventory:read` |
| GET | `/inventory/agents` | `inventory:read` |
| GET | `/inventory/agents/{agentId}/tools` | `inventory:read` |
| GET | `/inventory/connections` | `inventory:read` |
| GET | `/inventory/credentials` | `inventory:read` |
| GET | `/inventory/credentials/{keyId}/impact` | `inventory:read` |
| GET | `/policies/tools` | `inventory:read` |
| GET | `/policies/tools/catalog` | `inventory:read` |
| POST | `/policies/tools` | `policy:write` |
| DELETE | `/policies/tools/{policyId}` | `policy:write` |
| GET | `/audit/events` | `audit:read` |
| POST | `/revoke` | `revoke:write` |
| POST | `/keys/rotate` | any (rotates the calling key) |

### Summary and findings

`GET /inventory/summary`

```json
{
  "workspaceId": "…",
  "generatedAt": "2026-11-10T09:00:00.000Z",
  "counts": { "members": 12, "agents": 8, "activeAgents": 6, "connections": 15, "orgApiKeys": 2, "providerKeys": 1 },
  "findings": [
    { "kind": "agent_unrestricted_writes", "severity": "high", "targetType": "agent", "targetId": "…", "detail": "…" }
  ]
}
```

Finding kinds: `agent_unrestricted_writes`, `agent_key_unusable`, `agent_key_credit_fallback`, `stale_connection`, `stale_org_key`, `org_key_expiring`. See [Findings](/organizations/#findings).

### Members

`GET /inventory/members?cursor=&limit=&updated_since=`

Each item: `id`, `userId`, `email`, `name`, `role`, `joinedAt`, `lastSeenAt`, `status` (`active`, `suspended`, `banned`). `updated_since` (ISO date) returns only what changed since then — useful for incremental sync.

### Agents

`GET /inventory/agents?cursor=&limit=&updated_since=`

Each item: `id`, `name`, `ownerUserId`, `isActive`, `triggerType`, `schedule`, `modelId`, `sites`, `toolAllowList`, `toolDenyList`, `writeAccess` (`allowed`, `mode`, `tools`), `creditSource`, `aiKeySource` (`platform`, `workspace_key`, `creator_byok`), `aiKeyUserId`, `creditFallback`, `usesWorkspaceProviderKey`, `createdAt`, `updatedAt`, `lastRun` (`id`, `status`, `startedAt`, `actorUserId`, or `null`).

### Per-agent tool access

`GET /inventory/agents/{agentId}/tools`

Every tool the agent's sites expose, whether it is allowed, and the first layer that blocks it (see [Tool Policies](/organizations/tool-policies#how-access-is-decided)). `name` is the site-qualified name the agent and the audit log use; `tool` is the name as the site declares it.

```json
{
  "agentId": "…",
  "generatedAt": "…",
  "layers": ["site", "workspace_policy", "owner_site_group", "agent_rules", "write_approval"],
  "sites": [{ "siteUrl": "https://forum.example.com", "reachable": true, "tools": 42, "allowed": 30 }],
  "tools": [
    {
      "name": "forum_deleteThread",
      "tool": "deleteThread",
      "siteUrl": "https://forum.example.com",
      "kind": "write",
      "allowed": false,
      "blockedBy": "workspace_policy",
      "detail": "delete*",
      "policy": { "id": "…", "toolPattern": "delete*", "siteUrl": null, "reason": "No deletions by agents" }
    }
  ],
  "totals": { "tools": 42, "allowed": 30, "allowedWrites": 6, "blocked": 12 }
}
```

### Connections

`GET /inventory/connections`

The site connections the workspace's agents can use. Each item: `id`, `holder` (`member` or `workspace`), `ownerUserId`, `siteUrl`, `platform`, `siteUsername`, `authType` (`oauth` or `static`), `refreshable`, `createdAt`, `expiresAt`, `lastUsedAt`, `usedByAgents` (agent IDs). Members' other personal connections are never listed.

### Credentials

`GET /inventory/credentials`

Org API keys and workspace AI provider keys — never their secret values. Each item: `id`, `type` (`org_api_key` or `provider_key`), `label`, `prefix`, `provider`, `scopes`, `createdById`, `createdAt`, `expiresAt`, `lastUsedAt`, `revokedAt`.

`GET /inventory/credentials/{keyId}/impact?provider=`

What replacing a workspace AI key (pass the new key's `provider`: `anthropic`, `openai`, `gemini`, `openrouter`) or deleting it (no `provider`) would do to the agents that use it: which agents would stop working, how many are unaffected, and the options available.

### Tool policies

`GET /policies/tools` returns `{ "layers": [...], "items": [...] }`; each item has `id`, `siteUrl` (`null` = all sites), `toolPattern`, `reason`, `createdById`, `createdVia`, `createdAt`.

`GET /policies/tools/catalog` returns every tool the workspace's agents reach, per site, as the sites name them — the names a policy can match.

`POST /policies/tools`

```json
{ "siteUrl": "https://forum.example.com", "toolPattern": "delete*", "reason": "No deletions by agents" }
```

`toolPattern` is an exact tool name, a prefix ending in `*`, or `*`. Omit `siteUrl` (or send `null`) for all sites. Returns `201` with the new policy.

`DELETE /policies/tools/{policyId}` returns `{ "ok": true }`.

### Audit events

`GET /audit/events?since=&until=&action=&actor=&cursor=&limit=&order=`

| Parameter | Meaning |
|-----------|---------|
| `since`, `until` | ISO dates. `until` is exclusive. |
| `action` | One action, e.g. `tool.call`. |
| `actor` | A user ID. |
| `order` | `asc` (default, oldest first — for continuous polling) or `desc`. |
| `limit` | Up to 500, default 100. |

Returns `{ "events": [...], "nextCursor": "…" }`. For continuous collection, keep the last `nextCursor` and poll with it; new events append to the end. The event format is described in [Audit Log & Streaming](/organizations/audit-log#what-an-event-contains). If you prefer push to pull, use [audit streaming](/organizations/audit-log#streaming-to-your-tools).

### Revoke

`POST /revoke` — requires `revoke:write`.

```json
{ "type": "connection", "id": "…", "reason": "employee_offboarded" }
```

| `type` | Effect | Result |
|--------|--------|--------|
| `connection` | The site credential is deleted everywhere it is used; when the site supports token revocation, it is revoked at the site too. | `{ "type", "id", "revoked", "siteUrl", "remoteRevocation" }` |
| `agent` | The agent is paused at once, including scheduled and webhook runs. | `{ "type", "id", "paused": true, "changed" }` |
| `org_key` | The Org API key stops working. A key cannot revoke itself. | `{ "type", "id", "revoked": true }` |

The response is `{ "ok": true, "result": {...}, "revokedBy": { "orgKeyId": "…" } }`. Every revocation is recorded in the audit log and the affected person is notified.

### Rotating the key

`POST /keys/rotate`

```json
{ "graceHours": 24 }
```

Issues a replacement with the same scopes and lifetime. The old key keeps working for `graceHours` (default 24, at most 168; `0` revokes it at once), so your system can switch without downtime. Returns `201` with the new key in `apiKey` — shown once — and `oldKeyValidUntil`.

## Rate limits

Org API requests share the general limit of 2,000 requests per 15 minutes per IP address. For the audit log, prefer [streaming](/organizations/audit-log#streaming-to-your-tools) over tight polling.
