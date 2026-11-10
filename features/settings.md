---
title: Settings
description: Manage your Goldnat profile, AI provider keys and subscriptions, MCP keys, default model, time zone, brief actions, email preferences and history.
---

# Settings

The Settings page lets you manage your profile, connect your AI providers, create MCP keys, and control your account. Access it from **Settings** in the sidebar.

## Profile

Your profile shows:
- **Name** and **Email** — from your Google account, or from your organization's sign-in if you use [single sign-on](/organizations/sso)
- **Plan** — your current subscription tier

Profile information cannot be edited directly within Goldnat.

## Organization Account

If your email is on a domain your organization verified, this section shows which organization manages the account. From here you can move your personal content to another goldnat account, and accept content someone moves to you. See [Organization-Managed Accounts](/organizations/managed-accounts).

## AI Provider Keys

Connect your own AI providers so chats and agents run on your own account. See [How AI Usage Is Paid](/getting-started/understanding-credits) for how this works with goldnat credits.

Each provider — **Anthropic**, **OpenAI**, **Google (Gemini)** and **OpenRouter** — has its own row:

- **API key** — paste a key and click **Save key**. **Test connection** checks that the provider accepts it.
- **Sign in with your account** — for Anthropic, connect your Claude subscription instead of pasting a key; for OpenRouter, signing in stores the key it issues for you (one connection, not two).
- **Remove key** / **Disconnect** removes the credential.

If a provider is not enabled on the platform, a key you add for it will not apply to any model; the row says so.

### What each model will use

This panel shows, per provider, what your chats will be billed to: **Your subscription**, **Your API key**, **Platform** credits, or **Not connected**. The priority is your connected subscription, then your own key, then goldnat credits.

### Key source

**My key** / **Platform credits** — choose whether your chats use your own key or goldnat credits. Your saved key is kept either way.

::: warning
Provider terms apply. Access to each model is governed by that provider's own terms. Signing in with a consumer subscription is a convenience path; if continuity matters, use an API key. See the [BYOK Guide](/guides/byok#provider-terms-and-restrictions).
:::

## MCP Keys

MCP keys let Claude Desktop, Claude Code and other MCP clients use Goldnat as you.

1. Click **New key**, give it a name (for example *Claude Desktop – laptop*) and choose how long it is **Valid for**.
2. Copy the key. It is shown only once and starts with `gnat_mcp_`.

Each key shows when it was created, last used and when it expires; keys close to expiry are marked **Expires soon**.

- **Rotate** creates a new key with the same name and lifetime. Choose how long the old key keeps working (**Keep the old key working for**, or **Stop it now**), so you can update your client first.
- **Revoke** stops a key at once.

If a key leaks to a public GitHub repository, it is revoked automatically and you are notified. See [Leaked keys revoke themselves](/organizations/#leaked-keys-revoke-themselves).

## Default Model

The model selected automatically when you start a new conversation.

## Language

Goldnat is available in English, Hebrew, Arabic, Russian, Spanish, French, German, Portuguese and Chinese. Use the language switcher in the sidebar or on the Settings page. Theme follows your system preference (light or dark).

## Time Zone

Your [morning brief](/features/dashboard) is scheduled and dated in this time zone — it decides what hour the brief arrives and which day it reports on. Without it, everything falls back to UTC.

## Brief Actions

When an agent proposes an action on a brief item, this decides when it becomes an action waiting for your approval:

- **Create on click** — the action is created only when you click it inside the item, so the approvals area stays clean.
- **Create upfront** — every proposed action is created during the morning sweep and waits in the approvals area.
- **Follow admin default** — use the platform's default.

## Personal System Prompt

Text automatically added to every chat session. Use it to set your preferred language, tone or context — for example *Always respond in Hebrew. I am a forum administrator.* Click **Save prompt**; **Clear** removes it. New sessions use it; existing sessions are not affected.

::: info
Personal system prompts are available on the **Pro** plan and above.
:::

## Email Preferences

- **Send me product news & updates** — occasional emails about new features.
- **Plugin development updates** — emails about updates to plugins you own.
- **Unsubscribe from all non-essential emails** — you still receive critical account and purchase emails.

## History

- **Context window** — the last 20 messages are loaded into AI context.
- **Total conversations** — the number of conversations in your account.

**Clear all chat history** deletes all your conversations, including tool call records and artifacts. It cannot be undone and does not affect your keys or settings.

## Deleting Your Account

To permanently delete your Goldnat account:

1. Contact **support@goldnat.ai** with your account email, or use **Contact us** in the side menu.
2. Your account enters a **30-day grace period** during which data is preserved but the account is disabled.
3. After 30 days, all data is permanently deleted — profile and credentials, vault tokens, conversation history, agents and their runs. Billing records are retained as the law requires.

If you change your mind during the grace period, contact support to reactivate.
