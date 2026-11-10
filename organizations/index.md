---
title: Security & Governance
description: See and control everything your organization's agents can reach — inventory, findings, tool policies, audit log, integration keys and identity.
---

# Security & Governance

Every team workspace has a **Security** page for the people who answer for it. It shows what the workspace's agents can reach, flags what needs attention, and lets you cut access in one click — from the screen, or from your own security tools.

Security is available on the **Team** plan. To open it, go to **Workspaces**, open the workspace and click **Security**. You need the **Manage security** permission. The workspace owner always has it; others get it through a [user group's permissions or a personal override](/features/workspaces#user-groups).

## What is on the page

| Tab | What it is for |
|-----|----------------|
| **Overview** | Counts and findings that need attention, with the action next to each one. |
| **Audit log** | Every tool call and every administrative change in the workspace. See [Audit Log & Streaming](/organizations/audit-log). |
| **Tool policy** | Block tools for every agent in the workspace. See [Tool Policies](/organizations/tool-policies). |
| **Integration keys** | Org API keys for your security platform or SIEM. See [Org API](/organizations/org-api). |
| **Audit streaming** | Send every audit event to a webhook, Splunk or Datadog. |
| **Identity** | Verified domains, single sign-on and SCIM provisioning. See [Domains & Single Sign-On](/organizations/sso) and [SCIM Provisioning](/organizations/scim). |

## What the inventory covers

The inventory is what the **workspace** operates — not everything its members own:

- **Members** and their roles.
- **Workspace agents**, their sites, tool rules, write access, schedule and who pays for their AI.
- **Connections those agents can use**: the shared vault, and the connections of the member whose agent bills them.
- **Integration keys and workspace AI keys.**

A member's other personal connections and personal MCP keys are private. They never appear in the inventory, and nobody in the workspace can revoke them.

## Findings

The Overview tab lists what needs attention, from high to low:

| Finding | Severity | What to do |
|---------|----------|------------|
| Agent may run every write tool | High | Narrow its write access, or pause it. |
| Agent's AI key cannot run its model | High | Change the model or the key, or allow credit fallback. |
| Agent pays with goldnat credits because its key cannot run its model | Medium | Fix the key; the agent keeps working meanwhile. |
| Connection unused for over 90 days | Medium | Revoke it if nobody needs it. |
| Integration key unused for over 90 days | Medium | Revoke it. |
| An integration key expires soon | Low | Rotate it before it expires. |

## Cutting access

Three actions take effect immediately and are recorded in the audit log. The affected person is notified.

- **Revoke a connection** — the site credential is deleted and removed from every agent and session that uses it. When the site supports it, the token is also revoked at the site itself. The owner reconnects the site if it is still needed.
- **Pause an agent** — it stops running at once, including scheduled and webhook runs. Its owner can resume it.
- **Revoke an integration key** — any system using it stops working.

The same actions are available to your security platform through the [Org API](/organizations/org-api), for example to react automatically when someone leaves.

## Leaked keys revoke themselves

Every key goldnat issues starts with `gnat_` followed by its kind:

| Prefix | Key |
|--------|-----|
| `gnat_mcp_` | Personal MCP key (acts as you) |
| `gnat_org_` | Workspace Org API key |
| `gnat_scim_` | Workspace SCIM token |

The fixed prefix and a built-in checksum let secret scanners recognise a goldnat key without contacting us. goldnat takes part in GitHub's secret scanning program: when one of these keys is pushed to a public repository, gist or package, GitHub tells us, the key is revoked within seconds, and its owner is notified.

## Related

- [Tool Policies](/organizations/tool-policies)
- [Audit Log & Streaming](/organizations/audit-log)
- [Org API](/organizations/org-api)
- [Domains & Single Sign-On](/organizations/sso)
- [SCIM Provisioning](/organizations/scim)
- [Organization-Managed Accounts](/organizations/managed-accounts)
