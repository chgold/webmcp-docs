---
title: "Tutorial: Auto-translate Forum Posts"
description: Step-by-step tutorial to create a webhook-triggered agent that translates new forum posts and posts the translation.
---

# Auto-translate Forum Posts

In this tutorial, you will create a webhook-triggered agent that automatically translates new forum posts into another language and posts the translation as a reply.

**Time:** 20 minutes
**Requirements:** Harness plan or higher, one connected forum site with webhook support

## What You Will Build

A webhook-triggered agent that:
1. Receives a notification when a new post is created on your forum
2. Reads the original post
3. Translates it to the target language
4. Posts the translation as a reply in the same thread

## Step 1: Connect Your Forum

Ensure your forum site is connected in the vault with tools that include:
- `get_thread` or `get_post` — to read posts
- `create_post` — to post translations

## Step 2: Create the Agent

1. Go to **Agents** > **New Agent**.
2. Configure:

| Field | Value |
|-------|-------|
| **Name** | Post Translator (EN to ES) |
| **Description** | Translates new English posts to Spanish |
| **Model** | Claude Haiku 4.5 (cost-effective for translation) |
| **Sites** | Your forum site |
| **Max Rounds** | 3 |
| **Trigger** | Webhook |

3. Enter the system prompt:

```
You are a translation assistant for our bilingual community forum.

TASK:
When a new post is created (provided in the webhook payload):
1. Read the post content using the get_thread tool with the 
   provided thread_id.
2. Translate the post content from English to Spanish.
3. Post the translation as a reply using the create_post tool.

TRANSLATION RULES:
- Maintain the original formatting (paragraphs, lists, bold, etc.)
- Preserve technical terms, product names, and URLs unchanged.
- Add a note at the top: "[Translated from English]"
- If the post is already in Spanish, do NOT translate. 
  Just output "Post is already in Spanish — skipping."

USE THE WEBHOOK DATA:
- thread_id: from the webhook payload
- post_id: from the webhook payload (for reference)
```

4. Click **Create**.
5. Copy the **Webhook URL** and **Webhook Secret** that appear after saving.

## Step 3: Configure the Webhook Schema

In the agent editor, define the expected webhook payload:

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | Event type (e.g., "new_post") |
| `thread_id` | number | The thread containing the new post |
| `post_id` | number | The new post ID |
| `author` | string | Post author username |
| `content_preview` | string | First 200 characters of the post |

## Step 4: Configure Your Forum's Webhook

In your forum's admin panel (the exact steps depend on your platform):

1. Navigate to the webhook or notification settings.
2. Add a new webhook:
   - **URL**: the agent's webhook URL from Step 2
   - **Secret**: the webhook secret from Step 2 (sent as `X-Webhook-Secret` header)
   - **Events**: new post created
   - **Content Type**: `application/json`

3. Configure the payload to match the schema:

```json
{
  "event": "new_post",
  "thread_id": 12345,
  "post_id": 67890,
  "author": "john_doe",
  "content_preview": "Hello everyone, I wanted to share..."
}
```

## Step 5: Test the Integration

### Manual Test with curl

```bash
curl -X POST "https://goldnat.ai/api/webhooks/agent/YOUR_AGENT_ID" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: YOUR_SECRET" \
  -d '{
    "event": "new_post",
    "thread_id": 12345,
    "post_id": 67890,
    "author": "test_user",
    "content_preview": "This is a test post for translation."
  }'
```

### Check the Run

1. Go to **Agents > Post Translator > Runs**.
2. Verify the run:
   - Status: Done
   - Steps: read the post, translate, post the reply
   - Credit usage: typically 1-3 credits with Claude Haiku 4.5

### Verify on the Forum

Check the forum thread to confirm the translated reply was posted with the "[Translated from English]" header.

## Step 6: Handle Edge Cases

Update the system prompt to handle:

- **Already translated posts**: Check if a translation reply already exists before creating a duplicate.
- **Non-English posts**: Detect the language first; only translate English posts.
- **Very long posts**: If the post exceeds 5,000 characters, summarize and translate.
- **Posts with images**: Note that images cannot be translated; preserve image references as-is.

## Cost Estimate

Using Claude Haiku 4.5 with 3 max rounds:
- Per translation: approximately 0.5-1.5 credits
- At 50 new posts per day: ~25-75 credits/day (~750-2,250 credits/month)

::: tip
Claude Haiku 4.5 provides excellent translation quality at very low cost. Switching to a more expensive model is unnecessary for most translation tasks.
:::

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Webhook returns 401 | Verify the webhook secret matches exactly |
| Agent does not post the reply | Check that the `create_post` tool is not on the deny list |
| Duplicate translations | Add a check in the prompt to look for existing translation replies |
| Wrong language detected | Add explicit language detection instructions to the prompt |
