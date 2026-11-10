---
title: SCIM Provisioning
description: Let Okta, Microsoft Entra ID or another SCIM 2.0 identity provider add, update and remove workspace members — and cut access the moment someone leaves.
---

# SCIM Provisioning

With SCIM, your identity provider (IdP) manages the workspace's members. People you assign in the IdP become members; people you disable there lose access here at once.

Set it up in the workspace's **Security → Identity** tab, under **Identity provider (SCIM)**.

## Connecting your IdP

1. Click **New SCIM token**, name it after the IdP that will use it (for example *Okta*), and copy the token. It starts with `gnat_scim_` and is shown **once**.
2. Copy the **SCIM base URL** shown on the screen:

   ```
   https://goldnat.ai/api/scim/v2
   ```

3. In your IdP's SCIM application, enter the base URL and the token as the **Bearer token** (OAuth Bearer Token / HTTP header authentication).
4. Enable provisioning of users (create, update, deactivate) and, if you want roles from groups, push your groups.

The token selects the workspace; nothing in a request can reach another workspace. Revoke a token at any time — the IdP then cannot change members until you give it a new one.

### Okta

In your Okta app integration, enable **SCIM provisioning**, set the **SCIM connector base URL** to the base URL above, **Unique identifier field for users** to `userName`, and **Authentication mode** to **HTTP Header** with the token. Enable **Create Users**, **Update User Attributes** and **Deactivate Users**, and use **Push Groups** for role mapping.

### Microsoft Entra ID

In your enterprise application, open **Provisioning**, set the mode to **Automatic**, enter the base URL as the **Tenant URL** and the token as the **Secret Token**, then **Test Connection** and start provisioning.

## What happens to people

| In the IdP | In goldnat |
|------------|------------|
| A user is assigned | They become a member (an account is created if needed) with their role. |
| A user's attributes change | Name and email are updated. |
| A user is deactivated or unassigned | Access is cut at once — see below. |
| A user is reactivated | Their account and membership come back. Paused agents stay paused and revoked keys stay revoked: turning them back on is a human decision. |

### When someone is deactivated

What is cut depends on whether the account is **managed** — whether its email is on one of your [verified domains](/organizations/sso#_1-verify-your-domain):

- **Managed account:** the whole goldnat account is disabled. Every sign-in ends in every browser, every MCP key and site connection is revoked (at the site too, where the site supports it), and all of the person's agents are paused.
- **Not managed** (for example a personal Gmail address): only this workspace is cut — the membership, the person's workspace agents and those agents' open runs.

The workspace's own access is always cut first, so a later failure never leaves the urgent part undone. Every step is recorded in the [audit log](/organizations/audit-log) with source `scim`, and the workspace owner is notified.

The panel's **Provisioned people** list shows each person as an **Organization account** (managed) or a **Personal account**.

### The workspace owner

SCIM never changes or removes the workspace owner. Deprovisioning the owner is refused.

## Roles from groups

Under **Roles from IdP groups**, map each pushed group to **Admin**, **Member** or **Viewer**, or to no role. A member gets the **highest** role among their mapped groups; people in no mapped group get the **default role**.

The IdP is the source of truth for the people it manages: a role you change by hand is overwritten at the next group change.

## Supported operations

| Endpoint | Methods |
|----------|---------|
| `/ServiceProviderConfig`, `/ResourceTypes`, `/Schemas` | GET |
| `/Users` | GET (list, filter), POST |
| `/Users/{id}` | GET, PUT, PATCH, DELETE |
| `/Groups` | GET (list, filter), POST |
| `/Groups/{id}` | GET, PUT, PATCH, DELETE |

- **Filters:** `attribute eq "value"` on `userName`, `externalId`, `id` and `emails` (users) and on `displayName`, `externalId` and `id` (groups). Other filters are refused with `invalidFilter` rather than ignored.
- **Paging:** `startIndex` and `count`, up to 200 results per page.
- **Not supported:** bulk operations, sorting, ETags and password changes. A password sent by the IdP is ignored and never stored.
- The token is accepted with or without the `Bearer` prefix.
