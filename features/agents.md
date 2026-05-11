---
title: Autonomous Agents
description: Create, configure, and run autonomous AI agents that perform multi-step tasks on your connected sites.
---

# Autonomous Agents

Agents are automated AI loops that perform tasks on your connected sites without manual intervention. Unlike chat (where you send one message at a time), an agent runs a multi-round loop: it sends a prompt to the AI, executes tool calls, feeds results back, and repeats until the task is complete or the round limit is reached.

## What is an Agent

An agent consists of:

- **Name** — a descriptive identifier
- **System prompt** — instructions that define what the agent should do
- **Model** — the AI model to use (e.g., Claude Sonnet 4)
- **Sites** — which connected sites the agent can interact with
- **Max rounds** — the maximum number of AI-tool interaction loops (default: 5)
- **Trigger type** — how the agent is started (manual, scheduled, or webhook)
- **API key** — which AI key to use (platform credits or a specific BYOK key)

## Creating an Agent

1. Navigate to **Agents** in the sidebar.
2. Click **New Agent** or **Start from Template**.
3. Fill in the configuration:
   - Enter a name and optional description
   - Write the system prompt (the core instructions for the AI)
   - Select the model and sites
   - Set the max rounds slider (1-20)
   - Choose the trigger type
4. Click **Create**.

### Agent Templates

The template gallery offers pre-built agents for common scenarios:

- **Content Monitor** — watches a site for new content
- **Forum Moderator** — reviews new posts against community guidelines
- **Data Summarizer** — aggregates data from a site into a digest
- **Support Responder** — drafts replies to support threads

Select a template, customize the prompt and sites, and save.

## Trigger Types

### Manual

Run the agent on demand by clicking **Run Now** on the Agents page. Suitable for one-off tasks or testing.

### Scheduled (Cron)

Set a schedule using cron expressions or presets:

| Preset | Cron Expression | Runs |
|--------|----------------|------|
| Every hour | `0 * * * *` | Top of every hour |
| Daily at 09:00 | `0 9 * * *` | Once per day |
| Every Sunday at 09:00 | `0 9 * * 0` | Once per week |
| First of month at 09:00 | `0 9 1 * *` | Once per month |
| Every 15 minutes | `*/15 * * * *` | 4 times per hour |

For custom schedules, enter a cron expression directly. The next run time is displayed for confirmation.

::: info
Scheduled agents require the **Harness** plan or higher.
:::

### Webhook

Trigger the agent via an HTTP POST request from an external system:

1. Select **Webhook** as the trigger type.
2. Save the agent to receive the webhook URL and secret.
3. Configure your external system to POST to the webhook URL.

The webhook payload can include dynamic data that gets injected into the agent's context. See the [Webhook Triggers guide](/guides/webhooks) for payload format and authentication.

::: info
Webhook-triggered agents require the **Harness** plan or higher.
:::

## Running and Monitoring

### Starting a Run

- **Manual**: Click **Run Now** on the agent card
- **Scheduled**: Runs automatically at the scheduled time
- **Webhook**: Runs when the webhook URL receives a POST request

### Run Timeline

Each run produces a timeline of steps:

| Step Type | Description |
|-----------|-------------|
| **Thinking** | The AI's reasoning before a tool call |
| **Tool Call** | A tool invocation with parameters |
| **Tool Result** | The response from the site |
| **Output** | The AI's final text output |
| **Error** | An error that occurred during the step |

Navigate to **Agents > [Agent] > Runs** to see all runs. Click a run to see the full timeline.

### Live Monitoring

Active runs show a real-time view. Steps appear as they execute, and you can watch the agent work through its task.

### Cancelling a Run

Click **Cancel Run** on an active run to stop it. The agent finishes the current step and halts. Credits consumed up to that point are still deducted.

## Agent Run Statuses

| Status | Meaning |
|--------|---------|
| **Pending** | Queued, waiting for a worker |
| **Running** | Actively executing |
| **Done** | Completed successfully |
| **Failed** | Encountered an error |
| **Cancelled** | Stopped by the user |

## Credit Usage

Each round of an agent run consumes credits based on the model and token count, just like chat messages. The total credit cost is shown on the run detail page.

To control costs:
- Set a conservative `maxRounds` value
- Use cheaper models for simple monitoring tasks
- Use BYOK keys for high-frequency agents

## Safety

### Principle of Least Privilege

Give agents access only to the sites and tools they need. Use site groups with deny lists to block destructive operations.

### Human-in-the-Loop

For critical actions, design your agent prompt to output a plan rather than execute directly. Review the plan in the run timeline before creating a follow-up agent that executes.

### Max Rounds as a Safety Net

Set `maxRounds` to the minimum needed for the task. A content monitoring agent might need only 2-3 rounds, while a complex multi-site workflow might need 10+.

## Workspace Agents

In a Team workspace, agents can be shared among workspace members. Workspace agents use the workspace's shared vault tokens and can be triggered by any member with the appropriate permissions. See [Team Workspaces](/features/workspaces) for details.
