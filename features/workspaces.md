---
title: Team Workspaces
description: Collaborate with your team — shared credentials, agents, roles, permissions, and user groups.
---

# Team Workspaces

Workspaces let teams collaborate on WebMCP Master. Members share site connections, run agents together, and manage permissions through roles and user groups. Workspaces are available on the **Team** plan.

## Creating a Workspace

1. Navigate to **Workspaces** in the sidebar.
2. Click **Create Workspace**.
3. Enter a workspace name.
4. Click **Create**.

You become the workspace **owner** with full permissions.

## Inviting Members

1. Open your workspace.
2. Go to the **Members** tab.
3. Click **Invite Member**.
4. Enter the email address of the person to invite.
5. Select their role.
6. Click **Invite**.

The invited user receives access immediately if they have a WebMCP Master account. Otherwise, they will see the workspace after signing up.

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

Workspace agents can use these keys instead of consuming individual members' credits.

## Workspace Agents

Agents created within a workspace:
- Use the workspace's shared vault tokens
- Can be run by any member with the `agentRun` permission
- Show in the workspace's run history
- Consume credits from the workspace owner's balance (or use workspace API keys)

## Workspace Runs

The **Workspace Runs** page shows a unified history of all agent runs in the workspace:
- Filter by agent, status, or date range
- See which member triggered each run
- View full run timelines and credit usage

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

Configure notification recipients in the **Notifications** tab:
- **Triggerer only** — only the person who started the run
- **All members** — everyone in the workspace
- **Specific group** — only members of a user group
- **Email** — optionally send notifications via email in addition to in-app
