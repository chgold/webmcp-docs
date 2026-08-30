---
title: Goals & Capabilities
description: Give an agent reusable goals — ready-made playbooks that map a plain-language objective to the right tools on a specific site.
---

# Goals & Capabilities

A **goal** is a reusable objective you can attach to an agent, such as "reply to unanswered threads" or "review new posts for tone." Each goal is a small playbook: it maps your plain-language objective to the tools needed to achieve it on a **specific site**.

Goals let you build an agent around what you want done, without spelling out every tool call yourself.

## Where Goals Appear

You choose goals when building an agent, in the **goal picker**. Goals are also used to focus the [Morning Brief](/features/dashboard) on what matters to you.

Open the goal picker from the agent builder. It has two tabs:

- **Choose existing** — pick from goals you (or the platform) have already prepared, grouped by site.
- **Create new** — describe a new goal and have it built for a site you select.

## Goals Are Tied to a Site

Every goal belongs to the site it was built for. A goal created for your forum uses that forum's tools; a goal created for your store uses the store's tools.

This matters when an agent works across several sites: **the agent only uses a goal on the site it belongs to.** A goal built for site A is never applied while the agent is working on site B. You don't configure this — it follows automatically from the site you chose when creating the goal.

## Choosing Existing Goals

1. In the agent builder, open the goal picker.
2. On the **Choose existing** tab, browse goals grouped by each connected site.
3. Check the goals you want the agent to pursue. You can select several.
4. Click **Use goals**.

Each goal shows a badge — **Yours** (a goal you created) or **Shared** (a ready-made goal provided by the platform) — and how many steps it uses.

::: tip
Only goals whose tools match a connected site appear for that site. If a goal you expect is missing, the site may not expose the tools it needs — try the **Create new** tab instead.
:::

## Creating a New Goal

1. Open the goal picker and switch to the **Create new** tab.
2. Choose the **site** the goal is for. The goal will be built from that site's tools.
3. Describe what the goal should achieve, in your own words (e.g., "flag posts that are provocative or divisive and reply asking the author to revise").
4. Click **Build**.

The goal is created for that site and added to your selection right away. If it needs tools the site doesn't offer, you'll be told so you can adjust.

## Editing a Goal

You can edit goals you created (marked **Yours**). Open the edit action on the goal and you can:

- **Rename the goal** — update its wording or add clarifications. Save to apply.
- **Rebuild the steps** — if the goal's steps fall short (for example, it only reads content but never acts on it), describe what to change and rebuild it. The goal is regenerated from the site's current tools.

### Rebuilding with Notes

When you rebuild, you can add a note describing what to change — for example, *"don't just detect problems, also flag them and message the author."* The goal is rebuilt for the same site using those instructions.

If the rebuilt goal still can't act the way you asked, it usually means the site doesn't expose the tools required (for example, a site that offers only read tools can't be given a "correct the content" step). In that case you'll see a note explaining that the site exposes no matching tools.

## Deleting a Goal

You can delete goals you created. Use the delete action on a **Yours** goal and confirm. Shared goals provided by the platform can't be deleted.

Deleting a goal removes it from your list and from any selection you're currently editing.

## Private vs. Shared Goals

- **Yours (private)** — goals you created. Only you see and use them, and only you can edit or delete them.
- **Shared** — ready-made goals provided by the platform. You can use them in your agents, but you can't edit or delete them.

## Tips

- Describe goals by **outcome**, not by tool. "Reply to unanswered questions" is better than naming a specific reply tool — the goal builder picks the tools for you.
- Build a separate goal per site, even for similar objectives, so each one uses the right site's tools.
- If an agent isn't doing part of what you intended, rebuild the goal with a note describing the missing action.
