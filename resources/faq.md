---
title: FAQ
description: Frequently asked questions about Goldnat — accounts, billing, AI provider keys, chat, agents, security, and integrations.
---

# Frequently Asked Questions

## Account

### How do I create an account?

Click **Sign in with Google** on [goldnat.ai](https://goldnat.ai). A new account is created automatically on your first sign-in. No separate registration form is needed.

### Can I sign in without a Google account?

Currently, Google OAuth is the only sign-in method. Support for additional providers (email/password, GitHub) is planned.

### How do I change my email address?

Your email is tied to your Google account. To use a different email, sign in with a different Google account. Contact support if you need to transfer data between accounts.

### How do I delete my account?

Contact **support@goldnat.ai** with your account email. Your account enters a 30-day grace period before permanent deletion. You can reactivate during this period.

## Billing

### What payment methods are accepted?

Credit and debit cards and other methods offered at checkout, processed by Paddle.

### Is there a free trial?

The Free tier is always available with no time limit, so you can explore the platform before subscribing. New accounts receive a sign-up gift of goldnat credits to try the chat; for regular use, connect your own AI provider key — see [How AI Usage Is Paid](/getting-started/understanding-credits).

### Can I get a refund?

For subscription refunds, contact **support@goldnat.ai** within 7 days of the charge. AI usage is billed by your own provider, so refunds for that are handled by the provider.

### What happens if my payment fails?

Your subscription enters a past-due state. You have 7 days to update your payment method before being downgraded to Free.

### Does a subscription include AI usage?

No. A plan unlocks platform features such as agents, scheduling, webhooks, and workspaces. AI usage is billed by your AI provider against the key you connect in **Settings**, or paid with goldnat credits where they apply. Some plans include monthly credits.

## Paying for AI Usage

### How do I pay for AI usage?

You connect your own AI provider API key in **Settings**, and every AI call runs against your provider account at that provider's published rates. Without a key, goldnat credits from your sign-up gift or plan can pay for the models they cover. See the [BYOK Guide](/guides/byok).

### Why did a message cost more than expected?

Cost scales with conversation length because previous messages are sent along as context (input tokens). Longer conversations cost more per message, and tool results add to the token count too.

### What happens if I haven't connected an API key?

You can use goldnat credits for the models they cover, while you have a balance. Other models, and everything once credits run out, need a key — the chat tells you what to connect. Everything else still works: you can browse the UI, manage settings, connect sites, and review history.

### Do tool calls cost extra?

Goldnat doesn't charge for tool calls. Tool results are fed back to the model as input tokens, though, so they do raise the token count your provider bills you for.

## Chat

### Can I use the chat without connecting a site?

Yes. Start a session without selecting any sites for a standard AI conversation. The AI will not have access to any tools, but you can still ask questions, brainstorm, write content, etc.

### Why is the AI not calling tools?

Check that: (1) at least one site is selected in the session, (2) the site's token is active (not expired), (3) the tools are not on the deny list, and (4) your prompt clearly implies a tool-based action.

### Can I switch models mid-conversation?

Yes. Click **Change** in the session header and select a different model. Future messages will use the new model. Previous messages in the conversation are preserved.

### How many messages can a conversation have?

There is no hard limit on conversation length. However, the AI context window includes only the last 20 messages. Older messages are excluded from context to manage token costs.

### Why does the AI sometimes give wrong information?

AI models can produce inaccurate responses (known as "hallucinations"). Always verify critical information, especially numbers, dates, and factual claims. When tools return data from your site, that data is accurate — the AI's interpretation of it may vary.

## Agents

### What is the difference between chat and agents?

Chat is interactive — you send a message, get a response. Agents are autonomous — they run a multi-round loop without your involvement, executing a predefined task.

### Can agents post content to my site?

Yes, but only after you grant it. Agents are read-only by default; write tools (posting, editing, deleting) are blocked until you select them in the agent's **Write permissions**. Grant only the specific write tools the task needs. See [Autonomous Agents](/features/agents#write-permissions).

### Why isn't my agent writing to my site?

The most common reason is that no write tools are granted. Open the agent, expand **Write permissions**, load the tools, select the ones it needs, and save. An agent with no granted write tools will read and plan but never write.

### What does the "New write capability on a connected site" alert mean?

It means an agent encountered a write tool on one of your sites that no agent has been granted permission to use. Nothing was changed — the tool was blocked. The alert simply lets an admin decide whether that capability should ever be granted. It's a normal part of the default-deny safety model.

### What are goals, and how do agents use them?

Goals are reusable objectives (like "reply to unanswered threads") that you attach to an agent. Each goal is tied to a specific site, and an agent only uses a goal on the site it belongs to. See [Goals & Capabilities](/features/capabilities).

### How do I edit or delete a goal I created?

In the goal picker, use the edit or delete action on a goal marked **Yours**. You can rename it, rebuild its steps, or remove it. Shared goals provided by the platform can't be edited or deleted.

### How do I stop a running agent?

Go to the run detail page and click **Cancel Run**. The agent finishes the current step and stops. Tokens already sent to your AI provider before the stop are still billed by that provider.

### Why did my agent fail?

Check the run timeline for the error step. Common causes: expired token, site unreachable, max rounds hit, or a missing or rejected AI provider key. See [Troubleshooting](/resources/troubleshooting).

### Can I run multiple agents at the same time?

Yes, different agents can run simultaneously. However, a single agent can only have one active run at a time.

## Security

### How are my tokens stored?

All tokens (vault credentials, BYOK keys) are encrypted with AES-256-GCM before being stored in the database. The encryption key is stored in the server environment, not in the database.

### Can Goldnat staff see my tokens?

No. Tokens are encrypted at rest. Decryption happens only at the moment of a tool call and the decrypted value is never cached or logged.

### Is my conversation data private?

Conversations are stored in the database and associated with your account. They are not shared with other users. The platform does not use your conversations to train AI models.

### Does the platform scan for prompt injection?

Yes. Every tool result returned from a site is scanned for known prompt injection patterns before being sent back to the AI model. This is a security feature to prevent malicious sites from manipulating AI behavior.

## BYOK

### What is BYOK?

Bring Your Own Key — you add your own AI provider API key (Anthropic, OpenAI, Google, OpenRouter) in **Settings**, and Goldnat runs your AI calls against that account. It's the main way AI usage is paid for on the platform.

### Which providers support BYOK?

Anthropic, OpenAI, Google (Gemini) and OpenRouter. For Anthropic you can also connect your Claude subscription, and for OpenRouter you can sign in instead of pasting a key.

### What does AI usage cost?

Whatever your provider charges. Rates are published per million tokens and differ by model, so picking a cheaper model for simple work is the single biggest lever you have. See [Cost Optimization](/guides/cost-optimization).

### Can I connect keys for more than one provider?

Your key applies to that provider's models. To use models from another provider, connect a key for that provider as well; otherwise those models aren't available to you.

## Integrations

### What platforms are supported?

WordPress, XenForo, Drupal, Shopify, Discourse, Ghost, Moodle, NodeBB, and PrestaShop have ready-made plugins/addons — browse them all at [plugins.goldnat.ai](https://plugins.goldnat.ai). Any other site can integrate by implementing the Servio manifest and tool endpoints. See [Supported Platforms](/reference/platforms).

### Can I use Goldnat with my custom application?

Yes. Implement the Servio protocol (manifest + tool endpoints + authentication) on your application. See [Adding Servio to Your Site](/site-owners/adding-servio).

### Do I need to modify my site's code?

No — if a plugin exists for your platform, install it and no code changes are needed. For custom sites, you need to add manifest and tool endpoints.

## Privacy

### What data does Goldnat collect?

Account information (email, name from Google), conversation history, agent configurations, usage analytics, and encrypted credentials. We do not sell or share your data.

### Can I export my data?

Contact **support@goldnat.ai** to request a data export. We will provide your conversation history, agent configurations, and account data in a machine-readable format.

### Is Goldnat GDPR compliant?

We process data in accordance with GDPR requirements. You can request data access, correction, or deletion by contacting support.
