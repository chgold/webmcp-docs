---
title: Cost Optimization
description: Reduce your Goldnat spending — model selection, BYOK, monitoring, and credit-saving strategies.
---

# Cost Optimization

Goldnat provides several levers to control costs. This guide explains strategies for getting the most value from your credits.

## Choose the Right Model for the Task

Not every task needs the most powerful model. Match model capability to task complexity:

| Task | Recommended Model | Why |
|------|-------------------|-----|
| Simple data retrieval | Claude Haiku / GPT-4o Mini | Low cost, fast, sufficient for reading and formatting data |
| Content summarization | Gemini 2.5 Flash / GPT-4o Mini | Good comprehension at low cost |
| Complex analysis | Claude Sonnet 4 / GPT-4o | Higher reasoning capability needed |
| Code generation | Claude Sonnet 4 | Best code quality |
| Translation | GPT-4o Mini / Gemini 2.5 Flash | Quality is good even with smaller models |

### Credit Cost Comparison

| Model | Input (per 1K tokens) | Output (per 1K tokens) | Relative Cost |
|-------|----------------------|------------------------|---------------|
| Claude Haiku | 0.25 | 1.25 | Very Low |
| GPT-4o Mini | 0.15 | 0.6 | Very Low |
| Gemini 2.5 Flash | 0.15 | 0.6 | Very Low |
| GPT-4o | 2.5 | 10 | Medium |
| Gemini 2.5 Pro | 1.25 | 10 | Medium |
| Claude Sonnet 4 | 3 | 15 | High |

A task that costs 15 credits with Claude Sonnet 4 might cost only 1.25 credits with Claude Haiku — a 12x difference.

## Use BYOK to Avoid Credit Markup

Platform credits include a markup over raw provider costs. With BYOK, you pay the provider directly at their wholesale rates:

- **Without BYOK**: 1,000 output tokens with Claude Sonnet 4 = 15 credits = ~$0.15
- **With BYOK**: 1,000 output tokens with Claude Sonnet 4 = $0.015 (direct Anthropic rate)

If you regularly spend $50+/month in credits, BYOK can save 50-80% depending on the model.

See the [BYOK Guide](/guides/byok) for setup.

## Auto Top-Up vs. Manual Purchase

| Approach | Pros | Cons |
|----------|------|------|
| **Manual purchase** | Full control, buy only when needed | Risk of running out mid-task |
| **Auto top-up** | No interruptions, always have credits | May overspend if not monitored |

### Recommended Auto Top-Up Strategy

Set conservative limits:
- Threshold: 100 credits
- Amount: 500 credits
- Monthly limit: 2,000 credits

This prevents runaway spending while ensuring you never hit zero during a conversation.

## Monitor Usage in Analytics

The [Analytics](/features/analytics) page shows:
- Total credits consumed per day
- Credits broken down by model
- Token usage trends

Review analytics weekly to identify:
- **Unexpected spikes** — a misconfigured agent running too frequently
- **Model waste** — using an expensive model for tasks a cheaper one could handle
- **Credit trends** — whether your usage is growing and you need a plan upgrade

## Set Agent Round Limits

Each agent round costs credits. A runaway agent can consume your entire balance.

**Cost estimation per round** (approximate):

```
Input tokens: ~1,500 (system prompt + context + tool results)
Output tokens: ~500 (AI response + tool calls)

Claude Haiku: (1.5 * 0.25) + (0.5 * 1.25) = 1 credit/round
Claude Sonnet: (1.5 * 3) + (0.5 * 15) = 12 credits/round
```

An agent with `maxRounds: 10` using Claude Sonnet 4 running hourly:
- Per run: up to 120 credits
- Per day: up to 2,880 credits
- Per month: up to 86,400 credits

The same agent with Claude Haiku:
- Per run: up to 10 credits
- Per day: up to 240 credits
- Per month: up to 7,200 credits

Always start with low `maxRounds` and increase only if needed.

## Keep Conversations Focused

Credit costs scale with conversation length because the entire history is sent as input tokens on each message. Strategies:

1. **Start new conversations** for new topics instead of continuing old ones
2. **Be concise** in your messages
3. **Clear history** periodically if you do not need old conversations

The platform loads the last 20 messages as context. Longer conversations still cost more per message because each message includes the prior 20 messages as input.

## Optimize Agent Prompts

A shorter, focused system prompt reduces input tokens per round:

**Before (230 tokens):**
```
You are a highly intelligent and capable AI assistant that has 
been designed to help users manage their online forums. You 
should always be polite, thorough, and comprehensive in your 
responses. Please search for new posts and provide a summary.
```

**After (45 tokens):**
```
Search for forum posts from the last hour. Summarize: title, 
author, category. Output as a Markdown table.
```

The "after" version costs ~80% less in input tokens every round while being more precise.

## Summary of Strategies

| Strategy | Potential Savings | Effort |
|----------|-------------------|--------|
| Use cheaper models | 10-12x | Low — change model selection |
| BYOK | 50-80% | Low — one-time setup |
| Lower agent rounds | 50-90% | Low — adjust one setting |
| Focused conversations | 20-40% | Medium — change workflow habits |
| Optimized prompts | 10-30% | Medium — rewrite prompts |
| Monitor analytics | Prevents waste | Low — weekly check |
