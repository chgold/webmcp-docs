# Goldnat Docs — Agent Rules

## Interfaces: document only what goldnat exposes on purpose

Goldnat's web app talks to its backend through an **internal** API (JWT cookies + CSRF). That API is not a product and is never documented.

Some interfaces **are** exposed on purpose to outside systems, and those are documented in full — URL, authentication, parameters, request and response formats, errors:

- **Org API** (`/api/org/v1`, workspace Org API keys) — `organizations/org-api.md`
- **SCIM 2.0** (`/api/scim/v2`, workspace SCIM tokens) — `organizations/scim.md`
- **Single sign-on** endpoints an identity provider is configured with (OIDC redirect URI, SAML ACS, entity ID, SP metadata) — `organizations/sso.md`
- **Outgoing** formats goldnat sends to customers' systems: audit streaming (webhook signature, Splunk HEC, Datadog) — `organizations/audit-log.md`; agent webhook triggers — `guides/webhooks.md`
- **Servio** (what site owners implement) — `site-owners/`

**Do NOT:**
- Create `reference/api.md` or any page describing the internal app API (`/api/agents`, `/api/workspaces`, `/api/chat`, …)
- Add an interface to the list above without the user's approval — "it exists" is not enough; it must be deliberately offered to outside systems

## What this documentation covers

- **User guides**: How to use the Goldnat web application
- **Feature docs**: Chat, vault, agents, workspaces, billing, files, etc.
- **Organizations**: Security & governance — inventory, tool policies, audit log, Org API, SSO, SCIM, managed accounts
- **Site owner guides**: How to add Servio support to your website
- **Tutorials**: Step-by-step walkthroughs for common workflows
- **Reference**: Error codes, tier features, rate limits, supported platforms

## Keeping it current

Every user-visible change in the platform repo lands in these docs in the same round. Labels in the docs match the English UI strings (`frontend/src/i18n/en.ts`) exactly.
