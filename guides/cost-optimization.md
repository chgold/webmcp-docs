---
title: Cost Optimization
description: Reduce your AI provider spend on Goldnat — model selection, BYOK, monitoring, and prompt strategies.
---

# Cost Optimization

Goldnat is bring-your-own-key, so every AI call is billed straight to your own provider account. That means cost control is in your hands, and the levers below are the ones that move the number on your provider invoice.

## Choose the Right Model for the Task

Not every task needs the most powerful model. Match model capability to task complexity:

| Task | Recommended Model | Why |
|------|-------------------|-----|
| Simple data retrieval | Claude Haiku 4.5 | Lowest cost, fast, sufficient for reading and formatting data |
| Content summarization | Claude Haiku 4.5 | Good comprehension at very low cost |
| General analysis | Claude Sonnet 4.6 | Balanced quality and cost |
| Complex reasoning | Claude Opus 5 | Highest reasoning capability, 1M token context |
| Code generation | Claude Sonnet 4.6 / Opus 5 | Strong code quality at different price points |

### Model Cost Comparison

All models on Goldnat are from Anthropic. Rates below are the provider's own list prices in USD per million tokens (MTok), and they're what your provider account is charged.

| Model | Input ($/MTok) | Output ($/MTok) | Context | Relative Cost |
|-------|---------------|-----------------|---------|------|
| Claude Haiku 4.5 | $0.80 | $4 | 200K | Very Low |
| Claude Sonnet 4.6 | $3 | $15 | 200K | Medium |
| Claude Opus 4.7 | $3 | $25 | 200K | High |
| Claude Opus 5 | $3 | $25 | 1M | High |

A task using Claude Opus 5 for output costs over 6x more than Claude Haiku 4.5. Choosing the right model can dramatically reduce spending.

::: tip
The platform may have additional model variants available (e.g., dated snapshots). Check the model selector in Chat for the full list, and your provider's pricing page for current rates.
:::

## Connect Your Own Key (BYOK)

AI usage on Goldnat runs on your own provider key, which you add in **Settings**. Nothing sits between you and the provider's pricing: 1,000 output tokens with Claude Sonnet 4.6 costs $0.015 at Anthropic's list rate, and that's exactly what lands on your Anthropic bill.

Practical upshot: your provider dashboard is the authoritative record of AI spend, and you can set budgets and alerts there.

See the [BYOK Guide](/guides/byok) for setup.

## Monitor Usage in Analytics

The [Analytics](/features/analytics) page shows:
- Total token usage per day
- Token usage and estimated provider cost broken down by model
- Usage trends over time

Review analytics weekly to identify:
- **Unexpected spikes** — a misconfigured agent running too frequently
- **Model waste** — using an expensive model for tasks a cheaper one could handle
- **Growth trends** — whether usage is climbing faster than you expected

For authoritative billing figures, cross-check against your provider's own dashboard.

## Set Agent Round Limits

Every agent round is a fresh AI call billed to your provider account. A runaway agent can run up a real bill.

**Cost estimation per round** (approximate):

```
Input tokens: ~1,500 (system prompt + context + tool results)
Output tokens: ~500 (AI response + tool calls)

Claude Haiku 4.5:  ~$0.003 per round (very low)
Claude Sonnet 4.6: ~$0.012 per round (moderate)
Claude Opus 5:     ~$0.017 per round (higher)
```

An agent with `maxRounds: 10` using Claude Opus 5 running hourly can cost over 5x more than the same agent using Claude Haiku 4.5. Multiply by 24 hours and 30 days — the difference adds up fast.

Always start with low `maxRounds` and increase only if needed.

## Keep Conversations Focused

Cost scales with conversation length because the entire history is sent as input tokens on each message. Strategies:

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
| Provider budget alerts (BYOK) | Caps surprises | Low — one-time setup |
| Lower agent rounds | 50-90% | Low — adjust one setting |
| Focused conversations | 20-40% | Medium — change workflow habits |
| Optimized prompts | 10-30% | Medium — rewrite prompts |
| Monitor analytics | Prevents waste | Low — weekly check |
