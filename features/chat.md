---
title: Chat Interface
description: How to use the WebMCP Master chat — sessions, streaming, tool calls, conversation history, and keyboard shortcuts.
---

# Chat Interface

The Chat is the primary way to interact with AI models on WebMCP Master. You create a session, select a model and one or more connected sites, then converse with the AI. The AI can call tools on your sites, generate artifacts, and maintain context across a multi-turn conversation.

## Creating a Session

1. Navigate to **Chat** in the sidebar.
2. Click **New Session**.
3. **Select a model** — choose from available models (Claude Sonnet 4, GPT-4o, Gemini 2.5 Pro, etc.). The credit cost per 1K tokens is displayed next to each model.
4. **Select sites** — check individual sites from your vault, or select a site group. You can also start a chat without any sites for a pure AI conversation.
5. Click **Start Chat**.

The session persists until you create a new one. You can switch between the current session and previous conversations at any time.

::: tip
You can chat without any sites selected. This gives you a standard AI conversation with no tool-calling capability — useful for brainstorming, writing, or general questions.
:::

## Sending Messages and SSE Streaming

Type your message in the input field and press **Enter** to send. The AI response streams in real time via Server-Sent Events (SSE). You see tokens appear as they are generated, with no waiting for the full response.

While the AI is responding:
- The input field is disabled
- A streaming indicator appears
- You can scroll up to read previous messages

Each message shows the model used and the number of credits consumed.

## Tool Calls

When the AI needs information from a connected site or wants to perform an action, it invokes a **tool call**. This is the core power of WebMCP Master.

### What a Tool Call Looks Like

During a conversation, tool calls appear as collapsible blocks showing:

- The tool name (e.g., `community_search_threads`)
- The parameters sent to the site
- The result returned by the site

The AI processes the tool result and includes it in its response. A single message can involve multiple sequential tool calls if the AI needs to gather data from several sources or perform a multi-step operation.

### How Tool Calls Work

1. You send a message (e.g., "Show me recent support tickets").
2. The AI identifies the relevant tool from the connected site's manifest.
3. The platform sends the tool call request to the site with your encrypted token.
4. The site returns a result (JSON data).
5. The result is scanned for prompt injection patterns (security check).
6. The AI reads the result and formulates a human-readable response.

### Multi-Round Tool Calls

The chat supports an **agentic loop**: the AI can make a tool call, read the result, decide it needs more information, and make another tool call — all within a single response. This loop continues until:

- The AI has enough information to answer
- The maximum agentic loop count is reached (default: 5 rounds)
- A 90-second timeout is hit per round

### Tool Security

Every tool call goes through three security checks:

1. **Site whitelist** — the tool must belong to a site selected in the session
2. **Domain validation** — the tool endpoint must match the site's domain
3. **Result sanitization** — tool results are scanned for prompt injection patterns before being sent back to the AI

## File Attachments

You can attach files to any message by dragging and dropping them onto the chat input, or by clicking the attachment icon.

**Supported formats:** text files, source code, images, PDFs, Excel spreadsheets, audio files, and archives (zip, tar).

File size and count limits depend on your plan. Files are stored in your account and accessible from the **Files** page in the sidebar.

### AI File Tools

The AI has five built-in tools for working with files in your account:

| Tool | Description |
|------|-------------|
| `file_list` | List files and folders in your account |
| `file_read` | Read a file's contents |
| `file_read_url` | Read a file from a public URL |
| `file_write` | Create a new file |
| `file_update` | Overwrite an existing file |

**`file_read`** handles different formats automatically: text files are returned as-is, Excel files (.xlsx) are converted to CSV tables, and PDFs are returned as extracted text.

**`file_write`** can create text files directly, generate Excel files from JSON data, or produce PDFs from plain text.

**`file_update`** overwrites a text file with new content and creates an automatic backup of the previous version.

## Conversation History

### Sidebar

The left sidebar shows all your conversations. Each entry displays:
- Conversation title (auto-generated or renamed by you)
- Model used
- Number of messages
- Last activity timestamp

### Conversation Groups

Organize conversations into groups:
1. Click the menu icon on a conversation.
2. Select **Move to Group** or **New Group**.
3. Name the group and assign a color.

Groups appear as collapsible sections in the sidebar. Ungrouped conversations appear under "Ungrouped."

### Search

Use the search bar at the top of the sidebar to filter conversations by title.

## Session Settings

Click **Change** in the session header to modify the active session:

- **Model** — switch to a different AI model mid-conversation
- **Sites** — add or remove sites from the session
- **Tool Allow List** — restrict the AI to only specific tools (empty = all allowed)
- **Tool Deny List** — block specific tools from being called

::: warning
Adding a site mid-session makes its tools available immediately. Removing a site prevents further tool calls to it but does not delete previous results from the conversation.
:::

### Tool Permission Patterns

Allow and deny lists support wildcard patterns:

| Pattern | Matches |
|---------|---------|
| `community_*` | All tools from the "community" site prefix |
| `store_get_*` | Only read-type tools from the "store" site |
| `*_delete_*` | Any delete tool from any site |

The deny list takes precedence over the allow list when both match.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line in message |
| `Escape` | Cancel streaming response |

## Credit Usage in Chat

Credits are deducted after each AI response completes. The cost depends on:
- The model selected
- Input tokens (your message + conversation history + system prompt)
- Output tokens (the AI's response)
- Tool call overhead (additional tokens from tool results fed back to the AI)

If your balance reaches zero mid-conversation, you will see a prompt to purchase credits before continuing.

## Tips

- Keep conversations focused on a single topic — this reduces context length and credit costs.
- Use the deny list to prevent the AI from calling destructive tools (e.g., delete operations).
- For complex tasks across multiple sites, consider using an [Agent](/features/agents) instead.
