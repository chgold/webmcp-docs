---
title: Quickstart
description: Get up and running with Goldnat in under 5 minutes — sign in, connect a site, and chat with AI.
---

# Quickstart

This guide walks you through your first interaction with Goldnat. By the end, you will have connected a website and had AI perform an action on it.

## Prerequisites

- A Google account (used for sign-in)
- A website that supports the Servio protocol, or a site where you have an API token

## Step 1: Sign In

Navigate to [goldnat.ai](https://goldnat.ai) and click **Sign in with Google**. After authenticating, you will land on the Dashboard.

New accounts receive **50 welcome credits** to get started at no cost.

## Step 2: Add a Site to Your Vault

1. From the Dashboard, click **Add Site** (or navigate to **Sites** in the sidebar).
2. In the Quick Connect dialog, enter the site URL (e.g., `https://community.example.com`).
3. Paste your API token for that site. If the site supports Servio OAuth, you can authenticate directly instead.
4. Click **Add**. The platform will fetch the site manifest and register all available tools.

::: tip
If you do not have a site yet, browse the **Directory** to discover Servio-enabled sites and connect with one click.
:::

## Step 3: Start a Chat Session

1. Navigate to **Chat** in the sidebar.
2. Click **New Session**.
3. Select an AI model (e.g., Claude Sonnet 4).
4. Under **Sites**, check the site you just added.
5. Click **Start Chat**.

## Step 4: Send a Message

Type a message that asks the AI to interact with your site. For example:

```
Show me the 5 most recent posts on the forum.
```

The AI will:
1. Identify the appropriate tool from the site manifest (e.g., `community_search_threads`)
2. Call the tool with the right parameters
3. Receive the results from your site
4. Format and present the answer in the chat

You will see the tool call and result appear in the conversation:

```
Assistant: I'll search for the most recent posts on the forum.

[Tool Call: community_search_threads]
  Parameters: { "order": "date", "limit": 5 }

[Tool Result: 5 threads returned]

Here are the 5 most recent posts:

1. "How to configure SSO" — posted by admin, 2 hours ago
2. "Feature request: dark mode" — posted by user42, 5 hours ago
3. "Bug report: notification emails" — posted by support, 1 day ago
4. "Welcome new members!" — posted by admin, 2 days ago
5. "Monthly update - May 2026" — posted by admin, 3 days ago
```

## Step 5: View Artifacts

If the AI generates a file (HTML page, code snippet, CSV, or image), it appears in the **Artifacts** panel on the right side of the chat. You can:

- Preview HTML artifacts in an iframe
- Copy code artifacts to your clipboard
- Download any artifact as a file
- Post artifacts directly to a connected site

## What's Next

- **[Connecting Sites](/getting-started/connecting-sites)** — learn about token types, OAuth, and troubleshooting
- **[Understanding Credits](/getting-started/understanding-credits)** — how credits are consumed and how to manage costs
- **[Chat Interface](/features/chat)** — full guide to sessions, tool permissions, and conversation management
- **[Autonomous Agents](/features/agents)** — automate multi-step workflows on a schedule
