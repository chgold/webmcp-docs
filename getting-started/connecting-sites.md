---
title: Connecting Sites
description: How to connect websites to Goldnat using the Vault — token types, OAuth, manifest detection, and troubleshooting.
---

# Connecting Sites

Every interaction between AI and your website starts with a connection stored in the **Vault**. This guide covers the different ways to connect a site, what happens behind the scenes, and how to troubleshoot common issues.

## What is the WebMCP Protocol

The Web Model Context Protocol (WebMCP) is a standard that lets websites expose tools to AI models. A site publishes a **manifest** — a JSON document that describes the site's name, available tools, and authentication method. When you connect a site in Goldnat, the platform reads this manifest and makes the tools available in your chat sessions and agents.

Unlike desktop-focused MCP implementations, WebMCP is designed for web-based platforms — forums, CMS systems, e-commerce sites, and custom applications.

## Adding a Site via the Vault

### Quick Connect (Recommended)

1. Navigate to **Sites** in the sidebar.
2. Click **Add Site**.
3. Paste the connection details you received from the site — either a plain API token, or the full connection prompt the site generated for you (which may include the token, a refresh token, and the site URL all in one block).
4. Click **Add**.

The platform parses whatever you paste and extracts all the relevant fields automatically. If the site gave you a full prompt, paste the entire thing — there is no need to manually pick out individual values.

The platform will then:
1. Fetch the site manifest to discover available tools.
2. Encrypt your credentials and store them in the vault.
3. Show a confirmation with the list of discovered tools.

### OAuth Connection (WebMCP Sites)

For sites that support the WebMCP OAuth flow:

1. Browse the **Directory** or enter the site URL.
2. Click **Connect**. You will be redirected to the site's login page.
3. Authorize Goldnat to access your account.
4. The platform automatically receives and stores the OAuth token.

OAuth tokens are refreshed automatically when they expire.

## Token Types

| Type | How It Works | Auto-Refresh |
|------|-------------|--------------|
| **Bearer Token** | A static API key you paste into the vault. The platform sends it in the `Authorization` header on every tool call. | No |
| **OAuth Token** | Generated through the OAuth 2.0 + PKCE flow. Stored encrypted alongside a refresh token. | Yes |
| **Prompt Token** | Some sites generate a combined prompt containing the token, refresh token, and site URL. Paste the entire prompt and the system parses all fields. | Yes |

## What Happens During Manifest Detection

When you add a site URL, the platform sends a `GET` request to discover the manifest. It checks the following paths in order:

1. `/.well-known/webmcp.json`
2. `/webmcp.json`
3. `/api/webmcp/manifest`

The manifest contains:
- **Site name and version** — displayed in the UI
- **Tools** — each with a name, description, and input schema (JSON Schema)
- **Authentication** — how the site expects credentials (Bearer, OAuth endpoints)
- **Server endpoint** — the base URL for tool execution

## Managing Tokens

### Updating a Token

If your token expires or you receive a new one:
1. Go to **Sites**.
2. Click the site entry.
3. Click **Update Token** and paste the new value.

### Deleting a Site

Removing a site from the vault:
1. Deletes the encrypted token from the database.
2. Removes the site from all groups that include it.
3. Removes the site from any active sessions.
4. Does **not** delete conversation history that referenced the site.

::: warning
Deleting a site is permanent. Agents that depend on this site will fail on their next run.
:::

## Troubleshooting

### "Could not fetch manifest from site"

- Verify the URL is correct and publicly accessible.
- Check that the site has a manifest at one of the standard paths.
- Ensure the site's SSL certificate is valid — the platform does not connect over plain HTTP.

### "Token exists — replace?"

Another token for this site is already in your vault. You can choose to replace the existing token or cancel.

### Tools are not appearing in chat

- Confirm the site is selected in your session settings.
- Check that the tools are not on the session's deny list.
- Go to **Sites** and verify the token status shows **Active**.
- If the token has expired, update it with a fresh value.

### Tools not loading after connecting a site

If you connected a site and no tools appear, the site may use a non-standard manifest location. Remove the site and reconnect using the full connection prompt the site provides — paste the entire prompt rather than just the token. The platform will locate the manifest correctly.

### OAuth redirect fails

- Make sure third-party cookies are not blocked in your browser.
- Try opening the connection in a new tab.
- Contact the site administrator to verify their OAuth configuration.
