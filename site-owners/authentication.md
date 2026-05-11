---
title: Authentication
description: Implement authentication for your WebMCP site — OAuth 2.0 with PKCE, Bearer tokens, scopes, and security best practices.
---

# Authentication

Authentication ensures that tool calls from WebMCP Master are authorized to access your site's data. WebMCP supports two authentication methods: Bearer tokens and OAuth 2.0 with PKCE.

## OAuth 2.0 with PKCE (Recommended)

OAuth is the recommended authentication method for production WebMCP sites. It provides per-user tokens, automatic refresh, and granular scopes.

### Flow Overview

1. User clicks **Connect** in the WebMCP Master Directory.
2. WebMCP Master redirects the user to your site's authorization URL with a PKCE challenge.
3. The user logs in on your site and approves the requested scopes.
4. Your site redirects back with an authorization code.
5. WebMCP Master exchanges the code for an access token and refresh token.
6. Tokens are encrypted and stored in the user's vault.

### Setting Up the Authorization Endpoint

Your site needs an authorization endpoint that:

1. Accepts these query parameters:

| Parameter | Description |
|-----------|-------------|
| `response_type` | Always `code` |
| `client_id` | The WebMCP Master client ID |
| `redirect_uri` | The callback URL on WebMCP Master |
| `scope` | Requested scopes (e.g., `read write`) |
| `state` | Anti-CSRF token |
| `code_challenge` | PKCE challenge (SHA-256 hash) |
| `code_challenge_method` | Always `S256` |

2. Displays a login/consent screen to the user.
3. After approval, redirects to `redirect_uri` with `code` and `state` parameters.

### Setting Up the Token Endpoint

Your token endpoint exchanges authorization codes for access tokens:

**Request:**
```
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=<authorization_code>
&redirect_uri=<redirect_uri>
&client_id=<client_id>
&code_verifier=<pkce_verifier>
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2g...",
  "scope": "read write"
}
```

### Token Refresh

When the access token expires, WebMCP Master sends a refresh request:

**Request:**
```
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token=<refresh_token>
&client_id=<client_id>
```

**Response:**
```json
{
  "access_token": "new-access-token...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "new-refresh-token..."
}
```

Always issue a new refresh token with each refresh request (refresh token rotation).

## Scopes

Scopes define what operations a token authorizes:

| Scope | Allows |
|-------|--------|
| `read` | Reading data (search, get, list operations) |
| `write` | Creating and editing content |
| `delete` | Deleting content |
| `admin` | Administrative operations (user management, settings) |

Define scopes in your manifest:

```json
"auth": {
  "type": "oauth2",
  "authorization_url": "https://yoursite.com/oauth/authorize",
  "token_url": "https://yoursite.com/oauth/token",
  "scopes": ["read", "write", "delete", "admin"]
}
```

WebMCP Master requests only the scopes needed for the tools in the session. If a user selects only read-type tools, only the `read` scope is requested.

## Bearer Token Authentication

For simpler integrations, Bearer token authentication requires no OAuth flow. The user manually generates a token on your site and pastes it into the WebMCP Master vault.

### How It Works

1. Your site provides a mechanism for users to generate API tokens (e.g., a settings page).
2. The user copies the token and pastes it into WebMCP Master's vault.
3. On every tool call, WebMCP Master sends the token in the `Authorization` header:

```
POST /api/webmcp/tools/search_threads
Authorization: Bearer <user-token>
Content-Type: application/json

{"query": "login issues"}
```

4. Your site validates the token, identifies the user, and checks permissions.

### Token Validation

On your site, validate each incoming request:

```python
# Example (Python/Flask)
@app.route('/api/webmcp/tools/<tool_name>', methods=['POST'])
def handle_tool_call(tool_name):
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    
    user = validate_token(token)
    if not user:
        return jsonify({"error": "Invalid token"}), 401
    
    if not user.has_permission(tool_name):
        return jsonify({"error": "Insufficient permissions"}), 403
    
    # Process the tool call...
```

## Security Best Practices

### Token Expiry

- **Access tokens**: expire after 1 hour (3600 seconds)
- **Refresh tokens**: expire after 30 days, or after single use (rotation)
- **Bearer tokens**: set an expiry date or allow users to revoke manually

### HTTPS Only

All authentication endpoints and tool endpoints must use HTTPS. WebMCP Master does not connect to HTTP endpoints.

### Rate Limiting

Implement rate limiting on your tool endpoints:
- Per-token: 60 requests per minute
- Per-IP: 200 requests per minute
- Return HTTP 429 with a `Retry-After` header when limits are exceeded

### Token Storage on Your Side

- Store tokens hashed (for lookup) or encrypted (for value retrieval)
- Never log raw token values
- Implement token revocation (users should be able to invalidate tokens)

### Validating the Platform

To verify that requests come from WebMCP Master and not an unauthorized source:
- Check the `User-Agent` header for the WebMCP Master identifier
- Optionally implement IP allowlisting for WebMCP Master's server IPs
- Use webhook signatures for webhook-style integrations
