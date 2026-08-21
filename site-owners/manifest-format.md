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

A unique identifier. The convention used by the official plugins is `namespace.actionTarget` — a lowercase namespace, a dot, then a camelCase verb and object. For example `xenforo.searchThreads`, `wordpress.getPost`, `shopify.createOrder`.

- Namespace by plugin tier, not just platform: the free XenForo add-on uses `xenforo.*` and the Pro add-on uses `xenforo_pro.*`
- Keep the action descriptive and unique within the namespace
- The platform prefixes the whole name with the site identifier to avoid collisions across sites, so `xenforo.searchThreads` on `example.com` is addressed as `example_com_xenforo_searchThreads`

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

### `brief`

Declares which of your tools produce numbers worth tracking over time. Sites that
publish this section get their metrics collected on a schedule **without an AI
model being involved at all** — Goldnat calls the tool you name and reads the
value at the path you specify.

That matters for accuracy. When a model has to interpret a tool response to find
a number, the number is only as reliable as the interpretation. A declared metric
skips that step entirely, so the figure that reaches your dashboard is the figure
your API returned.

```json
"brief": {
  "metrics": [
    {
      "key": "sales.revenue.daily",
      "tool": "getSalesSummary",
      "args": { "period": "yesterday" },
      "valuePath": "data.totals.revenue",
      "unit": "ILS",
      "granularity": "day"
    }
  ]
}
```

| Field | Required | Meaning |
|---|---|---|
| `key` | yes | Canonical metric name. Must match `^[a-z0-9]+(\.[a-z0-9_]+)+$` |
| `tool` | yes | The tool's `name` **as it appears in your manifest**, without any site prefix |
| `args` | no | Fixed arguments passed to the tool on every call |
| `valuePath` | yes | Dotted path to the number inside the tool's response |
| `unit` | no | Display unit, e.g. `ILS`, `USD`, `count` |
| `granularity` | no | `hour`, `day`, `week` or `month`. Defaults to `day` |

#### Canonical keys

`key` is deliberately platform-neutral so a shop, a forum and a course platform
can feed the same dashboard slot. Use an existing key where one fits:

| Key | Meaning |
|---|---|
| `sales.revenue.daily` | Revenue for one day |
| `sales.orders.daily` | Order count for one day |
| `community.unanswered.count` | Threads or tickets still without a reply |
| `content.published.daily` | Items published in a day |

#### `valuePath`

A dotted path supporting object keys and numeric array indexes:

```
data.totals.revenue     → { "data": { "totals": { "revenue": 2340 } } }
rows.0.count            → { "rows": [ { "count": 12 } ] }
```

This is intentionally **not** JSONPath. There are no wildcards, filters or
expressions, because a selection Goldnat cannot audit is a selection it cannot
trust.

#### Requirements

Your tool must return **valid JSON**, and the value at `valuePath` must reduce to
a finite number. These are accepted:

```
2340          "2340"          "$2,340.00"
```

These are not, and the metric is dropped rather than stored as zero:

```
"no sales"    null    {}    NaN
```

A `brief` section that fails validation is ignored in full. Goldnat will not act
on part of a spec it could not parse, so a typo costs you collection rather than
producing a silently wrong series.

#### What it looks like to the user

Collected metrics appear on the user's dashboard each morning. A change is only
ever shown against a period that was actually collected — if last week's value
was never recorded, the value is displayed on its own with no trend indicator.
Daily metrics are compared against the **same weekday** a week earlier, since
day-over-day movement mostly reflects the day of the week.

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
