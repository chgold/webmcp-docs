---
title: Team Workspaces
description: Collaborate with your team — shared credentials, agents, roles, permissions, user groups, and who pays for each agent's AI.
---

# Team Workspaces

Workspaces let teams collaborate on Goldnat. Members share site connections, run agents together, and manage permissions through roles and user groups. Workspaces are available on the **Team** plan.

## Creating a Workspace

1. Navigate to **Workspaces** in the sidebar.
2. Click **Create Workspace**.
3. Enter a workspace name.
4. Click **Create**.

You become the workspace **owner** with full permissions.

::: info
If your account is [managed by your organization](/organizations/managed-accounts), a workspace you create lives in that account and closes together with it if your organization removes you.
:::

## Workspace Overview

The **Overview** tab gives the workspace at a glance: members, active agents, agents that may write, connected sites, AI keys, credit balance, blocked-tool rules, and recent runs from the last 30 days.

**Needs attention** lists the most important [findings](/organizations/#findings) — for example an agent whose AI key cannot run its model — with a link to the full list on the [Security page](/organizations/).

## Inviting Members

1. Open your workspace.
2. Go to the **Members** tab.
3. Click **Invite Member**.
4. Enter the email address of the person to invite.
5. Select their role.
6. Click **Invite**.

The invited user receives access immediately if they have a Goldnat account. Otherwise, they will see the workspace after signing up.

Organizations can also add and remove members automatically from their identity provider with [SCIM](/organizations/scim), and let people sign in with [single sign-on](/organizations/sso).

## Roles

| Role | Description |
|------|-------------|
| **Owner** | Full control. Can delete the workspace, manage billing, and change any setting. |
| **Admin** | Can manage members, tokens, agents, and permissions. Cannot delete the workspace. |
| **Member** | Can use chat and run agents. Cannot manage tokens or invite users. |
| **Viewer** | Read-only access to runs and conversations. Cannot execute anything. |

## Permission Matrix

Granular permissions control who can do what:

| Permission | Owner | Admin | Member | Viewer |
|------------|-------|-------|--------|--------|
| View chat | Yes | Yes | Yes | Yes |
| Write to chat | Yes | Yes | Yes | No |
| Run agents | Yes | Yes | Yes | No |
| Manage agents | Yes | Yes | No | No |
| Manage webhooks | Yes | Yes | No | No |
| Manage tokens | Yes | Yes | No | No |
| Manage members | Yes | Yes | No | No |
| View runs | Yes | Yes | Yes | Yes |

The **Manage security** permission opens the workspace's [Security page](/organizations/): inventory, tool policies, audit log, integration keys and identity settings. The owner always has it; give it to others through a user group's permissions in the workspace or a personal override.

## Shared Credentials

Workspace tokens are separate from personal vault tokens. They are shared across all workspace members.

### Adding a Workspace Token

1. Go to the **Shared Vault** tab in your workspace.
2. Click **Add Token**.
3. Enter the site URL and token.
4. Click **Save**.

All workspace members can use this site in workspace chat sessions and agents.

### Removing a Token

Only owners and admins can remove shared tokens. Removing a token affects all workspace agents that depend on it.

## Workspace API Keys

Workspaces can have their own AI API keys, separate from individual BYOK keys:

1. Go to the **AI Keys** tab.
2. Click **Add Key**.
3. Select the provider (Anthropic, OpenAI, Google, OpenRouter).
4. Enter a display name and the API key.
5. Click **Save**.

Workspace agents can use these keys instead of an individual member's personal key, so team usage lands on one shared provider account.

### Replacing or deleting a key

Before a workspace key is replaced with a key of another provider, or deleted, Goldnat checks which agents use it. If some of them would stop working, you choose what happens to them first:

- **Switch them to a model of the new provider**
- **Move them to another workspace key**
- **Pay with goldnat credits**
- **Leave as is** — they will fail until someone fixes them

You can set one rule for all of them, or decide per agent. The key change and the agent changes are saved together, and each is recorded in the [audit log](/organizations/audit-log).

## Workspace Agents

Agents created within a workspace:
- Use the workspace's shared vault tokens
- Can be run by any member with the `agentRun` permission
- Show in the workspace's run history
- Respect the workspace's [tool policies](/organizations/tool-policies)

### Who pays for the AI

Each workspace agent states who pays for its AI, under **Who pays for the AI** in the agent dialog:

| Option | Who pays |
|--------|----------|
| **goldnat credits** | The workspace's credit balance. |
| **A workspace AI key** | One of the keys in the **AI Keys** tab. |
| **My own AI key or connection** | The member who chooses it — their provider key, Claude subscription or OpenRouter connection. The workspace is not charged. |

Only a member can attach their own key; nobody can point an agent at another member's key. If the key's owner leaves the workspace, the agent's runs stop with a message until someone chooses another option.

The dialog checks the choice against the model as you edit. A key that cannot run the chosen model — a workspace key for another provider, a model goldnat credits do not cover, a member with no key for that provider — cannot be saved.

### Paying with credits when a key fails

A key can stop working after it was saved — it expires, or its provider stops offering the model. By default such runs fail with a clear message. To keep them running:

1. A workspace owner or admin turns on **Let agents pay with goldnat credits when their key cannot run their model** in the **AI Keys** tab.
2. Each agent that should use it turns on **If this key cannot run the model, pay with goldnat credits** in its own settings.

Both switches must be on, and goldnat credits must cover the model. Every such run is recorded in the audit log as `agent.credit_fallback`, and the Security page shows the agent as a medium finding until the key is fixed.

### Editing an agent someone else created

Workspace admins and members with the **Manage agents** permission can open and edit any workspace agent. Because an agent runs with its **creator's** site connections, only the creator can widen what it may do:

- add sites or site groups,
- turn a tool back on,
- grant write access or new write tools,
- add a webhook trigger.

Everyone else can change its instructions and schedule, and narrow it. The creator is notified of edits made by others, and each one is recorded in the audit log as `agent.update_by_other`.

### Transferring ownership

Workspace admins can transfer an agent to another member with **Transfer ownership**. The agent then runs with the new owner's connections and appears as theirs. The previous owner's site groups are copied into the agent's own site list, so it keeps the same sites. Before you confirm, Goldnat shows which of those sites the new owner is not connected to — runs on them will fail until they connect. Transfers are recorded as `agent.transfer`.

### Agent access details

**Access details** on an agent shows its AI key, every site it uses with the connection behind it, and every tool those sites offer — allowed or blocked, and by which layer: the site, the workspace policy, the creator's site group, the agent's own rules, or write approval. See [Tool Policies](/organizations/tool-policies#how-access-is-decided).

## Workspace Runs

The **Workspace Runs** page shows a unified history of all agent runs in the workspace:
- Filter by agent, status, or date range
- See which member triggered each run
- View full run timelines and token usage

## User Groups

User groups let you assign the same permissions to multiple users at once:

1. Navigate to **User Groups** in the sidebar.
2. Click **New Group**.
3. Name the group and add members by email.
4. Assign the group to a workspace with specific permissions.

### Group Permissions in Workspaces

1. Open a workspace and go to the **Permissions** tab.
2. Click **Add Group**.
3. Select a user group.
4. Configure which permissions the group has in this workspace.

All members of the group inherit those permissions.

### Personal Overrides

Admins can set per-user permission overrides that take precedence over group permissions:

1. In the Permissions tab, click **Personal Override** next to a member.
2. Toggle specific permissions on or off.

### Group Permission Blocks

You can block a specific user's group permissions from applying in a workspace:
- Self-opt-out: members can disable their own group permissions
- Manager block: admins can block group permissions for a specific user

## Notifications

Workspace notifications alert members about:
- Agent runs that require input
- Agent completion or failure
- Workspace membership changes
- Security actions that affect them, such as a revoked connection or a paused agent

Configure notification recipients in the **Notifications** tab:
- **Triggerer only** — only the person who started the run
- **All members** — everyone in the workspace
- **Specific group** — only members of a user group
- **Email** — optionally send notifications via email in addition to in-app
