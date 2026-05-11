---
title: Site Vault
description: Managing your site connections in the WebMCP Master vault — adding sites, token encryption, OAuth, and token lifecycle.
---

# Site Vault

The Vault is where all your site connections are stored. Every token, credential, and OAuth grant is encrypted at rest using AES-256-GCM. The Vault page lets you add, update, and remove sites, and shows the status of each connection.

## Adding a Site

### Quick Connect

1. Go to **Sites** in the sidebar.
2. Click **Add Site**.
3. Enter the **Site URL** (e.g., `https://community.example.com`).
4. Choose the platform if not auto-detected (WordPress, XenForo, Drupal, Custom).
5. Paste your **API Token**.
6. Click **Add**.

The platform will attempt to fetch the site's WebMCP manifest to discover available tools. If the manifest is found, tool details are filled in automatically.

### Prompt Token Detection

Some sites generate a combined prompt containing the token, refresh token, and site URL. If you paste such a prompt into the token field, the system detects the format and parses all fields automatically. You will see a confirmation message: "Full prompt detected — refresh token and URL will be saved automatically."

### OAuth Connection

For sites registered in the Directory with OAuth support:

1. Click **Connect** on the site card in the Directory.
2. You are redirected to the site's login page.
3. After authenticating, the authorization code is exchanged for an access token.
4. The token and refresh token are stored encrypted in the vault.

## How Tokens Are Stored

All tokens are encrypted before being written to the database:

- **Algorithm**: AES-256-GCM
- **Key**: Derived from the `ENCRYPTION_KEY` environment variable (64 hex characters)
- **Per-token IV**: Each token gets a unique initialization vector
- **Decryption**: Happens only at the moment of a tool call — decrypted values are never cached

This means even if the database is compromised, tokens remain unreadable without the encryption key.

## Token Statuses

| Status | Meaning |
|--------|---------|
| **Active** | Token is valid and ready for use |
| **Expired** | Token has passed its expiry date; update required |

The vault page shows the status badge next to each site. Expired tokens need to be updated manually (for Bearer tokens) or will be refreshed automatically (for OAuth tokens with a valid refresh token).

## Editing and Deleting

### Update Token

1. Click on the site entry.
2. Click **Update Token**.
3. Paste the new token value.
4. Click **Save**.

The old token is overwritten — there is no version history for tokens.

### Delete Site

1. Click the delete icon on the site entry.
2. Confirm the deletion.

::: warning
Deleting a site removes it from all groups, active sessions, and agent configurations. Conversation history referencing the site is preserved but tools from the site will no longer be callable.
:::

## Vault Sections

The Vault page is organized into two sections:

### Your Sites
Sites you connected manually by pasting API tokens. These are personal to your account.

### WebMCP Site Tokens
Tokens generated automatically through the WebMCP OAuth flow. These appear when you connect via the Directory using OAuth.

## Username Detection

When adding a site, you can optionally specify your username on that site. If left empty, the platform will attempt to detect it automatically by calling a user-info tool (if available). Knowing the username helps the AI personalize interactions and filter results.

## Vault Limits by Tier

| Plan | Max Sites in Vault |
|------|-------------------|
| Free | 3 |
| Pro | 10 |
| Harness | 25 |
| Team | Unlimited |
