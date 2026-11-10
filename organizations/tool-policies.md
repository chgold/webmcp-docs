---
title: Tool Policies
description: Block a tool for every agent in a workspace, and see exactly which layer allows or blocks each tool.
---

# Tool Policies

A tool policy blocks a tool for **every agent in the workspace**, whatever the agent's own settings say. Use it for actions your organization never wants an agent to take — deleting threads, issuing refunds, changing user roles.

## Blocking with switches

The **Tool policy** tab lists every tool the workspace's agents can reach, per site. Turn a tool's switch off to block it for every agent in the workspace, or turn off the site's switch to block the whole site. Tools appear here once a workspace agent uses the site.

A tool that a pattern rule blocks shows which rule blocks it; to release it, delete that rule in the list of rules.

## Adding a rule

For patterns, or tools no agent uses yet:

1. Open the workspace's **Security** page and go to **Tool policy**.
2. Click **Block a tool**.
3. Choose the **site**, or **All sites**.
4. Enter the **tool**:
   - an exact name as the site calls it — `deleteThread`
   - a prefix ending in `*` — `delete*` blocks every tool whose name starts with `delete`
   - `*` — every tool on the chosen site
5. Optionally add a **reason**. Agent editors see it next to the blocked tool.
6. Click **Save**.

Matching ignores letter case. The policy applies at once — to agents, to chat in the workspace, and to MCP clients acting for the workspace.

## How access is decided

A tool goes through five layers, top down. Each layer can only narrow what the one above allowed; a lower layer can never re-open a tool a higher one blocked.

| # | Layer | Who sets it |
|---|-------|-------------|
| 1 | **Site** | The site's plugin decides which tools the connection offers. |
| 2 | **Workspace policy** | Workspace security admins, on this page. |
| 3 | **Owner's site groups** | The agent creator's site groups. |
| 4 | **Agent rules** | The agent's own allow and deny lists. |
| 5 | **Write approval** | Whether the agent may run write tools, and which. |

In the agent editor, tools blocked by a higher layer are shown as blocked, with the rule or group that blocks them, so nobody wonders why a switch has no effect.

## Seeing one agent's access

On the workspace page, open an agent's **access** view to see every tool its sites expose, whether it is allowed, and the first layer that blocks it. Your security tools can read the same view through the [Org API](/organizations/org-api#per-agent-tool-access).

## Who can change what

- Adding or removing a policy requires the **Manage security** permission.
- Each change is recorded in the [audit log](/organizations/audit-log) as `tool_policy.create` or `tool_policy.delete`.
- A blocked call that still reaches the server — for example from an older session — is refused and recorded as `denied` with the reason `workspace_policy`.
