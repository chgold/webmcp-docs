---
title: "Tutorial: Build a Customer Support Bot"
description: Step-by-step tutorial to create an agent that monitors a forum for unanswered support questions and drafts responses.
---

# Build a Customer Support Bot

In this tutorial, you will create an autonomous agent that monitors a community forum for unanswered support questions, drafts helpful responses, and presents them for your review.

**Time:** 15 minutes
**Requirements:** Pro plan or higher, one connected forum site

## What You Will Build

An agent that:
1. Searches the forum for threads tagged "support" with zero replies
2. Reads each thread to understand the question
3. Drafts a helpful response based on the thread content
4. Outputs all drafts as a report for human review (does not post automatically)

## Step 1: Connect Your Forum

If you have not already connected your forum:

1. Go to **Sites** > **Add Site**.
2. Enter the forum URL and paste your API token.
3. Verify the connection — you should see tools like `search_threads`, `get_thread`, etc.

## Step 2: Create the Agent

1. Go to **Agents** > **New Agent**.
2. Fill in the configuration:

| Field | Value |
|-------|-------|
| **Name** | Support Response Drafter |
| **Description** | Finds unanswered support threads and drafts responses |
| **Model** | Claude Sonnet 4 (or your preferred model) |
| **Sites** | Select your forum site |
| **Max Rounds** | 5 |
| **Trigger** | Manual (for testing; change to Scheduled later) |

3. Enter the system prompt:

```
You are a customer support assistant for our community forum.

TASK:
1. Search for threads in the "Support" category that were 
   created in the last 24 hours and have zero replies.
2. For each unanswered thread (up to 5):
   a. Read the full thread content.
   b. Draft a helpful, professional response that:
      - Acknowledges the user's issue
      - Provides a clear solution or troubleshooting steps
      - Offers to follow up if the issue persists
3. Output a Markdown report with all drafted responses.

RULES:
- Do NOT post any replies. Only draft them for review.
- Be polite and professional in all drafts.
- If a thread is unclear, note what clarification is needed.
- If you cannot find any unanswered threads, report that.

OUTPUT FORMAT:
For each thread, output:
- Thread title and URL
- Author and creation date
- Summary of the question
- Your drafted response
- Confidence level (high/medium/low)
```

4. Click **Create**.

## Step 3: Run a Test

1. On the Agents page, click **Run Now** next to your new agent.
2. Go to **Agents > Support Response Drafter > Runs**.
3. Click the active run to watch it in real time.

You will see the agent:
1. Call `search_threads` with parameters for the Support category and zero replies.
2. Call `get_thread` for each unanswered thread found.
3. Generate a Markdown report with drafted responses.

## Step 4: Review the Output

The run timeline shows each step. The final step contains the agent's output — a report like:

```markdown
# Support Response Drafts — May 11, 2026

## Thread: "Cannot reset my password"
- Author: user_jane | Created: 2026-05-11 08:15
- Question: User is unable to receive the password reset email.

**Drafted Response:**
Hi Jane, sorry to hear you are having trouble with the password 
reset. Here are a few things to check:

1. Look in your spam/junk folder for the reset email.
2. Make sure you are using the email address associated with 
   your account.
3. Try requesting the reset again — sometimes there is a delay.

If none of these help, let me know and I can assist further.

- Confidence: High

---

## Thread: "API rate limiting errors"
- Author: dev_bob | Created: 2026-05-11 09:30
- Question: Getting 429 errors when calling the API rapidly.

**Drafted Response:**
Hi Bob, the API has a rate limit of 60 requests per minute. 
If you are hitting 429 errors, consider:

1. Adding a delay between requests (1 second minimum).
2. Implementing exponential backoff on retries.
3. Batching requests where possible.

See our API docs for the full rate limit details.

- Confidence: High
```

## Step 5: Set Up Scheduling

Once you are satisfied with the output quality:

1. Edit the agent.
2. Change the trigger to **Scheduled**.
3. Select a schedule preset — for example, **Every hour** or a custom cron expression like `0 */2 * * *` (every 2 hours).
4. Save.

The agent will now run automatically and produce reports at the scheduled interval.

## Step 6: Monitor and Iterate

- Check **Agents > Support Response Drafter > Runs** periodically to review drafts.
- Monitor credit consumption in **Analytics**.
- Adjust the system prompt based on the quality of drafts:
  - If drafts are too generic, add more context about your product
  - If the agent is reading too many threads, reduce the limit in the prompt
  - If responses need a specific tone, add tone guidelines to the prompt

## Cost Estimate

With Claude Sonnet 4 and 5 max rounds:
- Per run: approximately 10-20 credits (depends on thread count and length)
- Hourly schedule: ~240-480 credits/day
- Daily schedule: ~10-20 credits/day

::: tip
For cost savings, switch to Claude Haiku for monitoring and only use Claude Sonnet 4 for response drafting. Or use BYOK to bypass credit costs entirely.
:::

## Next Steps

- Modify the agent to post approved responses automatically (add write permissions and update the prompt)
- Create a second agent that handles escalations (threads older than 48 hours with no reply)
- Set up a [webhook trigger](/guides/webhooks) to run the agent immediately when a new thread is created
