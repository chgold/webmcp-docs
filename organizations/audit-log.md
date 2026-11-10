---
title: Audit Log & Streaming
description: An append-only record of every tool call and administrative change, readable on screen, through the Org API, or streamed to your SIEM.
---

# Audit Log & Streaming

Every tool call an agent or person makes in a workspace, and every administrative change to it, is recorded in the workspace's audit log. The log is **append-only**: events cannot be edited or deleted, except by the automatic retention purge.

## Reading the log

Open the workspace's **Security** page and go to **Audit log**. Filter by date range, action or person. The newest events come first.

Your security tools can read the same events through the [Org API](/organizations/org-api#audit-events), oldest first, with a cursor for continuous polling.

## What an event contains

```json
{
  "id": "0b7c1f9e-…",
  "occurredAt": "2026-11-10T09:14:03.512Z",
  "workspaceId": "db3184f2-…",
  "source": "agent",
  "action": "tool.call",
  "outcome": "success",
  "actor": { "userId": "…", "ownerUserId": "…" },
  "agentId": "…",
  "runId": "…",
  "siteUrl": "https://shop.example.com",
  "toolName": "updateOrderStatus",
  "target": null,
  "httpStatus": 200,
  "durationMs": 412,
  "ip": null,
  "metadata": { "inputKeys": ["orderId", "status"] }
}
```

- **`source`** — where it happened: `chat`, `agent`, `mcp_api`, `org_api`, `web`, `system`, `github_secret_scanning`, `scim`, `sso`.
- **`outcome`** — `success`, `failure` or `denied` (refused by a policy, a scope or a permission).
- **`actor.userId`** is who caused the action; **`actor.ownerUserId`** is whose connection or agent was used, when different.
- **Tool arguments are never stored** — only their key names. The log is exported to third-party systems, and arguments can carry personal data and secrets.

### Actions

| Group | Actions |
|-------|---------|
| Tools | `tool.call` |
| Agents | `agent.create`, `agent.delete`, `agent.pause`, `agent.transfer`, `agent.update_by_other`, `agent.key_source_change`, `agent.credit_fallback` |
| Connections & keys | `connection.revoke`, `mcp_key.create`, `mcp_key.rotate`, `mcp_key.revoke`, `org_key.create`, `org_key.rotate`, `org_key.revoke`, `org_api.scope_denied`, `secret.leak_reported` |
| Workspace AI keys | `workspace_key.replace`, `workspace_key.delete`, `workspace.credit_fallback_setting` |
| Members | `member.add`, `member.role_change` |
| Policies & streaming | `tool_policy.create`, `tool_policy.delete`, `audit_sink.create`, `audit_sink.delete`, `audit_sink.test` |
| Identity | `domain.add`, `domain.verify`, `domain.remove`, `sso.configure`, `sso.update`, `sso.delete`, `sso.login`, `scim_token.create`, `scim_token.revoke`, `scim.user.*`, `scim.group.*`, `scim.member.*`, `scim.default_role` |
| Managed accounts | `account.personal_transfer.request`, `account.personal_transfer.decline`, `account.personal_transfer.complete`, `account.personal_transfer.policy` |

New actions may be added over time. Treat unknown actions as informational rather than failing on them.

## Retention

Events are kept for the retention period of the workspace owner's plan (90 days by default), then purged automatically. To keep them longer, stream them to your own system.

## Streaming to your tools

Audit streaming sends every event to a destination you choose, in order, within about 30 seconds.

1. Open **Security → Audit streaming**.
2. Click **New destination** and choose the type.
3. Fill in the fields below. By default delivery starts from now; tick **Include retained history** to replay the events still kept in the log first.
4. Click **Save**, then **Send test** to check the connection. The test event has the action `audit_sink.test` and can be ignored.

| Type | Fields | How goldnat sends |
|------|--------|-------------------|
| **Webhook** | URL (https), signing secret | `POST` with a JSON body `{ "sinkId", "sentAt", "events": [...] }`, signed (see below). |
| **Splunk HEC** | HEC URL, HEC token | Events to your HTTP Event Collector, `sourcetype` `goldnat:audit`, header `Authorization: Splunk <token>`. |
| **Datadog** | Datadog site, API key | Logs intake for your site (`datadoghq.com`, `us3.datadoghq.com`, `us5.datadoghq.com`, `datadoghq.eu`, `ap1.datadoghq.com`), `ddsource:goldnat`, tagged with action, outcome and source. |

### Delivery guarantees

- **In order, at least once.** Each destination keeps its own position in the log and moves forward only after your endpoint answers with a 2xx status. A batch may be resent after a timeout, so **de-duplicate on the event `id`**.
- **Nothing is lost during an outage.** Delivery resumes from where it stopped.
- **Up to 200 events per request.**
- After 50 consecutive failures the destination is switched off and its creator is notified. Switching it back on resumes from the saved position.

### Verifying webhook signatures

Each webhook request carries:

```
X-Goldnat-Signature: t=1762765443,v1=5f2c…e9
```

`v1` is the hex HMAC-SHA256 of `"<t>.<raw body>"` with your signing secret. Check it against the **raw** request body, and reject requests whose `t` is more than a few minutes old.

```js
import crypto from 'node:crypto'

function verifyGoldnatSignature(rawBody, header, secret, toleranceSec = 300) {
  const parts = Object.fromEntries(header.split(',').map(p => p.split('=')))
  const t = Number(parts.t)
  if (!t || Math.abs(Date.now() / 1000 - t) > toleranceSec) return false
  const expected = crypto.createHmac('sha256', secret).update(`${t}.${rawBody}`).digest('hex')
  const a = Buffer.from(expected, 'hex')
  const b = Buffer.from(parts.v1 ?? '', 'hex')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}
```

Destination URLs must be public `https` addresses. Addresses on private or internal networks are refused, both when you save and before every delivery.
