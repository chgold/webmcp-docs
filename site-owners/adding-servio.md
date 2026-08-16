---
title: Adding Servio to Your Site
description: Integrate the Servio protocol with your website — WordPress, XenForo, Drupal, and custom implementations.
---

# Adding Servio to Your Site

This guide covers how to add Servio support to your website so users can connect it to Goldnat and interact with it through AI.

## Overview

Adding Servio to your site involves three steps:

1. **Publish a manifest** — a JSON file describing your site and its tools
2. **Implement tool endpoints** — API endpoints that handle tool calls
3. **Set up authentication** — how the platform authenticates requests

## WordPress

### Install the Plugin

1. Download the Servio plugin from the WordPress plugin directory or upload it manually.
2. Go to **wp-admin > Plugins > Add New > Upload Plugin**.
3. Install and activate the plugin.

### Configure

1. Go to **wp-admin > Settings > Servio**.
2. The plugin auto-generates a manifest based on your site's content types.
3. Review the available tools (e.g., `wordpress.searchPosts`, `wordpress.getPost`, `wordpress.searchPages`).
4. Configure authentication — the plugin supports Bearer token and OAuth.
5. Save settings.

### Generated Manifest

The plugin publishes the manifest at `/.well-known/servio.json` automatically. It includes tools for:

- Searching and reading posts, pages, and comments
- Creating and editing content (with appropriate permissions)
- Managing categories and tags
- User information (read-only)

## XenForo

### Install the Addon

1. Download the AI Connect addon for XenForo.
2. Upload it to your XenForo installation via the admin panel.
3. Go to **Admin > Add-ons** and install it.

### Configure

1. Go to **Admin > AI Connect > Settings**.
2. Configure which forum features to expose as tools.
3. Set up authentication (Bearer token per user, or OAuth).
4. The manifest is published at `/.well-known/servio.json`.

### Available Tools

- `xenforo.searchThreads` — search forum threads by keyword, date, category
- `xenforo.getThread` — retrieve a thread with its posts
- `xenforo_pro.replyToThread` — reply to a thread
- `xenforo_pro.findUserByName` — look up a user by name
- `xenforo.searchPosts` — search posts across the forum

## Drupal

### Install the Module

1. Install the Servio Drupal module via Composer or manual upload.
2. Enable it in **Admin > Extend**.
3. Configure at **Admin > Configuration > Servio**.

### Configure

The module supports:
- Content type mapping — which Drupal content types become tools
- Permission mapping — which Drupal roles authorize which tools
- OAuth integration via Drupal's built-in OAuth module

## Custom Implementation

For any website or application, implement the Servio protocol directly:

### Step 1: Create the Manifest

Create a JSON file and serve it at `/.well-known/servio.json`:

```json
{
  "name": "My Application",
  "version": "1.0.0",
  "description": "Project management tool",
  "server": {
    "url": "https://myapp.example.com/api/servio"
  },
  "auth": {
    "type": "bearer"
  },
  "tools": [
    {
      "name": "search_tasks",
      "description": "Search for tasks by keyword and status",
      "input_schema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "Search keyword"
          },
          "status": {
            "type": "string",
            "enum": ["open", "in_progress", "done"],
            "description": "Filter by task status"
          }
        },
        "required": ["query"]
      }
    }
  ]
}
```

### Step 2: Implement Tool Endpoints

Create an API endpoint that handles tool call requests:

```
POST /api/servio/tools/{tool_name}
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "query": "login bug",
  "status": "open"
}
```

Your endpoint should:
1. Validate the Bearer token
2. Parse the input parameters
3. Execute the operation
4. Return a JSON result

```json
{
  "results": [
    {
      "id": 42,
      "title": "Login page shows error on mobile",
      "status": "open",
      "assignee": "jane",
      "created": "2026-05-10"
    }
  ]
}
```

### Step 3: Set Up Authentication

For Bearer token authentication:
- Generate API tokens per user in your application
- Validate the token on every incoming request
- Return 401 for invalid tokens

For OAuth (recommended for production):
- Implement OAuth 2.0 with PKCE
- See the [Authentication guide](/site-owners/authentication) for the full flow

## Testing Your Integration

After setting up:

1. Visit `https://yoursite.com/.well-known/servio.json` in a browser — verify the manifest loads correctly
2. Add your site in Goldnat's vault — the platform should discover the manifest and list the tools
3. Start a chat with your site selected — ask the AI to use one of your tools
4. Check your server logs — verify the tool call arrived with proper authentication

## Checklist

- [ ] Manifest served at `/.well-known/servio.json` over HTTPS
- [ ] All tools defined with name, description, and input_schema
- [ ] Authentication configured (Bearer or OAuth)
- [ ] Tool endpoints return valid JSON
- [ ] Error responses include meaningful messages
- [ ] Rate limiting implemented on tool endpoints
- [ ] CORS headers set if needed (typically not needed since the platform calls server-side)
