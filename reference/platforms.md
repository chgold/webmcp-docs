---
title: Supported Platforms
description: Platforms with ready-made Servio integrations — WordPress, XenForo, Drupal, Shopify, Discourse, Ghost, Moodle, NodeBB, PrestaShop, and custom sites.
---

# Supported Platforms

Goldnat works with any website that implements the Servio protocol. Nine platforms have ready-made plugins; custom sites can implement the protocol directly.

## At a Glance

Most platforms offer a free plugin with read-oriented tools and a paid tier that adds write and admin actions. Tool counts below are the number of distinct tools each plugin exposes.

| Platform | Free plugin | Paid tiers | Browse |
|----------|------------|-----------|--------|
| WordPress | 5 tools | Pro (6), WooCommerce (17), Elementor | [wordpress](https://plugins.goldnat.ai/wordpress) |
| XenForo | 7 tools | Pro (66) | [xenforo](https://plugins.goldnat.ai/xenforo) |
| Discourse | 29 tools | Moderator | [discourse](https://plugins.goldnat.ai/discourse) |
| Drupal | 27 tools | — | [drupal](https://plugins.goldnat.ai/drupal) |
| Ghost | 15 tools | Members (21) | [ghost](https://plugins.goldnat.ai/ghost) |
| Moodle | 13 tools | Student (17), Teacher (15) | [moodle](https://plugins.goldnat.ai/moodle) |
| Shopify | 14 tools | — | [shopify](https://plugins.goldnat.ai/shopify) |
| NodeBB | 7 tools | Admin (5) | [nodebb](https://plugins.goldnat.ai/nodebb) |
| PrestaShop | 4 tools | Marketing (8) | [prestashop](https://plugins.goldnat.ai/prestashop) |

Installation guides, pricing, and the current tool list for each plugin live on [plugins.goldnat.ai](https://plugins.goldnat.ai). This page covers what you need once a plugin is installed and you are connecting the site to Goldnat.

## Tool Naming

Tools are namespaced per plugin, not per platform. One platform can expose several namespaces: the free XenForo add-on ships both `xenforo.*` and `translation.*`, its Pro add-on uses `xenforo_pro.*`, and the WooCommerce extension for WordPress uses `woocommerce.*` rather than `wordpress.*`.

```
xenforo.searchThreads
translation.translate
xenforo_pro.createThread
woocommerce.searchProducts
```

When a site is connected to Goldnat, the platform prefixes each tool with the site slug, so the name you see in an allow/deny list looks like `example_com_xenforo_searchThreads`. Use that full form when writing [tool permission patterns](/features/chat#tool-permission-patterns).

## WordPress

| Detail | Value |
|--------|-------|
| **Integration** | Servio Plugin |
| **Installation** | WordPress plugin directory or manual upload |
| **Config** | wp-admin > Settings > Servio |
| **Manifest** | Auto-generated at `/.well-known/servio.json` |
| **Auth** | Bearer token or OAuth 2.0 |

### Available Tools

The free plugin exposes five read tools under `wordpress.*`:

| Tool | Description |
|------|-------------|
| `wordpress.searchPosts` | Search posts by keyword |
| `wordpress.getPost` | Retrieve a single post by ID |
| `wordpress.searchPages` | Search pages by keyword |
| `wordpress.getPage` | Retrieve a single page by ID |
| `wordpress.getCurrentUser` | Identify the authenticated user |

Content creation and media uploads are in the Pro plugin (6 tools). WooCommerce ships as a separate extension with 17 tools under its own `woocommerce.*` namespace, and Elementor as a further extension — see the [WordPress plugin page](https://plugins.goldnat.ai/wordpress).

### Setup Steps

1. Install the plugin from the WordPress plugin directory.
2. Activate it in wp-admin > Plugins.
3. Go to Settings > AI Connect to find your manifest URL and OAuth client definitions.
4. Copy the manifest URL into Goldnat (or any MCP client).
5. Approve access through the OAuth screen on your site.

## XenForo

| Detail | Value |
|--------|-------|
| **Integration** | AI Connect Addon |
| **Installation** | Upload via XenForo admin panel |
| **Config** | Admin > AI Connect > Settings |
| **Manifest** | `/.well-known/servio.json` |
| **Auth** | Bearer token or OAuth 2.0 |

### Available Tools

The free add-on exposes seven tools across two namespaces:

| Tool | Description |
|------|-------------|
| `xenforo.searchThreads` | Search forum threads |
| `xenforo.getThread` | Retrieve a thread with its posts |
| `xenforo.searchPosts` | Search posts across the forum |
| `xenforo.getPost` | Retrieve a single post |
| `xenforo.getCurrentUser` | Identify the authenticated user |
| `translation.translate` | Translate text |
| `translation.getSupportedLanguages` | List available translation languages |

The Pro add-on adds 66 tools under `xenforo_pro.*` — thread and post creation and editing, locking, moving, tagging, polls, reactions, conversations, attachments, alerts, and node administration. See the [XenForo plugin page](https://plugins.goldnat.ai/xenforo) for the full list.

### Setup Steps

1. Download the add-on.
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

Fourteen tools under `shopify.*`, covering catalogue, orders, fulfilment, and reporting:

| Tool | Description |
|------|-------------|
| `shopify.searchProducts` | Search products |
| `shopify.getProduct` | Retrieve product details |
| `shopify.getCollections` | List product collections |
| `shopify.searchOrders` | Search orders |
| `shopify.getOrder` | Get a specific order |
| `shopify.createOrder` | Create an order |
| `shopify.fulfillOrder` | Mark an order fulfilled |
| `shopify.cancelOrder` | Cancel an order |
| `shopify.refundOrder` | Refund an order |
| `shopify.updateInventory` | Adjust inventory levels |
| `shopify.getCustomer` | Retrieve a customer |
| `shopify.createDiscount` | Create a discount |
| `shopify.getAnalytics` | Retrieve store analytics |
| `shopify.getShopInfo` | Retrieve shop configuration |

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

## Roadmap

Not yet available:

- **Magento** — enterprise e-commerce
- **MediaWiki** — wiki platform
- **Joomla** — CMS platform

Ghost, Discourse, Moodle, NodeBB, and PrestaShop have shipped — see the table above. WooCommerce ships as a WordPress extension rather than a standalone plugin.
