---
title: What is the WebMCP Protocol
description: Understanding the Web Model Context Protocol — how it connects websites to AI agents, architecture, and benefits for site owners.
---

# What is the WebMCP Protocol

The Web Model Context Protocol (WebMCP) is a standard that allows websites to expose structured tools to AI models. It defines how a site publishes its capabilities, how AI platforms discover them, and how tool calls are authenticated and executed.

## The Problem WebMCP Solves

AI models are powerful at understanding text and reasoning, but they cannot interact with websites on their own. They cannot log in to your forum, search your product catalog, or post a reply. WebMCP bridges this gap by providing a standardized interface between websites and AI platforms.

Without WebMCP:
- Users copy-paste data between their site and an AI chat
- Automation requires custom API integrations for each site
- There is no standard for exposing site capabilities to AI

With WebMCP:
- Sites publish a manifest describing their tools
- AI platforms discover and present these tools automatically
- Users and agents interact with sites through natural language

## How It Differs from Standard MCP

The Model Context Protocol (MCP) was originally designed for desktop applications — a local server running on your machine, exposing tools to a desktop AI client.

WebMCP extends this concept to the **web**:

| Aspect | MCP (Desktop) | WebMCP (Web) |
|--------|---------------|--------------|
| **Hosting** | Local machine | Remote web server |
| **Discovery** | Manual configuration | Manifest at well-known URL |
| **Auth** | Local file system access | OAuth 2.0 + PKCE or Bearer tokens |
| **Scope** | Single user, single machine | Multi-user, multi-site |
| **Tools** | File system, IDE, local apps | Forum threads, store products, CMS content |

## Architecture

The WebMCP architecture has three components:

### 1. The Manifest

A JSON document published by the site at a well-known URL (e.g., `/.well-known/webmcp.json`). It describes:
- Site identity (name, version, description)
- Available tools (name, description, input parameters)
- Authentication method (OAuth endpoints or Bearer token)
- Server endpoint (where tool calls are sent)

### 2. The AI Platform (WebMCP Master)

The platform that reads manifests, presents tools to users, and orchestrates AI-tool interactions:
- Fetches and caches manifests
- Builds a tool registry for each session
- Routes tool calls from the AI to the correct site
- Handles authentication (sending tokens securely)

### 3. The Site

The website that implements the tool endpoints:
- Receives tool call requests from the platform
- Authenticates the request using the provided token
- Executes the operation (read data, create content, etc.)
- Returns a JSON result

### Request Flow

```
User sends message → AI model decides to call a tool
  → Platform validates the tool call (domain, permissions)
  → Platform decrypts the user's token for the site
  → Platform sends the tool call to the site's endpoint
  → Site authenticates and processes the request
  → Site returns a JSON result
  → Platform scans result for injection patterns
  → AI model reads the result and generates a response
  → User sees the answer
```

## Benefits for Site Owners

### Discoverability

By publishing a WebMCP manifest, your site becomes available in the WebMCP Master Directory. Users can find and connect to your site with one click.

### AI-Powered User Experience

Users can interact with your site through natural language instead of navigating complex UIs. An AI can search, create, edit, and analyze data on your site based on conversational instructions.

### Automation

Users can build agents that perform repetitive tasks on your site — monitoring, content creation, moderation, data extraction — without manual intervention.

### No Code Changes to Your Core App

The WebMCP integration is a separate endpoint layer. Your existing application logic, database, and authentication system remain unchanged. You add a manifest file and tool endpoints alongside your existing API.

## Supported Platforms

WebMCP integrations are available for:

| Platform | Integration Method |
|----------|-------------------|
| **WordPress** | WebMCP plugin (installable from wp-admin) |
| **XenForo** | AI Connect addon |
| **Drupal** | WebMCP module |
| **Shopify** | Custom app |
| **Custom** | Any site that implements the manifest and tool endpoints |

See [Adding WebMCP to Your Site](/site-owners/adding-webmcp) for platform-specific setup guides.
