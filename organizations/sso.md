---
title: Domains & Single Sign-On
description: Verify your organization's email domain, let people sign in with Okta, Microsoft Entra ID or Google Workspace (OIDC or SAML), and require it.
---

# Domains & Single Sign-On

Single sign-on (SSO) lets people sign in to goldnat with your organization's identity provider (IdP) — Okta, Microsoft Entra ID, Google Workspace or any provider that speaks **OpenID Connect** or **SAML 2.0**.

Everything on this page is set up in the workspace's **Security → Identity** tab, by someone with the **Manage security** permission.

## 1. Verify your domain

A verified domain is what makes an account your organization's. Every goldnat account whose email is on a domain you verified is **managed** by your workspace:

- you can require SSO for it,
- disabling the person in your IdP through [SCIM](/organizations/scim) closes their whole goldnat account,
- the person sees in their Settings that the account is managed. See [Organization-Managed Accounts](/organizations/managed-accounts).

It does not matter who created the account. An employee who signed up on their own with their work address is managed the same way; an account a company opened on someone's personal Gmail address is not.

To verify a domain:

1. Under **Verified domains**, enter the domain (for example `example.com`) and click **Add domain**.
2. goldnat shows a TXT record. Add it to the domain's DNS, at the domain itself:

   ```
   example.com.  TXT  "goldnat-verification=…"
   ```

3. Click **Verify**. DNS changes can take a few minutes to propagate; try again if it is not found yet.

A domain can be verified by **one workspace** only. Public mail domains (gmail.com, outlook.com and the like) cannot be verified. You can leave the TXT record in place.

Removing a domain stops managing its accounts. If it was the last verified domain, **Require SSO** is switched off.

## 2. Configure SSO

Choose **OIDC** or **SAML**. goldnat shows the values to enter in your IdP; copy them from the screen, as they include your workspace's ID.

### OpenID Connect (OIDC)

In your IdP, create a **web application** with:

| Setting | Value |
|---------|-------|
| Redirect URI | `https://goldnat.ai/api/sso/oidc/callback` |
| Initiate login URL | `https://goldnat.ai/api/sso/start/<workspace ID>` |
| Grant type | Authorization code |
| Scopes | `openid`, `email`, `profile` |

Then enter in goldnat:

- **Issuer URL** — for example `https://<your-org>.okta.com` or `https://login.microsoftonline.com/<tenant ID>/v2.0`. goldnat reads the provider's discovery document from it.
- **Client ID** and **Client secret**. The secret is stored encrypted and never shown again; leave the field empty later to keep it.

goldnat uses the authorization code flow with PKCE and checks the ID token's signature, issuer, audience, expiry and nonce. The email is taken from the `email` claim, or from `preferred_username` / `upn` for Entra ID. An email the provider marks as **not verified** is refused.

### SAML 2.0

In your IdP, create a **SAML 2.0** application with:

| Setting | Value |
|---------|-------|
| ACS (reply) URL | `https://goldnat.ai/api/sso/saml/<workspace ID>/acs` |
| Entity ID (audience) | `https://goldnat.ai/api/sso/saml/<workspace ID>` |
| SP metadata URL | `https://goldnat.ai/api/sso/saml/<workspace ID>/metadata` |
| Name ID | The user's email address |
| Attribute (optional) | `email` = the user's email address |

Then enter in goldnat, from the IdP's setup instructions or metadata:

- **IdP sign-on URL** — where goldnat sends people to sign in.
- **IdP entity ID (issuer)** — recommended; goldnat then checks it.
- **IdP signing certificate** — the X.509 certificate, PEM or plain base64.

The **assertion must be signed**; signing the outer response is optional. Sign-in must start from goldnat (SP-initiated): responses goldnat did not ask for are refused.

### Switching it on

Click **Save**, then turn on **SSO is on**. People can now sign in from the goldnat sign-in screen with **Sign in with your organization (SSO)**: they enter their work email and are taken to your IdP.

## Who can sign in

Your IdP can sign in **only addresses on your verified domains**, whatever the assertion says. This is what stops one organization's IdP from signing in as another organization's people.

**Create accounts on first sign-in** (on by default): someone from your organization who signs in for the first time gets a goldnat account and joins the workspace with the default role. People provisioned through [SCIM](/organizations/scim) get their membership and role from SCIM instead. With this switched off, only people who already have an account or were provisioned can sign in.

## Requiring SSO

Turn on **Require SSO** (it needs at least one verified domain). Then:

- Google sign-in is refused for every address on your verified domains; those people are sent to your IdP.
- Everyone on those domains who is signed in another way is **signed out at once** and must sign in again with SSO.
- The **workspace owner** is exempt and can still sign in with Google — your way back in if the IdP is down. The admin who switches it on also stays signed in.

## Access to sites through your identity provider (Cross App Access)

With **OpenID Connect** SSO, goldnat can connect your members to your organization's sites without each of them connecting every site. goldnat asks your identity provider for access to the site on the member's behalf (an *Identity Assertion JWT Authorization Grant*, ID-JAG), and the site exchanges it for an access token. Your identity provider decides every time: when it stops granting access — the person left, or was unassigned from the site — the connection is removed.

Requirements:

- SSO with **OIDC** (not SAML), switched on.
- The site runs an **AI Connect plugin that accepts identity-provider grants**, with goldnat registered as a client in the plugin's settings.
- An identity provider that supports Cross App Access, such as Okta.

To set it up:

1. In **Security → Identity**, turn on **Request site access from the identity provider**.
2. Under **Add a site**, enter the site address, and the client ID and secret that the site's plugin gave goldnat. goldnat checks that the site accepts identity-provider grants.
3. Copy the site's **authorization server** shown in the list, and add it to your identity provider (in Okta: the resource app's *Cross-app access* setting), assigning the people or groups who may use it.

Each member is connected at their next SSO sign-in, and goldnat renews the access by itself. A connection a member made themselves always takes precedence, and is never replaced. Turning a site off, removing it, or turning the feature off removes the connections made through the identity provider at once.

Every connection, refusal and change is recorded in the [audit log](/organizations/audit-log) (`connection.xaa_connect`, `connection.revoke`, `xaa.*`).

## When sign-in fails

The sign-in page explains what went wrong:

| Message | Usual cause |
|---------|-------------|
| The sign-in expired or was started in another browser | It took over 10 minutes, or the IdP returned to a different browser. Start again. |
| We could not verify the response | Wrong certificate, entity ID, client ID or issuer; or the assertion is not signed. |
| Your organization's sign-in did not include your email address | Configure the IdP to send the email as the Name ID or the `email` attribute / claim. |
| This email domain is not verified for your organization | The person's email is not on a verified domain of this workspace. |
| Your organization has not given you access yet | Create accounts on first sign-in is off, and the person has no account. |
| Your organization disabled this account | The person was deprovisioned through SCIM. |
| We could not reach your organization's sign-in service | The IdP's discovery or key endpoint did not answer. |

Every SSO sign-in and every configuration change is recorded in the [audit log](/organizations/audit-log) (`sso.login`, `sso.configure`, `sso.update`, `sso.delete`, `domain.*`).
