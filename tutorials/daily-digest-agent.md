---
title: "Tutorial: Daily Digest Agent"
description: Step-by-step tutorial to create a scheduled agent that summarizes daily activity from your site.
---

# Daily Digest Agent

In this tutorial, you will create a scheduled agent that runs every morning, summarizes the previous day's activity on your site, and outputs the digest as a Markdown artifact.

**Time:** 15 minutes
**Requirements:** Harness plan or higher, one connected site

## What You Will Build

A scheduled agent that:
1. Runs daily at 8:00 AM
2. Queries your site for all activity from the previous 24 hours
3. Generates a structured daily digest
4. Outputs the digest as a Markdown artifact (optionally posts it to the site)

## Step 1: Create the Agent

1. Go to **Agents** > **New Agent**.
2. Configure:

| Field | Value |
|-------|-------|
| **Name** | Daily Activity Digest |
| **Description** | Summarizes yesterday's site activity each morning |
| **Model** | Claude Haiku (cost-effective for summarization) |
| **Sites** | Your forum or CMS site |
| **Max Rounds** | 4 |
| **Trigger** | Scheduled |

3. Set the schedule:
   - Preset: **Every day at 09:00** (or use custom cron: `0 8 * * *` for 8:00 AM)

4. Enter the system prompt:

```
You are a daily digest assistant for our community site.

TASK:
Generate a daily activity summary for the previous 24 hours.

STEPS:
1. Search for all new threads/posts created yesterday 
   (sort by date, limit 50).
2. Identify key metrics:
   - Total new threads created
   - Total new replies posted
   - Most active thread (highest reply count)
   - Most active users
3. Identify notable content:
   - Threads with 5+ replies (trending)
   - Threads with zero replies (need attention)
   - Any threads tagged "urgent" or "bug"

OUTPUT FORMAT (Markdown):
# Daily Digest — [Date]

## Key Metrics
- New threads: [count]
- New replies: [count]
- Active users: [count]

## Trending Threads
[List threads with 5+ replies, with title and reply count]

## Needs Attention
[List threads with 0 replies older than 12 hours]

## Notable Activity
[Summary of interesting discussions or events]

## Action Items
[Suggestions for the team based on the data]
```

5. Click **Create**.

## Step 2: Run a Manual Test

Before enabling the schedule, test the agent:

1. Click **Run Now** on the agent card.
2. Monitor the run in real time.
3. Review the output digest.

Check that:
- The agent successfully calls the search/list tools
- The digest contains accurate data
- The format matches your expectations
- Credit usage is reasonable (should be 2-5 credits with Claude Haiku)

## Step 3: Review the Output

A successful run produces output like:

```markdown
# Daily Digest — May 10, 2026

## Key Metrics
- New threads: 23
- New replies: 147
- Active users: 42

## Trending Threads
1. "New feature announcement: Dark mode" — 18 replies
2. "Best practices for API integration" — 12 replies
3. "Community meetup planning" — 9 replies

## Needs Attention
1. "Login error on Safari" — 0 replies, posted 18 hours ago
2. "Payment gateway timeout" — 0 replies, posted 14 hours ago

## Notable Activity
- A lively discussion in the "Feature Requests" category 
  about mobile app improvements, with 3 threads receiving 
  significant engagement.
- New user "alice_dev" posted 5 helpful replies in the 
  Support category.

## Action Items
- Respond to "Login error on Safari" — potential bug report
- Acknowledge "Payment gateway timeout" — may indicate a 
  service issue
- Consider featuring the dark mode thread in the newsletter
```

## Step 4: Refine and Enable Scheduling

After verifying the output:

1. Adjust the prompt if needed (more sections, different format, specific metrics).
2. The schedule is already configured — the agent will run automatically at the set time.
3. Check runs the next morning to confirm automated execution.

## Optional: Post the Digest to Your Site

Modify the system prompt to add a final step:

```
4. After generating the digest, post it as a new thread in 
   the "Daily Digests" category using the create_thread tool.
   Title: "Daily Digest — [Date]"
   Content: The full digest in Markdown format.
```

This requires the `create_post` or `create_thread` tool to be available and not on the deny list.

## Optional: Webhook Notification

If you want to receive the digest via an external system (Slack, email, etc.), you can create a second agent triggered by the first one's output, or configure your site to send a webhook when a new thread is created in the "Daily Digests" category.

## Cost Estimate

Using Claude Haiku with 4 max rounds:
- Per run: approximately 2-5 credits
- Daily schedule: 2-5 credits/day
- Monthly: 60-150 credits/month

This is one of the most cost-effective agent patterns.

## Variations

### Weekly Digest

Change the cron schedule to `0 9 * * 1` (every Monday at 9:00 AM) and update the prompt to cover the past 7 days.

### Category-Specific Digest

Create multiple agents, each focused on a specific category (Support, Feature Requests, General). Use different prompts tailored to each category's needs.

### Multi-Site Digest

Select multiple sites and update the prompt to summarize activity across all of them. This is useful for organizations managing several communities.
