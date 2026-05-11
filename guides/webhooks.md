---
title: Webhook Triggers
description: Trigger WebMCP Master agents from external systems via webhooks — setup, authentication, payload format, and examples.
---

# Webhook Triggers

Webhook-triggered agents run when an external system sends an HTTP POST request to the agent's webhook URL. This enables integrations with CI/CD pipelines, monitoring tools, CMS platforms, and any system that can send HTTP requests.

## What Are Webhook-Triggered Agents

Unlike manual agents (run on demand) or scheduled agents (run on a cron schedule), webhook agents are **event-driven**. When the webhook URL receives a POST request, the agent starts a new run with the webhook payload available as context.

Common use cases:
- Run a content review agent when a new blog post is published
- Trigger a support agent when a ticket is created in a helpdesk
- Start a monitoring agent when a deployment completes
- Process form submissions from a website

## Setting Up a Webhook Endpoint

1. Create a new agent and select **Webhook** as the trigger type.
2. Save the agent.
3. The platform generates:
   - **Webhook URL** — the endpoint to POST to (e.g., `https://webmcp-master.ai/api/webhooks/agent/<agent-id>`)
   - **Webhook Secret** — a shared secret for authenticating requests

Copy both values. You will need them when configuring the external system.

::: warning
Do not share your webhook URL or secret publicly. Anyone with the URL and secret can trigger your agent.
:::

## Authentication

### Webhook Secret

Include the secret in the `X-Webhook-Secret` header:

```bash
curl -X POST https://webmcp-master.ai/api/webhooks/agent/<agent-id> \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: your-webhook-secret-here" \
  -d '{"event": "new_post", "post_id": 12345}'
```

The platform rejects requests with an invalid or missing secret (HTTP 401).

## Webhook Schema Builder

The agent configuration includes a **schema builder** that lets you define the expected payload structure. This serves two purposes:

1. **Validation** — incoming payloads are validated against the schema; invalid payloads are rejected
2. **Context** — the AI receives the schema definition so it understands what fields are available

Define fields with names and types:

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | The event type (e.g., "new_post") |
| `post_id` | number | The ID of the post |
| `author` | string | Username of the post author |
| `content` | string | The post content |

## Payload Format

Send a JSON body with your webhook data:

```json
{
  "event": "new_post",
  "post_id": 12345,
  "author": "john_doe",
  "title": "How to configure SSO",
  "content": "I'm trying to set up SSO on my forum...",
  "category": "Support",
  "created_at": "2026-05-11T10:30:00Z"
}
```

The entire payload is injected into the agent's context. The agent can reference fields from the payload in its reasoning and tool calls.

### Action Override

If **Allow action override from webhook** is enabled in the agent config, the payload can include an `action` field that overrides the agent's default system prompt:

```json
{
  "event": "new_post",
  "post_id": 12345,
  "action": "Translate this post to Spanish and post the translation as a reply."
}
```

::: warning
Only enable action override for trusted webhook sources. An untrusted source could inject arbitrary instructions into your agent.
:::

## Testing Webhooks

### Using curl

```bash
curl -X POST https://webmcp-master.ai/api/webhooks/agent/<agent-id> \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: your-secret" \
  -d '{"event": "test", "message": "Hello from curl"}'
```

### Using a Webhook Testing Tool

Services like webhook.site or RequestBin can help you debug payload formats before connecting to WebMCP Master.

### Checking the Run

After triggering:
1. Go to **Agents > [Agent] > Runs**.
2. The most recent run should show **Triggered by: Webhook**.
3. Click to see the full timeline, including the payload received.

## Example: Trigger Agent from GitHub Push

### 1. Create the Agent

- Name: "Deployment Notifier"
- System prompt: "When a push is received, summarize the commits and post a summary to the team forum."
- Sites: your team forum
- Trigger: Webhook

### 2. Configure GitHub Webhook

In your GitHub repository:
1. Go to **Settings > Webhooks > Add webhook**.
2. Payload URL: your agent's webhook URL.
3. Content type: `application/json`.
4. Secret: your agent's webhook secret.
5. Events: select **Push**.

### 3. GitHub Payload

When a push occurs, GitHub sends:

```json
{
  "ref": "refs/heads/main",
  "commits": [
    {
      "message": "Fix login page layout",
      "author": { "name": "Jane Smith" }
    },
    {
      "message": "Update dependencies",
      "author": { "name": "Bob Johnson" }
    }
  ],
  "repository": { "name": "my-app" }
}
```

The agent receives this payload, processes the commit messages, and posts a summary to the forum.

## Rate Limits

Webhook-triggered runs are queued sequentially. If multiple webhooks fire in rapid succession, runs are processed one at a time. The queue prevents overloading the agent worker.

If you need higher throughput, consider creating multiple agents for different event types.

::: info
Webhook triggers require the **Harness** plan or higher.
:::
