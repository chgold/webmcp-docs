# WebMCP Docs — Agent Rules

## FORBIDDEN: API Reference Documentation

WebMCP Master does NOT expose a public API. All endpoints are internal (frontend ↔ backend) and protected by JWT cookies + CSRF tokens. There is no API for third-party developers.

**Do NOT:**
- Create or recreate `reference/api.md` or any API reference page
- Document REST endpoints, request/response formats, or authentication headers
- Add API-related navigation items to `.vitepress/config.ts`
- Reference "API" as a user-facing feature anywhere in the docs

**The API was intentionally removed.** If you believe an API reference is needed, ask the user first.

## What this documentation covers

- **User guides**: How to use the WebMCP Master web application
- **Feature docs**: Chat, vault, agents, workspaces, billing, files, etc.
- **Site owner guides**: How to add WebMCP support to your website
- **Tutorials**: Step-by-step walkthroughs for common workflows
- **Reference**: Error codes, tier features, rate limits, supported platforms
