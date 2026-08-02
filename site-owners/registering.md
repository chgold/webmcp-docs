---
title: Registering in the Directory
description: List your WebMCP-enabled site in the public directory — registration, verification, and benefits.
---

# Registering in the Directory

The Goldnat Directory is a public catalog of WebMCP-enabled sites. Registering your site makes it discoverable by all Goldnat users, who can connect with one click.

## Why Register

### Discoverability

Registered sites appear in the Directory, where users browse and search for sites to connect. Without registration, users must manually enter your site URL.

### Trust Signal

Verified sites display a verification badge, indicating that the domain owner has confirmed the manifest is legitimate. This builds trust with potential users.

### One-Click Connection

Users can connect to registered sites directly from the Directory without manually obtaining and entering tokens (when OAuth is configured).

### Increased Usage

More connected users means more AI interactions with your site, driving engagement and value for your user base.

## Registration Process

### Step 1: Prepare Your Site

Before registering, ensure:
- Your WebMCP manifest is live at `/.well-known/webmcp.json`
- The manifest passes validation (valid JSON, required fields present)
- At least one tool is defined
- Authentication is configured (Bearer or OAuth)
- HTTPS is enabled

### Step 2: Submit the Registration Form

1. Log in to Goldnat.
2. Go to **Directory** > **Register Your Site**.
3. Fill in the form:

| Field | Description | Required |
|-------|-------------|----------|
| **Site URL** | Your site's base URL (e.g., `https://community.example.com`) | Yes |
| **Site Name** | Display name for the Directory | Yes |
| **Description** | Brief description of your site | Yes |
| **Manifest URL** | Where the manifest is hosted (auto-detected from standard paths) | Auto |
| **Platform** | WordPress, XenForo, Drupal, Shopify, or Custom | Auto |
| **Auth Type** | Bearer or OAuth | Auto |

4. Click **Register Site**.

The platform fetches your manifest, validates it, and creates the Directory listing.

### Step 3: Verify Ownership

After registration, you receive a **verification token** (e.g., `wmcp_verify_a1b2c3d4e5f6`). To verify:

1. Add the token to your manifest's `verification` field:

```json
{
  "name": "My Site",
  "version": "1.0.0",
  "verification": "wmcp_verify_a1b2c3d4e5f6",
  "server": { ... },
  "auth": { ... },
  "tools": [ ... ]
}
```

2. Return to the Directory and click **Verify** on your site listing.
3. The platform fetches the manifest, confirms the token matches, and marks your site as **Verified**.

You can remove the `verification` field from the manifest after verification is complete.

## Manifest Validation During Registration

The platform checks:

| Check | Description |
|-------|-------------|
| **HTTPS** | The manifest URL must use HTTPS |
| **Valid JSON** | The document must be syntactically valid JSON |
| **Required fields** | `name`, `version`, `tools`, `server`, `auth` must be present |
| **Server URL** | `server.url` must be a valid HTTPS URL |
| **Tools** | At least one tool must be defined |
| **Tool schemas** | Each tool must have `name`, `description`, and `input_schema` |
| **Auth config** | For OAuth: `authorization_url` and `token_url` must be valid HTTPS URLs |

If any check fails, registration is rejected with a descriptive error message.

## Managing Your Listing

After registration, you can update your listing:

- **Description** — edit the public description shown in the Directory
- **Manifest** — if you update your manifest (add tools, change URLs), the platform will pick up changes on the next fetch

To remove your listing, contact **support@goldnat.ai**.

## Benefits of Verification

| Benefit | Unverified | Verified |
|---------|-----------|----------|
| Listed in Directory | Yes | Yes |
| Verification badge | No | Yes |
| Search ranking boost | No | Yes |
| User trust | Lower | Higher |
| Featured listing eligibility | No | Yes |
