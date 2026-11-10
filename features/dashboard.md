---
title: Dashboard & Morning Brief
description: Your daily briefing — a summary of what happened across your connected sites while you were away, in sections you can customize.
---

# Dashboard & Morning Brief

The dashboard opens with your **Morning Brief**: a summary of what happened across your connected sites and agent runs while you were away. Instead of checking each site yourself, you see one consolidated view of what needs your attention.

## What the Brief Shows

The brief is built from **sections**. Each section shows a number or a list gathered from your connected sites and your agents' activity — for example:

- **Needs a decision** — items waiting on your input
- **Waiting** — things in progress or awaiting a reply
- **Drafts** — replies or content prepared for you to review
- **Metrics** — daily numbers from your sites, with a comparison to the previous period

If nothing needs your attention, the brief simply tells you all is quiet.

The brief is written in the language you use Goldnat in, and every number in it is taken from a real listing on your site rather than from a summary statistic, so counts are not stale.

## How the Dashboard Looks

- **Cubes** across the top show each section's count and its most urgent item: **Needs you**, **In queue** or **All clear**.
- **Panels** below show the first three items of each section, one line per item. Click an item for its details.
- **Show all** opens the section's own page with every item.

For each section you choose **Where to show**: **Top only** (a cube), **List only** (a panel), or **Both**.

## Drafts and Actions

Agents with **Show in dashboard** on add their findings here. Drafts are written overnight, and **nothing is sent until you approve it**:

- **Approve** publishes one draft; **Approve all & publish** publishes them all. You can edit a draft's text before approving.
- Items can carry **action buttons** the agent proposed — for example lock, move or tag a thread. Click one to run it; actions that cannot be undone ask for confirmation first. If an action needs you to sign in to the site again, you are asked to.
- Settings → **Brief actions** decides whether proposed actions are created when you click them, or upfront during the morning sweep.

## Action Log

The **Action log** lists every action you approved — who approved it, when it ran, what was actually sent, and what the site returned. If you edited a draft before approving, the agent's original draft is shown too. Filter by status (**Succeeded**, **Failed**), site, title and date.

## Customizing the Brief

Click **Customize** on the dashboard to choose which sections appear, in what order, and when. Each section has three controls:

### Order

Use the up/down arrows to arrange sections. The **top section shows first** in your brief. Put what matters most to you at the top.

### Threshold

The threshold is the **minimum count for a section to appear**. For example, a threshold of `3` shows the section only when it has 3 or more items — useful for hiding low-signal sections until they're worth looking at. Set it to `0` to always show the section.

### Show / hide

The toggle turns a section on or off. Turning a section **off hides it from the brief entirely**, without losing its settings — turn it back on anytime and your order and threshold are preserved.

Click **Save** to apply your changes.

## Metrics and Comparisons

Metric sections show a current value alongside a comparison — whether it went up, down, or stayed the same versus the previous period. Comparisons use the same weekday where relevant, so a Monday is compared to the previous Monday rather than to Sunday.

Times and daily boundaries follow **your timezone**, so "morning" means your morning. Set your timezone in [Settings](/features/settings) if your brief times look off.

## Focusing the Brief with Goals

You can point the brief at specific objectives using [goals](/features/capabilities) — for example, "surface unanswered questions" or "flag posts that need moderation." Goals let the brief highlight what you care about rather than everything at once.

## Related

- [Goals & Capabilities](/features/capabilities) — reusable objectives that focus your brief and agents
- [Autonomous Agents](/features/agents) — the agents whose activity appears in your brief
- [Settings](/features/settings) — set your timezone for accurate brief timing
