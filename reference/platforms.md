---
title: Supported Platforms
description: Platforms compatible with the Servio protocol — WordPress, XenForo, Drupal, Shopify, and custom integrations.
---

# Supported Platforms

Goldnat works with any website that implements the Servio protocol. Several popular platforms have ready-made integrations, while custom sites can implement the protocol directly.

## WordPress

| Detail | Value |
|--------|-------|
| **Integration** | Servio Plugin |
| **Installation** | WordPress plugin directory or manual upload |
| **Config** | wp-admin > Settings > Servio |
| **Manifest** | Auto-generated at `/.well-known/servio.json` |
| **Auth** | Bearer token or OAuth 2.0 |

### Available Tools

| Tool | Description |
|------|-------------|
| `search_posts` | Search posts by keyword, category, date |
| `get_post` | Retrieve a single post with content |
| `create_post` | Create a new post (draft or published) |
| `update_post` | Edit an existing post |
| `list_categories` | List all post categories |
| `get_comments` | Get comments for a post |
| `create_comment` | Add a comment to a post |
| `get_users` | List site users (admin only) |
| `search_media` | Search media library |

### Setup Steps

1. Install the plugin from the WordPress plugin directory.
2. Activate it in wp-admin > Plugins.
3. Go to Settings > Servio.
4. Choose which content types to expose as tools.
5. Configure authentication (generate Bearer tokens per user, or enable OAuth).
6. Save. The manifest is now live at `/.well-known/servio.json`.

## XenForo

| Detail | Value |
|--------|-------|
| **Integration** | AI Connect Addon |
| **Installation** | Upload via XenForo admin panel |
| **Config** | Admin > AI Connect > Settings |
| **Manifest** | `/.well-known/servio.json` |
| **Auth** | Bearer token or OAuth 2.0 |

### Available Tools

| Tool | Description |
|------|-------------|
| `search_threads` | Search forum threads with filters |
| `get_thread` | Retrieve a thread with its posts |
| `create_thread` | Start a new thread in a forum |
| `create_post` | Reply to a thread |
| `get_user` | Look up a user profile |
| `list_forums` | List all forum categories |
| `get_thread_poll` | Get poll data from a thread |
| `search_users` | Search users by name or email |

### Setup Steps

1. Download the AI Connect addon.
2. Upload via Admin > Add-ons > Install/upgrade from archive.
3. Configure exposed tools in Admin > AI Connect.
4. Set up authentication.
5. Manifest auto-generated at the well-known path.

## Drupal

| Detail | Value |
|--------|-------|
| **Integration** | Servio Module |
| **Installation** | Composer or manual upload |
| **Config** | Admin > Configuration > Servio |
| **Manifest** | `/.well-known/servio.json` |
| **Auth** | Bearer token or OAuth (via Drupal OAuth module) |

### Available Tools

| Tool | Description |
|------|-------------|
| `search_content` | Search nodes (articles, pages) |
| `get_node` | Retrieve a content node |
| `create_node` | Create a new content node |
| `update_node` | Update an existing node |
| `list_taxonomies` | List taxonomy terms |
| `get_user` | Get user profile information |

### Setup Steps

1. Install via Composer: `composer require drupal/servio`
2. Enable the module in Admin > Extend.
3. Configure at Admin > Configuration > Servio.
4. Map Drupal content types to Servio tools.
5. Set up authentication.

## Shopify

| Detail | Value |
|--------|-------|
| **Integration** | Custom App |
| **Installation** | Shopify App Store or custom app installation |
| **Config** | Shopify admin > Apps > Servio |
| **Manifest** | Custom URL |
| **Auth** | Bearer token (Shopify API key) |

### Available Tools

| Tool | Description |
|------|-------------|
| `search_products` | Search products by title, type, vendor |
| `get_product` | Retrieve product details with variants |
| `list_collections` | List product collections |
| `get_orders` | Retrieve recent orders |
| `get_order` | Get a specific order by ID |
| `get_inventory` | Check inventory levels |
| `list_customers` | List customers |

### Setup Steps

1. Create a custom app in Shopify admin.
2. Configure the Servio manifest endpoint.
3. Generate API credentials.
4. Deploy the manifest to your Shopify app's URL.

## Custom Implementation

Any website can support Servio by implementing the protocol:

| Requirement | Details |
|-------------|---------|
| **Manifest** | JSON file at `/.well-known/servio.json` |
| **HTTPS** | Required for all endpoints |
| **Tool endpoints** | HTTP POST handlers for each tool |
| **Authentication** | Bearer token or OAuth 2.0 + PKCE |
| **Response format** | JSON |

### Minimum Viable Integration

At minimum, you need:

1. A manifest file with one tool defined
2. An API endpoint that handles the tool call
3. Bearer token authentication

See the [Adding Servio to Your Site](/site-owners/adding-servio) guide for a step-by-step implementation.

### Example: Express.js

```javascript
const express = require('express');
const app = express();

// Serve manifest
app.get('/.well-known/servio.json', (req, res) => {
  res.json({
    name: 'My App',
    version: '1.0.0',
    server: { url: 'https://myapp.com/api/servio' },
    auth: { type: 'bearer' },
    tools: [{
      name: 'search_items',
      description: 'Search items by keyword',
      input_schema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search term' }
        },
        required: ['query']
      }
    }]
  });
});

// Handle tool calls
app.post('/api/servio/tools/:toolName', authenticate, (req, res) => {
  const { toolName } = req.params;
  const input = req.body;
  // Process and return results...
  res.json({ results: [...] });
});
```

## Coming Soon

The following platforms are on the Servio integration roadmap:

- **Ghost** — blog platform
- **Discourse** — forum platform
- **WooCommerce** — e-commerce (via WordPress plugin extension)
- **Magento** — enterprise e-commerce
- **MediaWiki** — wiki platform
- **Joomla** — CMS platform
