---
title: Site Groups
description: Organize multiple sites into groups for easy selection in chat sessions and agents, with per-group tool deny lists.
---

# Site Groups

Site Groups let you bundle multiple connected sites together. Instead of selecting sites one by one when starting a chat or configuring an agent, you select a group. Groups also support tool deny lists, giving you fine-grained control over which tools are accessible.

## Creating a Group

1. Navigate to **Site Groups** in the sidebar.
2. Click **Create Group**.
3. Enter a **Group Name** (e.g., "Production Forums").
4. **Select sites** from your vault to include in the group.
5. Click **Create**.

::: tip
You can add up to 20 sites per group. If you need more, create multiple groups.
:::

## Managing Groups

### Adding Sites to a Group

After creation, you can add more sites:
1. Open the group.
2. Click **Add Site**.
3. Choose from your vault or search the Directory.

If you add a site from the Directory that is not yet in your vault, you will be prompted to connect it first.

### Removing Sites

Click the remove icon next to a site within the group. This only removes it from the group — the site remains in your vault.

## Tool Deny Lists

Each group can have a **tool deny list** — a set of tool patterns that are blocked when the group is used in a session.

1. Open a group.
2. Click **Edit Tool Rules**.
3. Add patterns to the **Denied Tools** list (e.g., `forum_delete_*`, `store_*_modify`).
4. Save.

When this group is selected in a chat session, the denied tools are automatically excluded. This is a safety mechanism to prevent the AI from calling destructive or unwanted operations.

### Pattern Syntax

Deny list patterns support wildcards:

| Pattern | Blocks |
|---------|--------|
| `forum_delete_*` | All delete tools on the forum site |
| `*_admin_*` | Any tool with "admin" in the name |
| `store_refund_order` | A single specific tool |

## Using Groups in Chat Sessions

When starting a new chat session:
1. Under **Sites**, you will see both individual sites and your groups.
2. Select a group to include all its sites in the session.
3. The group's deny list is automatically applied to the session.

You can select multiple groups or combine groups with individual sites.

## Using Groups in Agents

When configuring an agent, you can assign a group as the agent's site scope. The agent will have access to all sites in the group and respect the group's deny list.

## Limits

| Plan | Max Groups | Max Sites per Group |
|------|-----------|-------------------|
| Free | 2 | 20 |
| Pro | 10 | 20 |
| Harness | 25 | 20 |
| Team | 50 | 20 |
