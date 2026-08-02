---
title: File Manager
description: Upload, organize, download, and share files on Goldnat. AI agents can read and create files on your behalf.
---

# File Manager

The File Manager lets you upload files, organize them in folders, share via public links, and let AI agents read and create files. Access it from **Files** in the sidebar.

## Uploading Files

1. Go to **Files**.
2. Click **Upload** or drag and drop files onto the page.
3. Select up to 10 files per upload.

Files can also be attached in the Chat — drag files onto the chat input or click the attachment button.

### Supported Formats

| Category | Extensions |
|----------|-----------|
| Images | .jpg, .jpeg, .png, .gif, .webp, .svg |
| Documents | .pdf, .docx, .xlsx, .pptx, .txt, .rtf, .csv |
| Code | .py, .js, .ts, .jsx, .tsx, .java, .go, .rs, .rb, .php, .html, .css, .scss, .json, .yaml, .yml, .xml, .md |
| Archives | .zip, .tar, .gz |
| Audio | .mp3, .wav, .ogg, .m4a |

Executable files (.exe, .bat, .sh, .dll, etc.) are blocked for security.

### Validation

Every upload goes through three checks:

1. **Extension whitelist** — only allowed file types are accepted
2. **MIME type verification** — file content is inspected to prevent disguised executables
3. **Quota check** — file size, total storage, and file count are verified against your plan limits

## Storage Limits

| | Free | Pro | Harness | Team |
|--|------|-----|---------|------|
| Max file size | 10 MB | 10 MB | 10 MB | 10 MB |
| Total storage | 100 MB | 100 MB | 100 MB | 100 MB |
| Max files | 50 | 50 | 50 | 50 |

::: tip
Storage limits are configured per pricing tier by the admin. The values above are defaults — your plan may have different limits.
:::

## Browsing Files

The Files page supports two views:

- **Grid view** — thumbnails for images, icons for other file types
- **List view** — compact table with name, type, size, and date

Use the **search bar** to find files by name, or the **type filter** to show only images, documents, code, archives, or audio.

## Folders

Organize files into a folder tree:

- **Create** — click **New Folder** and enter a name
- **Nested folders** — use path syntax `reports/2026/q2` to create multiple levels at once
- **Navigate** — click a folder to enter it, use breadcrumbs to go back
- **Move files** — drag files onto a folder card or onto a breadcrumb item to move them up the tree
- **Rename** — right-click a folder and select Rename
- **Delete** — deleting a folder moves its files to the parent folder (files are not deleted)

Drag-and-drop supports moving multiple selected files at once. Search scans all folders, not just the current one.

## File Preview

Click a file to open the preview panel:

- **Images** — displayed inline with thumbnail
- **Audio** — playback controls
- **Text and code files** — content preview (first 200 lines)
- **PDF and Excel** — metadata displayed (use download for full content)

## Downloading Files

- Click the **download** button on any file in the file list or preview panel.
- In chat, AI-generated files appear as clickable download chips.

## Sharing Files

### Workspace Sharing

Upload files with a workspace selected — all workspace members can view and download them. Only the file owner can delete or update.

### Public Share Links

Share individual files with anyone via a public link:

1. Click the share icon on a file.
2. Toggle sharing **on** — a unique link is generated.
3. Copy the link. Anyone with it can download the file without logging in.

Public files are served at `/api/files/public/:shareToken` (no authentication required). Toggle sharing off at any time to revoke access.

## Renaming Files

Right-click a file and select **Rename** to change its display name.

## Deleting Files

Select one or more files and click **Delete**. Files are soft-deleted — they disappear from the list but are not immediately removed from disk.

## Chat Integration

Attach files to chat messages:

1. In the Chat, click the attachment button or drag files onto the input.
2. Files are uploaded before the message is sent.
3. The AI can see attached files and use file tools to read their content.

AI-generated files appear as clickable download chips in the chat.

## AI File Tools

AI agents have 5 built-in tools for working with your files:

| Tool | What it does |
|------|-------------|
| **file_list** | Lists your files with optional type/name filtering |
| **file_read** | Reads file content — text files directly, Excel as CSV tables, PDF as extracted text |
| **file_read_url** | Provides a download link you can click in the chat |
| **file_write** | Creates a new file — text, Excel (.xlsx from JSON), or PDF (from text) |
| **file_update** | Overwrites an existing text file with automatic backup of the previous version |

### How to use file tools in chat

Ask the AI naturally:

- *"What files do I have?"* → agent calls `file_list`
- *"Read my config.json"* → agent calls `file_list` then `file_read`
- *"Analyze the data in report.xlsx"* → agent reads Excel as CSV tables
- *"Create a Python script that processes CSV"* → agent calls `file_write`
- *"Fix the bug in my script"* → agent reads, fixes, and calls `file_update`

### Format support

| Format | Read | Write |
|--------|------|-------|
| Text (.txt, .md, .json, .csv, .py, .js, etc.) | Content directly | Raw text |
| Excel (.xlsx) | All sheets as CSV tables | JSON array → spreadsheet |
| PDF | Extracted text from all pages | Plain text → PDF document |
| SVG | XML source | Raw XML |
| Images, archives, audio | Metadata only | Not supported |

::: warning
File tools only access files owned by you (or shared in your workspace). The AI cannot access other users' files.
:::
