---
title: Bring Your Own Key (BYOK)
description: Use your own AI provider API key with Goldnat — setup, supported providers, security, and cost implications.
---

# Bring Your Own Key (BYOK)

BYOK lets you connect your own AI provider key or subscription to Goldnat. Calls then route to your provider account, and you pay the provider at its standard rates.

## What is BYOK

With your own credential connected, Goldnat sends requests to that provider on your behalf and the provider bills you directly. Without one, goldnat credits can pay for the models they cover — see [How AI Usage Is Paid](/getting-started/understanding-credits). A subscription plan is separate — it unlocks platform features (agents, scheduling, workspaces), not AI usage.

## Supported Providers

| Provider | Key Format | Dashboard |
|----------|-----------|-----------|
| **Anthropic** | `sk-ant-api03-...` | [console.anthropic.com](https://console.anthropic.com) |
| **OpenAI** | `sk-...` | [platform.openai.com](https://platform.openai.com) |
| **Google (Gemini)** | `AIza...` | [aistudio.google.com](https://aistudio.google.com) |
| **OpenRouter** | `sk-or-...` | [openrouter.ai](https://openrouter.ai) |

Instead of a key you can also **sign in with your account**: connect your Claude subscription for Anthropic, or sign in to OpenRouter (which stores the key it issues for you).

## How to Add Your API Key

### Personal Key (Settings)

1. Go to **Settings** → **AI provider keys**.
2. In the provider's row, paste your API key and click **Save key** — or choose **Sign in with your account**.
3. Click **Test connection** to check that the provider accepts it.

The matching models then use it automatically. **What each model will use** shows the result per provider; the priority is your connected subscription, then your own key, then goldnat credits. **Key source** lets you prefer credits while keeping your key saved.

### Workspace Key

For team usage, add keys at the workspace level:

1. Open your workspace.
2. Go to the **AI Keys** tab.
3. Click **Add Key**.
4. Select the provider, enter a display name, and paste the key.
5. Click **Save**.

Each workspace agent chooses who pays for its AI — a workspace key, goldnat credits, or the member's own key. See [Team Workspaces](/features/workspaces#who-pays-for-the-ai).

## Security

Your API key is encrypted before being stored in the database:

- **Algorithm**: AES-256-GCM (the same encryption used for vault tokens)
- **Key storage**: The encrypted key is stored in the database. The decryption key is in the server environment, not the database.
- **Decryption**: Happens only at the moment of an AI API call. The decrypted key is never cached in memory.
- **Access**: Only you (and workspace admins, for workspace keys) can view or modify the key. The raw key is never displayed after saving.

::: tip
Rotate your API keys periodically. Remove the old key from Goldnat, generate a new one from the provider, and save the new key.
:::

## Benefits

1. **Direct pricing** — you pay the provider's wholesale rates, with no platform markup
2. **Full model access** — use any model available from the provider, including new releases
3. **Higher rate limits** — your provider-level rate limits apply instead of platform limits
4. **Budget control** — manage spending directly through the provider's dashboard

## Risks and Considerations

1. **You pay the provider** — costs are charged to your provider account, not Goldnat
2. **Billing visibility** — BYOK spend is managed in your provider's dashboard; Goldnat's Analytics shows call count and token usage
3. **Key management** — if your key is revoked or expires, AI calls will fail until you update it
4. **Provider rate limits** — if you exceed the provider's rate limits, requests will be throttled

## Provider Terms and Restrictions

When you connect your own key, Goldnat relays your requests to the provider on your behalf. **Your access to each model is governed by that provider's own terms and remains subject to their approval.**

- A provider may rate-limit, suspend, or refuse service at its own discretion — including for usage it considers abusive, and including usage that Goldnat itself permits.
- You are responsible for complying with the usage policy of every provider whose key you connect. Connecting a key through Goldnat does not extend any additional licence or entitlement to you.
- **Goldnat cannot restore access that a provider has withdrawn.** If a provider restricts your key or account, the resolution is between you and that provider.
- Provider terms change without notice to us. Review them before connecting a key, and again if your usage pattern changes materially.

| Provider | Usage policy |
|----------|--------------|
| **Anthropic** | [anthropic.com/legal/aup](https://www.anthropic.com/legal/aup) |
| **OpenAI** | [openai.com/policies/usage-policies](https://openai.com/policies/usage-policies) |
| **Google (Gemini)** | [ai.google.dev/gemini-api/terms](https://ai.google.dev/gemini-api/terms) |
| **OpenRouter** | [openrouter.ai/terms](https://openrouter.ai/terms) |

::: warning
Subscription sign-in (connecting a Claude account instead of pasting an API key) is a convenience path, not a supported provider integration. Consumer subscription terms are generally written for interactive use by the account holder, and providers may treat programmatic access through a third-party platform differently from API-key access. If continuity matters to you, use an API key.
:::

## Rotating and Revoking Keys

### Rotating

1. Generate a new key from the provider's dashboard.
2. Go to **Settings** → **AI provider keys** in Goldnat.
3. Paste the new key in the provider's row and click **Save key** — it replaces the old one.
4. Click **Test connection**.

### Revoking

To remove a key:
1. Go to **Settings** → **AI provider keys**.
2. Click **Remove key** (or **Disconnect** for a signed-in account).
3. Confirm. Models of that provider then use goldnat credits where they cover them, or cannot be used until you connect again.

Also revoke the key on the provider's side to ensure it cannot be used elsewhere.

## BYOK + Agents

When using BYOK with agents:
- The agent's AI calls use the relevant BYOK key
- Tool execution (outgoing HTTP calls to sites) is still managed by the platform
- The agent run still appears in your run history with token counts

### Which Key an Agent Run Uses

- **Personal agents** — use the **creator's** credentials, regardless of who triggered the run.
- **Workspace agents** — use what the agent's **Who pays for the AI** setting says: goldnat credits, a workspace key, or the key of the member who chose their own.

This matters for shared and scheduled agents: a scheduled agent that runs every morning uses the creator's (or workspace's) BYOK key on every run, regardless of who set up the schedule.

## Direct Provider Cost

| Model | Direct Provider Cost (per 1K output tokens) |
|-------|---------------------------------------------|
| Claude Opus 5 | $0.025 |
| Claude Opus 4.7 | $0.025 |
| Claude Sonnet 4.6 | $0.015 |
| Claude Haiku 4.5 | $0.004 |

You are billed these rates directly by the provider.
