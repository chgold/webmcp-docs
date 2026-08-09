---
title: Site Directory
description: Browse, search, and connect with Servio-enabled sites — filtering, verification, and site registration.
---

# Site Directory

The Directory is a public catalog of websites that support the Servio protocol. Browse available sites, filter by platform, connect with one click, and register your own site for others to discover.

## Browsing Sites

Navigate to **Directory** in the sidebar. Each site card shows:

- **Site name** — the display name from the manifest
- **URL** — the site's domain
- **Platform** — WordPress, XenForo, Drupal, Shopify, or Custom
- **Verification badge** — indicates the site owner has verified ownership
- **Description** — a brief description of the site's purpose
- **Connect button** — add the site to your vault

## Filtering

### By Platform

Click platform filter tags to show only sites running on a specific platform:

- WordPress
- XenForo
- Drupal
- Shopify
- Custom

### Verified Only

Toggle **Verified Only** to show only sites where the owner has completed the verification process. Verified sites have confirmed that the manifest is legitimate and the domain owner controls it.

### Search

Use the search bar to filter sites by name or URL.

## Connecting to a Site

### OAuth Connection

For sites with OAuth support:

1. Click **Connect** on the site card.
2. You are redirected to the site's login page.
3. After authenticating, copy the authorization code shown.
4. Paste it into the dialog on Goldnat.
5. The platform exchanges the code for an access token and stores it in your vault.

### Manual Connection

For sites without OAuth:

1. Obtain an API token from the site administrator.
2. Go to **Sites** > **Add Site**.
3. Enter the site URL and paste the token.

## Registering Your Own Site

If you are a site owner and want to list your site in the Directory:

1. Click **Register Your Site** at the top of the Directory page.
2. Fill in the registration form:
   - **Site URL** — your site's base URL
   - **Site Name** — display name
   - **Description** — what your site offers
   - **Manifest URL** — where the platform can fetch your manifest (auto-detected if standard path)
   - **Auth Type** — Bearer or OAuth
3. Click **Register Site**.

The platform fetches your manifest and validates it. If valid, your site appears in the Directory.

## Verification

After registering, you receive a **verification token**. To verify ownership:

1. Add the token to the `verification` field in your site's manifest.
2. Return to the Directory and click **Verify** on your site.
3. The platform fetches your manifest, checks the token, and marks your site as verified.

Verified sites display a badge and rank higher in search results.

## Manifest Validation

During registration, the platform validates:

- The manifest URL is reachable over HTTPS
- The JSON structure matches the Servio manifest schema
- Required fields are present: `name`, `version`, `tools`, `server`, `auth`
- At least one tool is defined with a valid input schema

See [Manifest Format](/site-owners/manifest-format) for the complete schema.
