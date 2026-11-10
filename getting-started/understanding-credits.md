---
title: How AI Usage Is Paid
description: Your own provider key or subscription, goldnat credits, and which one a chat or agent run uses.
---

# How AI Usage Is Paid

Every AI response — in chat or in an agent run — is paid one of two ways:

| | Your own credential | goldnat credits |
|--|--|--|
| **What it is** | An API key from Anthropic, OpenAI, Google or OpenRouter, or a connected Claude or OpenRouter account | A balance in your goldnat account |
| **Who bills you** | The provider, at its own rates | Nothing further — credits are already in your balance |
| **Which models** | Every model of that provider that goldnat offers | Only models on providers goldnat credits cover |
| **Where to set up** | **Settings → AI provider keys** | — |

A subscription plan is separate: it unlocks platform **features** (agents, scheduling, webhooks, workspaces), not AI usage. See the [Tier Feature Matrix](/reference/tier-features).

## Where credits come from

- **Sign-up gift** — new accounts receive credits once, so you can try Goldnat before connecting a key.
- **Monthly credits** — some plans include a monthly credit allowance, shown on the plan.
- **Granted credits** — the goldnat team may add credits to your account, sometimes with an expiry date.

Your balance is shown in the app. Buying credits is currently not offered; for regular use, connect your own key.

## Which one is used

For each model, Goldnat checks in this order:

1. **Your connected subscription** (Claude account), if connected.
2. **Your own API key** for that provider.
3. **goldnat credits** — only if goldnat credits cover that provider, and your balance is above zero.

If none applies, the model cannot be used: the model list marks it, and sending a message explains what to connect. **Settings → What each model will use** shows the result per provider, and **Key source** lets you choose credits over your own key.

## When credits run out

- **Chat** pauses before the next round and offers to continue once you add a key or credits. The reply so far is kept.
- **Agent runs** pause where they are. A paused run resumes from where it stopped when credits are added (within 72 hours); after that it is cancelled.

## Workspace agents

Workspace agents state who pays for their AI — the workspace's credits, a workspace AI key, or the member's own key. See [Team Workspaces](/features/workspaces#who-pays-for-the-ai).
