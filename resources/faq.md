---
title: FAQ
description: Frequently asked questions about Goldnat — accounts, billing, credits, chat, agents, security, and integrations.
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

Credit and debit cards via Stripe. We support Visa, Mastercard, American Express, and other major card networks.

### Is there a free trial?

New accounts receive 50 welcome credits at no cost. This lets you try the platform before purchasing a plan. The free tier is always available with no time limit.

### Can I get a refund?

Individual credit purchases can be refunded from the Billing page (the credits are deducted from your balance). For subscription refunds, contact **support@goldnat.ai** within 7 days of the charge.

### What happens if my payment fails?

Your subscription enters a past-due state. You have 7 days to update your payment method before being downgraded to Free.

### Do unused monthly credits roll over?

No. Monthly allocation credits expire at the end of each billing cycle. Purchased credits (bought as packages) never expire.

## Credits

### How are credits calculated?

Credits are based on token usage: `credits = (input_tokens * input_rate + output_tokens * output_rate) / 1000`. Rates vary by model — see [Understanding Credits](/getting-started/understanding-credits).

### Why did a message cost more credits than expected?

Credit cost scales with conversation length because previous messages are included as context (input tokens). Longer conversations cost more per message. Tool call results also add to the token count.

### What happens when I run out of credits?

AI interactions are blocked. You can still browse the UI, manage settings, and view history. Purchase credits or enable auto top-up to resume.

### Do tool calls cost extra credits?

Tool calls themselves are free. However, tool results are fed back to the AI as input tokens, which increases the token count and therefore the credit cost of the response.

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

Yes, if the agent has access to write tools (e.g., `create_post`, `update_post`) and those tools are not on the deny list. We recommend testing with read-only access first.

### How do I stop a running agent?

Go to the run detail page and click **Cancel Run**. The agent finishes the current step and stops. Credits consumed up to that point are still deducted.

### Why did my agent fail?

Check the run timeline for the error step. Common causes: expired token, site unreachable, max rounds hit, insufficient credits. See [Troubleshooting](/resources/troubleshooting).

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

Bring Your Own Key — you can add your own AI provider API key (Anthropic, OpenAI, Google, etc.) to use instead of platform credits. You pay the provider directly.

### Which providers support BYOK?

Anthropic, OpenAI, Google (Gemini), OpenRouter, and Ollama (self-hosted).

### Is BYOK cheaper?

Usually, yes. Platform credits include a markup over raw provider costs. With BYOK, you pay the provider's wholesale rates directly.

### Can I use BYOK and credits simultaneously?

Your BYOK key applies to the matching provider's models. If you use a model from a different provider, platform credits are consumed.

## Integrations

### What platforms are supported?

WordPress, XenForo, Drupal, and Shopify have ready-made plugins/addons. Any site can integrate by implementing the WebMCP manifest and tool endpoints. See [Supported Platforms](/reference/platforms).

### Can I use Goldnat with my custom application?

Yes. Implement the WebMCP protocol (manifest + tool endpoints + authentication) on your application. See [Adding WebMCP to Your Site](/site-owners/adding-webmcp).

### Do I need to modify my site's code?

For supported platforms (WordPress, XenForo), install the plugin/addon — no code changes needed. For custom sites, you need to add manifest and tool endpoints.

## Privacy

### What data does Goldnat collect?

Account information (email, name from Google), conversation history, agent configurations, usage analytics, and encrypted credentials. We do not sell or share your data.

### Can I export my data?

Contact **support@goldnat.ai** to request a data export. We will provide your conversation history, agent configurations, and account data in a machine-readable format.

### Is Goldnat GDPR compliant?

We process data in accordance with GDPR requirements. You can request data access, correction, or deletion by contacting support.
