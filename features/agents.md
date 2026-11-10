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
- **Goals** — reusable objectives the agent pursues, each tied to a specific site (see [Goals & Capabilities](/features/capabilities))
- **Model** — the AI model to use
- **Sites** — which connected sites the agent can interact with
- **Max rounds** — the maximum number of AI-tool interaction loops (default: 5)
- **Write permissions** — which write tools the agent is allowed to run (none by default)
- **Trigger type** — how the agent is started (manual, scheduled, or webhook)
- **Who pays for the AI** — your own key or connection, goldnat credits, or (in a workspace) a workspace AI key
- **Show in dashboard** — whether the agent's findings appear in your morning brief

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

## Goals

Instead of describing every step in the system prompt, you can attach **goals** — reusable objectives such as "reply to unanswered threads" or "review new posts for tone." Open the goal picker in the agent builder to choose ready-made goals or create your own.

Each goal is tied to the site it was built for, and the agent only uses a goal on that site. This keeps a goal meant for your forum from being applied to your store. See [Goals & Capabilities](/features/capabilities) for the full guide.

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
2. Save the agent.
3. Click the webhook icon that appears on the agent row in the table to view the Webhook URL and Secret — without opening the edit dialog.
4. Configure your external system to POST to the webhook URL.

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
| **Tool Call** | A tool invocation — shows the exact parameters sent to the site |
| **Tool Result** | The response from the site |
| **Output** | The AI's final text output |
| **Error** | An error that occurred during the step, with the error message displayed |

Navigate to **Agents > [Agent] > Runs** to see all runs. Click a run to see the full timeline.

### Live Monitoring

Active runs show a real-time view. Steps appear as they execute, and you can watch the agent work through its task.

### Cancelling a Run

Click **Cancel Run** on an active run to stop it. The agent finishes the current step and halts. Tokens already used before the stop are still billed.

### Paused and Resumed Runs

A run pauses when its AI cannot be paid for — for example when credits run out mid-run. It keeps everything done so far and **resumes from where it stopped** once credits are added or the key is fixed. A paused run that is not resumed within 72 hours is cancelled.

Runs are also crash-safe: if a worker stops in the middle of a run, the run continues from its last saved step instead of starting over.

### Limits That Keep Runs Healthy

- **One run at a time per agent.** A trigger that arrives while the agent is already running waits its turn instead of failing; queued duplicates of a scheduled run are not created.
- **Webhook rate limit.** A webhook that fires too often, or builds up a backlog, gets `429` until the queue drains.
- **Time limits.** Each model call and each run as a whole have a maximum duration. A run that hits it fails with a clear reason; runs stuck for 45 minutes or more are stopped.
- **A reply cut off mid-tool-call** is retried; if it keeps being cut off, the run fails with `output_limit` rather than reporting success.

## Agent Run Statuses

| Status | Meaning |
|--------|---------|
| **Pending** | Queued, waiting for a worker |
| **Running** | Actively executing |
| **Done** | Completed successfully |
| **Failed** | Encountered an error |
| **Cancelled** | Stopped by the user |
| **Billing Failed** | The run could not be paid for — check that your AI provider key is connected and valid in **Settings** |

## Token Usage

Each round of an agent run is an AI call billed to your own provider account, just like a chat message. The run detail page shows the tokens the run consumed.

To control costs:
- Set a conservative `maxRounds` value
- Use cheaper models for simple monitoring tasks
- Use BYOK keys for high-frequency agents

## Write Permissions

By default, an agent is **read-only**: it can look things up but cannot create, edit, or delete anything on your sites. Write tools (like posting a reply, editing a page, or deleting an item) are blocked until you explicitly grant them.

To let an agent make changes:

1. In the agent builder, open the **Write permissions** section.
2. The agent's write tools are listed **by site**, each with its own switch.
3. Either switch on the specific tools the agent may run, or choose **All write tools** to let it run every write tool on its sites.
4. Save the agent.

**Recommend tools** analyses the agent's prompt and goals and ticks the write tools the task needs. Review the choice before saving.

With specific tools selected, only those are permitted; every other write tool stays blocked. Leaving the list empty keeps the agent read-only. **All write tools** is convenient but broad — in a workspace, the Security page lists such agents as a high finding.

Tools a higher layer blocks — a workspace [tool policy](/organizations/tool-policies), or a rule in the creator's site group — are shown as blocked and cannot be switched on here.

::: warning
Write tools change content on your sites. Grant only the tools the agent's task actually needs — for example, allow "reply to thread" without allowing "delete thread."
:::

### Why an Agent Might Not Be Writing

If an agent that should be posting or editing isn't making changes, check its **Write permissions**. An agent with no granted write tools will read and plan but never write. Grant the specific tools it needs and run it again.

## Safety

### Principle of Least Privilege

Give agents access only to the sites, goals, and write tools they need. Combine site groups, goals, and write permissions to keep each agent scoped to its task.

### Max Rounds as a Safety Net

Set `maxRounds` to the minimum needed for the task. A content monitoring agent might need only 2-3 rounds, while a complex multi-site workflow might need 10+.

## Showing Findings in the Dashboard

With **Show in dashboard** on, the agent's findings — items to handle and drafts to approve — appear in your [morning brief](/features/dashboard). The agent can also **propose actions** there, with the write tools you exposed to it: they appear as buttons on the brief item, and nothing is ever performed automatically — every action stays a draft until you click and approve it. With it off, the agent cannot write to the dashboard.

The more write tools you expose (for example lock, move or tag a thread), the more one-click actions the agent can offer.

## Writing on Your Sites

When an agent writes content — a reply, a post, a page — it writes in the site's own markup (BBCode on a forum that uses it, HTML or blocks on a CMS), so posts look right on the site.

## Deleting an Agent

Deleting an agent stops it for good: it never runs again and its queued runs are cancelled. Its **run history is kept**. Tick **Also delete all of its runs** to remove the history too — this cannot be undone.

## Workspace Agents

In a Team workspace, agents can be shared among workspace members. Workspace agents use the workspace's shared vault tokens and can be triggered by any member with the appropriate permissions. Admins can edit and transfer them, and each agent states who pays for its AI. See [Team Workspaces](/features/workspaces#workspace-agents).
