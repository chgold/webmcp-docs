---
title: Manifest Format
description: Complete specification of the Servio manifest JSON schema — required fields, tool definitions, authentication, and examples.
---

# Manifest Format

The Servio manifest is a JSON document that describes your site's identity, available tools, and authentication method. It is served at a well-known URL and consumed by AI platforms like Goldnat.

## Manifest Location

Serve the manifest at one of these paths (checked in order):

1. `/.well-known/servio.json` (recommended)
2. `/servio.json`
3. `/api/servio/manifest`

The manifest must be served over HTTPS with `Content-Type: application/json`.

## JSON Schema

```json
{
  "name": "string (required)",
  "version": "string (required)",
  "description": "string (optional)",
  "server": {
    "url": "string (required)"
  },
  "auth": {
    "type": "string (required): 'bearer' | 'oauth2'",
    "authorization_url": "string (required for oauth2)",
    "token_url": "string (required for oauth2)",
    "scopes": ["string (optional)"]
  },
  "tools": [
    {
      "name": "string (required)",
      "description": "string (required)",
      "input_schema": {
        "type": "object",
        "properties": {},
        "required": []
      }
    }
  ],
  "verification": "string (optional)"
}
```

## Required Fields

### `name`

The display name of your site. Shown in the Goldnat vault and Directory.

```json
"name": "Community Forum"
```

### `version`

The manifest version. Use semantic versioning.

```json
"version": "2.1.0"
```

### `server`

The base URL for tool execution. All tool calls are sent to `{server.url}/tools/{tool_name}`.

```json
"server": {
  "url": "https://community.example.com/api/servio"
}
```

### `auth`

How the platform should authenticate requests.

**Bearer token:**
```json
"auth": {
  "type": "bearer"
}
```

**OAuth 2.0 with PKCE:**
```json
"auth": {
  "type": "oauth2",
  "authorization_url": "https://community.example.com/oauth/authorize",
  "token_url": "https://community.example.com/oauth/token",
  "scopes": ["read", "write"]
}
```

### `tools`

An array of tool definitions. Each tool must have a name, description, and input schema.

## Tool Definition Schema

Each tool defines an action the AI can perform on your site.

### `name`

A unique identifier. Convention: `sitename_action_target` (e.g., `community_search_threads`).

- Use lowercase with underscores
- Keep it descriptive and unique
- The platform prefixes this with the site identifier to avoid collisions across sites

### `description`

A natural language description of what the tool does. The AI reads this to decide when and how to use the tool. Be specific:

**Good:**
```json
"description": "Search forum threads by keyword. Returns matching threads with title, author, date, and reply count. Supports filtering by category and date range."
```

**Bad:**
```json
"description": "Search threads"
```

### `input_schema`

A JSON Schema object defining the tool's input parameters:

```json
"input_schema": {
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "description": "Search keyword or phrase"
    },
    "category": {
      "type": "string",
      "description": "Filter by category name (optional)"
    },
    "limit": {
      "type": "integer",
      "description": "Maximum number of results (default: 10, max: 50)",
      "default": 10
    },
    "sort": {
      "type": "string",
      "enum": ["relevance", "date", "replies"],
      "description": "Sort order for results",
      "default": "relevance"
    }
  },
  "required": ["query"]
}
```

Supported JSON Schema types: `string`, `number`, `integer`, `boolean`, `array`, `object`.

Include `description` for every property — the AI uses these descriptions to choose correct parameter values.

## Optional Fields

### `description`

A site-level description shown in the Directory:

```json
"description": "A community forum for web developers with 50,000 members discussing frontend, backend, and DevOps topics."
```

### `verification`

A token provided by Goldnat during the Directory registration process. Add it to verify ownership:

```json
"verification": "wmcp_verify_a1b2c3d4e5f6"
```

## Complete Example

```json
{
  "name": "DevCommunity Forum",
  "version": "2.1.0",
  "description": "Web developer community forum with 50,000 members",
  "server": {
    "url": "https://devcommunity.example.com/api/servio"
  },
  "auth": {
    "type": "oauth2",
    "authorization_url": "https://devcommunity.example.com/oauth/authorize",
    "token_url": "https://devcommunity.example.com/oauth/token",
    "scopes": ["read", "write", "admin"]
  },
  "tools": [
    {
      "name": "search_threads",
      "description": "Search forum threads by keyword. Returns matching threads with title, author, creation date, reply count, and category.",
      "input_schema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "Search keyword or phrase"
          },
          "category": {
            "type": "string",
            "description": "Filter by category name"
          },
          "sort": {
            "type": "string",
            "enum": ["relevance", "date", "replies"],
            "default": "relevance"
          },
          "limit": {
            "type": "integer",
            "default": 10,
            "description": "Max results to return (1-50)"
          }
        },
        "required": ["query"]
      }
    },
    {
      "name": "get_thread",
      "description": "Retrieve a thread by ID with all posts and metadata.",
      "input_schema": {
        "type": "object",
        "properties": {
          "thread_id": {
            "type": "integer",
            "description": "The thread ID"
          }
        },
        "required": ["thread_id"]
      }
    },
    {
      "name": "create_post",
      "description": "Reply to an existing thread. Requires write scope.",
      "input_schema": {
        "type": "object",
        "properties": {
          "thread_id": {
            "type": "integer",
            "description": "The thread to reply to"
          },
          "content": {
            "type": "string",
            "description": "The post body (supports BBCode)"
          }
        },
        "required": ["thread_id", "content"]
      }
    }
  ]
}
```

## Validation

Goldnat validates your manifest when:
- A user adds your site to the vault
- You register your site in the Directory
- The manifest is refreshed (periodically or on demand)

Validation checks:
- JSON is syntactically valid
- Required fields (`name`, `version`, `tools`, `server`, `auth`) are present
- `server.url` is a valid HTTPS URL
- Each tool has `name`, `description`, and `input_schema`
- `input_schema` is a valid JSON Schema object
- OAuth URLs (if present) are valid HTTPS URLs

If validation fails, the platform returns an error describing what is missing or malformed.
