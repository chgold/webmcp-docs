---
title: Bring Your Own Key (BYOK)
description: Use your own AI provider API key with WebMCP Master — setup, supported providers, security, and cost implications.
---

# Bring Your Own Key (BYOK)

BYOK lets you connect your own AI provider API key to WebMCP Master. When active, AI calls route directly to your provider account — no platform credits are consumed. You pay the provider at their standard rates.

## What is BYOK

By default, all AI interactions on WebMCP Master consume platform credits. Credits are priced with a small markup over raw provider costs to cover infrastructure and tool execution.

With BYOK, you bypass the credit system entirely for the provider you configure. The platform sends your API key directly to the provider, and you are billed at the provider's rates.

## Supported Providers

| Provider | Key Format | Dashboard |
|----------|-----------|-----------|
| **Anthropic** | `sk-ant-api03-...` | [console.anthropic.com](https://console.anthropic.com) |
| **OpenAI** | `sk-...` | [platform.openai.com](https://platform.openai.com) |
| **Google (Gemini)** | `AIza...` | [aistudio.google.com](https://aistudio.google.com) |
| **OpenRouter** | `sk-or-...` | [openrouter.ai](https://openrouter.ai) |
| **Ollama** | Local URL (e.g., `http://localhost:11434`) | Self-hosted |

## How to Add Your API Key

### Personal Key (Settings)

1. Go to **Settings** > **API Key**.
2. Enter your API key.
3. Click **Save Key**.

This key is used for all your personal chat sessions and manually-triggered agents.

### Workspace Key

For team usage, add keys at the workspace level:

1. Open your workspace.
2. Go to the **AI Keys** tab.
3. Click **Add Key**.
4. Select the provider, enter a display name, and paste the key.
5. Click **Save**.

Workspace agents can be configured to use a specific workspace key.

## Security

Your API key is encrypted before being stored in the database:

- **Algorithm**: AES-256-GCM (the same encryption used for vault tokens)
- **Key storage**: The encrypted key is stored in the database. The decryption key is in the server environment, not the database.
- **Decryption**: Happens only at the moment of an AI API call. The decrypted key is never cached in memory.
- **Access**: Only you (and workspace admins, for workspace keys) can view or modify the key. The raw key is never displayed after saving.

::: tip
Rotate your API keys periodically. Remove the old key from WebMCP Master, generate a new one from the provider, and save the new key.
:::

## Benefits

1. **No credit consumption** — AI calls using your key cost zero platform credits
2. **Direct pricing** — you pay the provider's rates, typically lower than platform credit markup
3. **Full model access** — use any model available from the provider, including new releases
4. **Higher rate limits** — your provider-level rate limits apply instead of platform limits
5. **Budget control** — manage spending directly through the provider's dashboard

## Risks and Considerations

1. **You pay the provider** — costs are charged to your provider account, not WebMCP Master
2. **No platform billing visibility** — BYOK usage does not appear in WebMCP Master's billing or credit balance (it does appear in Analytics for call count and token usage)
3. **Key management** — if your key is revoked or expires, AI calls will fail until you update it
4. **Provider rate limits** — if you exceed the provider's rate limits, requests will be throttled

## Rotating and Revoking Keys

### Rotating

1. Generate a new key from the provider's dashboard.
2. Go to **Settings** > **API Key** in WebMCP Master.
3. Click **Remove Key** to delete the old one.
4. Enter the new key and click **Save Key**.

### Revoking

To stop using BYOK and return to platform credits:
1. Go to **Settings** > **API Key**.
2. Click **Remove Key**.
3. Confirm. Future AI calls will consume platform credits.

Also revoke the key on the provider's side to ensure it cannot be used elsewhere.

## BYOK + Agents

When using BYOK with agents:
- The agent's AI calls use your BYOK key — zero credit cost
- Tool execution (outgoing HTTP calls to sites) is still managed by the platform
- The agent run still appears in your run history with token counts

For workspace agents, assign a workspace-level API key in the agent configuration dialog.

## Cost Comparison

| Model | Platform Credits (per 1K output tokens) | Direct Provider Cost (per 1K output tokens) |
|-------|---------------------------------------|---------------------------------------------|
| Claude Sonnet 4 | 15 credits (~$0.15) | $0.015 |
| GPT-4o | 10 credits (~$0.10) | $0.010 |
| Claude Haiku | 1.25 credits (~$0.013) | $0.001 |
| GPT-4o Mini | 0.6 credits (~$0.006) | $0.0006 |

Exact savings depend on your plan's credit pricing and the current provider rates.

::: info
BYOK requires the **Pro** plan or higher.
:::
