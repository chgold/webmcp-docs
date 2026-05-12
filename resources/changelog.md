---
title: Changelog
description: WebMCP Master release history — new features, improvements, bug fixes, and deprecations.
---

# Changelog

All notable changes to WebMCP Master are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/). Dates are in YYYY-MM-DD format.

## [3.3.0] - 2026-05-12

### Added
- **Paddle Billing** — migrated from LemonSqueezy + Stripe to Paddle as sole payment processor. Paddle handles subscriptions, credit purchases, and payment methods via overlay checkout.
- **File management system** — upload, organize, download, and share files. Supports folders, workspace sharing, bulk operations, and drag-and-drop.
- **Agent file tools** — 5 built-in tools for AI agents: file_list, file_read, file_read_url, file_write, file_update. Supports Excel (.xlsx) and PDF extraction/creation.
- **Documentation site** — VitePress docs at docs.webmcp-master.ai with 38 pages covering all platform features.
- **Legal pages** — Terms of Service v3.0 (24 sections), Privacy Policy v2.0 (20 sections), Refund Policy (6 sections).

### Changed
- Chat UI redesigned with improved layout and RTL support.
- Pricing page works without authentication.
- Auto top-up now requires an active subscription (Paddle manages payment methods).

### Removed
- Stripe integration (replaced by Paddle).
- LemonSqueezy integration (replaced by Paddle).
- Manual payment method management (Paddle handles via checkout overlay).

### Fixed
- Production deployment: trust proxy for nginx, configurable OAuth callback URL, explicit dotenv dependency.
- Build: separate tsconfig.build.json for production (relaxed strict mode), test files excluded from build.

## [3.2.0] - 2026-05-01

### Added
- **Workspace notifications** — configurable alerts for agent runs that require input, with options for triggerer-only, all members, or specific user groups.
- **Outgoing webhooks** (Team plan) — agents can now send HTTP requests to external services when runs complete.
- **Webhook schema builder** — define expected payload structures for incoming webhook-triggered agents.
- **Group permission blocks** — workspace managers can disable group-inherited permissions for specific users.
- **Auto top-up monthly limit** — cap automatic credit purchases per calendar month.

### Changed
- Agent run timeline now shows token counts per step.
- Improved SSE streaming stability for long-running conversations.
- Credit breakdown on the Billing page now shows expiry dates for each credit source.
- Updated the pricing page with clearer feature comparison.

### Fixed
- Fixed an issue where OAuth token refresh could fail silently, leaving expired tokens in the vault.
- Fixed conversation groups not displaying in the correct order after renaming.
- Fixed analytics chart rendering when switching date ranges rapidly.
- Fixed agent cancellation not taking effect until the next round.

## [3.1.0] - 2026-04-01

### Added
- **User groups** — create groups to assign the same permissions to multiple users across workspaces.
- **Personal system prompt** — set a custom prompt applied to all new chat sessions (Pro plan and above).
- **Workspace AI keys** — add provider API keys at the workspace level, separate from personal BYOK keys.
- **Agent templates gallery** — pre-built agent configurations for common use cases (content monitor, forum moderator, data summarizer).
- **Conversation search** — filter sidebar conversations by title.

### Changed
- Redesigned the Billing page with credit tracking breakdown.
- Improved tool deny list matching with wildcard support.
- Agent run detail page now supports real-time step streaming.

### Fixed
- Fixed BYOK keys not being used for workspace agents.
- Fixed conversation title not auto-generating for the first message.
- Fixed rate limiter counting failed requests toward the quota.

## [3.0.0] - 2026-03-01

### Added
- **Team workspaces** — shared environments with role-based permissions, shared vault tokens, and workspace agents.
- **Workspace agent runs** — run and monitor agents as a team with unified run history.
- **BYOK support** for OpenRouter and Ollama providers.
- **Tool execution monitor** — view detailed tool call execution logs (Harness plan and above).
- **Conversation groups** — organize chats into named, color-coded groups.

### Changed
- Migrated payment processing from LemonSqueezy to Stripe for better card management and auto top-up support.
- Upgraded to Node.js 20.
- Increased max agent rounds from 10 to 20.
- Improved manifest validation with more descriptive error messages.

### Removed
- Removed legacy LemonSqueezy billing endpoints (replaced by Stripe integration).
- Removed the deprecated `/api/v1/*` endpoint prefix.

### Fixed
- Fixed multi-round tool calls failing with non-Anthropic adapters (known limitation documented).
- Fixed credit deduction race condition when multiple sessions are active.
- Fixed vault token encryption not using unique IVs per token.

## [2.5.0] - 2026-02-01

### Added
- **Scheduled agents** — trigger agents on a cron schedule (Harness plan and above).
- **Webhook-triggered agents** — trigger agents from external systems via HTTP POST.
- **Auto top-up** — automatic credit purchase when balance drops below a threshold.
- **Analytics dashboard** — usage charts, per-model breakdowns, and cost tracking.

### Changed
- Increased rate limit from 200 to 500 requests per 15 minutes.
- Improved SSE streaming performance with chunked encoding.

### Fixed
- Fixed agent runs not deducting credits atomically.
- Fixed session Redis cache not being invalidated on tool permission changes.

## [2.0.0] - 2026-01-01

### Added
- **Autonomous agents** — create agents with system prompts that run multi-round tool call loops.
- **Site groups** — organize sites into groups with per-group tool deny lists.
- **BYOK** — bring your own Anthropic or OpenAI API key.
- **Artifact system** — AI-generated files (HTML, code, CSV) displayed in a side panel.
- **Credit packages** — purchase additional credits as one-time packages.

### Changed
- Redesigned the chat interface with improved conversation sidebar.
- Moved from per-message pricing to token-based credit system.

## [1.0.0] - 2025-11-01

### Added
- Initial release of WebMCP Master.
- Google OAuth sign-in.
- Site vault with AES-256-GCM encryption.
- Chat interface with SSE streaming.
- Multi-model support: Anthropic, OpenAI, Google Gemini.
- Agentic chat loop (multi-round tool calls).
- Site Directory with registration and verification.
- Free, Pro, and Harness subscription tiers.
