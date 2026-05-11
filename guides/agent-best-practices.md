---
title: Agent Best Practices
description: Design safe, efficient, and reliable autonomous agents — permissions, testing, monitoring, and failure handling.
---

# Agent Best Practices

Autonomous agents run without human oversight. A well-designed agent is safe, efficient, and predictable. A poorly designed one can waste credits, make unwanted changes, or fail silently. This guide covers best practices for building reliable agents.

## Principle of Least Privilege

Give your agent access only to what it needs:

- **Select specific sites** — do not add every site in your vault
- **Use site groups with deny lists** — block tools the agent should never call (e.g., `*_delete_*`, `*_admin_*`)
- **Limit rounds** — set `maxRounds` to the minimum needed for the task

Example: A monitoring agent that only reads data needs no write or delete tools. Create a site group with deny patterns for all write operations.

## Testing in Non-Production First

Before deploying a scheduled agent:

1. **Run manually first** — click "Run Now" and review the full timeline
2. **Check tool calls** — verify the agent is calling the right tools with correct parameters
3. **Review output** — ensure the agent produces the expected result
4. **Check credit usage** — confirm the cost matches expectations
5. **Test edge cases** — what happens when there is no data? When the site is slow?

Only enable scheduling or webhooks after manual runs succeed consistently.

## Human-in-the-Loop for Critical Actions

For agents that make changes (posting, editing, deleting), build in a review step:

### Strategy 1: Output-Only Agent

Design the agent to produce a report rather than take action:

```
Review new support tickets. For each one, draft a response. 
Output all drafts as a Markdown artifact. Do NOT post any 
replies.
```

A human reviews the artifact and posts the approved responses manually.

### Strategy 2: Two-Stage Agent

1. **Stage 1 Agent** — analyzes and produces a plan (e.g., "these 5 posts should be archived")
2. **Human review** — a person reviews the plan
3. **Stage 2 Agent** — executes the approved actions

### Strategy 3: Awaiting Input

Configure the agent to pause and request human input when it encounters a critical decision. Workspace notifications alert the appropriate team member.

## Setting Appropriate Max Rounds

The `maxRounds` setting controls how many AI-tool interaction loops the agent can perform. Choosing the right value:

| Task Type | Recommended Rounds |
|-----------|--------------------|
| Simple query (read data, summarize) | 2-3 |
| Moderate task (search + process + output) | 3-5 |
| Complex multi-step workflow | 5-10 |
| Large data processing | 10-15 |

Start conservative and increase if the agent runs out of rounds. You can see in the run timeline whether the agent finished naturally or was cut off by the round limit.

::: warning
Every round costs credits. An agent with `maxRounds: 20` using a premium model on a frequent schedule can consume credits rapidly. Always monitor costs during the first few runs.
:::

## Monitoring Agent Credit Consumption

1. **Check the run detail** — each run shows total credits consumed
2. **Use Analytics** — filter by date to see agent-driven costs
3. **Set monthly limits** — use auto top-up monthly limits to cap spending
4. **Compare model costs** — a monitoring agent rarely needs the most expensive model

### Cost Estimation

Before deploying, estimate costs:

```
Per run: ~2K input tokens + ~1K output tokens = ~3K tokens
Model: Claude Haiku (0.25 credits/1K input, 1.25 credits/1K output)
Cost per run: (2 * 0.25) + (1 * 1.25) = 1.75 credits
Schedule: hourly = 24 runs/day = 42 credits/day = ~1,260 credits/month
```

## Handling Agent Failures

### Common Failure Modes

| Failure | Cause | Mitigation |
|---------|-------|------------|
| Site unreachable | Network issue or site downtime | Agent retries automatically on next scheduled run |
| Token expired | Vault token needs update | Check vault for expired tokens; set up OAuth auto-refresh |
| Max rounds hit | Task needs more iterations | Increase `maxRounds` or simplify the prompt |
| No credits | Balance depleted | Enable auto top-up or use BYOK |
| Tool error | Site returned an error | Review the tool result in the run timeline; fix prompt or data |

### Reviewing Failed Runs

1. Go to **Agents > [Agent] > Runs**.
2. Filter by **Failed** status.
3. Click the failed run.
4. Examine the timeline — the error step shows what went wrong.

## Webhook Security

For webhook-triggered agents:

- **Use the webhook secret** — include it in the `X-Webhook-Secret` header from your external system
- **Validate payloads** — do not trust incoming data blindly; use the schema builder to define expected fields
- **Rate limit** — be aware that rapid webhook triggers queue runs in sequence
- **Log webhook sources** — monitor which systems are triggering your agents

See the [Webhook Triggers guide](/guides/webhooks) for detailed configuration.

## Checklist

Before deploying an agent to production:

- [ ] Tested with manual runs (at least 3 successful runs)
- [ ] Tool deny list configured to block unwanted operations
- [ ] Max rounds set to a reasonable value
- [ ] Credit cost estimated and within budget
- [ ] Error handling tested (what happens if no data? if site is down?)
- [ ] Webhook secret configured (if applicable)
- [ ] Notifications set up for failures (workspace agents)
