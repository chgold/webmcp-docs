---
title: Organization-Managed Accounts
description: What it means when your goldnat account is managed by your organization, and how to move your personal content to another account.
---

# Organization-Managed Accounts

If your email address is on a domain your organization has [verified](/organizations/sso#_1-verify-your-domain) with goldnat, your account is **managed** by your organization's workspace. This page explains what that means for you.

## What your organization can do

- **Require single sign-on.** You may be asked to sign in through your organization's sign-in page instead of Google.
- **Close the account when you leave.** If your organization removes you through its identity provider, the whole account is disabled — sign-ins, keys, site connections and agents.

Being managed does not give your organization access to your personal chats or files. What it sees is what happens inside its workspaces.

## How you are told

When your account becomes managed you see a one-time notice, which you can dismiss. After that, **Settings → Organization account** shows which organization manages the account and through which domain. There is no permanent banner.

When you create a workspace from a managed account, the dialog reminds you that it lives in the account — and closes with it if your organization removes you.

## Keeping personal and work use apart

For personal use, sign up with another email address. If you already have personal content in your work account, you can move it there.

## Moving personal content to another account

Only **personal** content can move — content outside every workspace that never touched your organization's sites. Nothing can be taken out of a workspace this way.

| Moves | Stays |
|-------|-------|
| Your personal agents (they arrive **paused**) | Anything inside a workspace |
| Your personal chats | Anything that used a site your organization connected (its URL or a page under it) |
| Your personal files (into the other account's top folder) | Your morning-brief agent |
| Your artifacts | Runs of workspace agents |
| Your site groups (renamed if the name is taken) | Site connections, MCP keys, credits and licenses |

To move it:

1. Go to **Settings → Organization account**.
2. Click **See what can move** to see exactly what moves and what stays.
3. Enter the email of your other goldnat account and click **Send request**. The account must already exist, and it cannot be another account of the same organization. Only one request can wait at a time.
4. Sign in to the other account. The request appears in **Settings**; accept it within **7 days**.

When you accept, everything is checked again and moves in one step. You can cancel a pending request from the sending account, or decline it from the receiving one.

Your organization's audit log records the request, a decline and the completed move — never the content itself. Your organization can switch personal-content transfer off for its accounts; the Settings section then says so. An account that was already disabled by the organization cannot transfer.

## For administrators

The switch is in **Security → Identity → Personal content of managed accounts**: *Allow people to move their personal content to another account*. It is on by default. See also [Domains & Single Sign-On](/organizations/sso) and [SCIM Provisioning](/organizations/scim).
