---
title: Settings
description: Manage your Goldnat profile, language, BYOK API keys, personal prompts, and account deletion.
---

# Settings

The Settings page lets you manage your profile, configure API keys, set a personal system prompt, and control your account. Access it from **Settings** in the sidebar.

## Profile Information

Your profile shows:
- **Name** — from your Google account
- **Email** — the Google email used to sign in
- **Plan** — your current subscription tier

Profile information is pulled from Google OAuth and cannot be edited directly within Goldnat.

## Language and Theme

Goldnat supports English and Hebrew. Use the language switcher in the sidebar or on the Settings page to change the interface language.

Theme follows your system preference (light or dark mode) automatically.

## BYOK: Bring Your Own API Key

Instead of consuming platform credits, you can use your own AI provider API key:

1. Go to **Settings** > **API Key**.
2. Enter your API key (e.g., an Anthropic `sk-ant-*` key).
3. Click **Save Key**.

When a BYOK key is active:
- Chat messages using the matching provider consume **zero platform credits**
- You are billed directly by the AI provider
- A badge shows "Using your own key" on the Settings page

To switch back to platform credits:
1. Click **Remove Key** on the Settings page.
2. Confirm. Future calls will use platform credits.

::: info
BYOK is available on the **Pro** plan and above. See the [BYOK Guide](/guides/byok) for detailed setup.
:::

## Personal System Prompt

A personal system prompt is text automatically prepended to every chat session. Use it to set your preferred language, communication style, or role context.

1. Go to **Settings** > **Personal System Prompt**.
2. Enter your prompt. Example:

```
Always respond in formal English. I am a site administrator 
managing a community forum with 50,000 members. Prioritize 
accuracy and provide sources when possible.
```

3. Click **Save Prompt**.

The prompt is applied to all new chat sessions. Existing sessions are not affected.

To remove it, click **Clear** and save.

::: info
Personal system prompts are available on the **Pro** plan and above.
:::

## Conversation History

The History section shows:
- **Context Window** — how many recent messages are loaded into AI context (last 20 messages)
- **Total Conversations** — the number of conversations in your account

### Clearing History

Click **Clear All Chat History** to delete all your conversations. This action:
- Removes all messages, tool call records, and artifacts
- Cannot be undone
- Does not affect your credit balance or account settings

## Deleting Your Account

To permanently delete your Goldnat account:

1. Contact **support@goldnat.ai** with your account email.
2. Your account enters a **30-day grace period** during which data is preserved but the account is disabled.
3. After 30 days, all data is permanently deleted:
   - Profile and credentials
   - Vault tokens (encrypted at rest, then deleted)
   - Conversation history
   - Agent configurations and run history
   - Billing records (Stripe records are retained per legal requirements)

If you change your mind during the grace period, contact support to reactivate.
