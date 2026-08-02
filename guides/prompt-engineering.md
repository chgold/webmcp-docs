---
title: Prompt Engineering
description: Write effective prompts for Goldnat chat and agents — patterns, examples, and common mistakes.
---

# Prompt Engineering

The quality of AI responses depends heavily on how you write your prompts. This guide covers techniques for both chat conversations and agent system prompts, with patterns specific to tool-calling AI interactions.

## Writing Clear Instructions

### Be Specific About the Task

Vague prompts produce vague results. Compare:

**Bad:**
```
Check my forum.
```

**Good:**
```
Search for all threads created in the last 24 hours that have 
zero replies. List them with the thread title, author, and 
creation time.
```

### Specify Output Format

Tell the AI exactly how you want results formatted:

```
List the top 10 products by revenue this month. Present the 
results as a table with columns: Product Name, Units Sold, 
Revenue (USD). Sort by revenue descending.
```

### Set Boundaries

Limit what the AI should and should not do:

```
Summarize the support tickets from today. Do NOT reply to any 
tickets or modify any data. Only read and summarize.
```

## System Prompts for Agents

Agent system prompts define the agent's entire behavior. They should be comprehensive and unambiguous.

### Structure of a Good Agent Prompt

```
You are a forum moderation assistant for community.example.com.

ROLE: Review new posts for compliance with community guidelines.

TASK:
1. Search for posts created in the last hour.
2. For each post, check if it contains spam, profanity, or 
   off-topic content.
3. If a post violates guidelines, flag it for review. Do NOT 
   delete posts.
4. Produce a summary report of flagged posts.

GUIDELINES:
- Spam includes: promotional links, repeated text, nonsensical 
  content
- Off-topic means: posts that do not relate to the forum 
  category they are posted in
- When in doubt, do NOT flag — false positives are worse than 
  false negatives

OUTPUT:
Produce a Markdown summary with:
- Total posts reviewed
- Number flagged
- For each flagged post: title, author, reason for flagging
```

### Key Elements

1. **Role** — who the AI is and what it represents
2. **Task** — step-by-step instructions
3. **Constraints** — what not to do
4. **Output format** — how to present results

## Few-Shot Examples

Include examples to demonstrate exactly what you want:

```
When you find a product that is out of stock, report it in 
this format:

EXAMPLE:
- Product: "Blue Widget XL"
  SKU: BW-XL-001
  Last in stock: 2026-05-01
  Current status: Out of stock (14 days)

Now scan the store for all out-of-stock products and report 
each one in this format.
```

## Tool-Use Prompting Patterns

### Asking for Specific Tools

You do not need to name tools directly — the AI maps your request to the available tools. But you can guide it:

```
Use the site's search function to find threads about 
"billing issues" from the last week.
```

### Sequential Tool Use

For multi-step tasks, describe the sequence:

```
First, search for the user "john_doe" on the forum. Then, 
list all threads they created in the last month. Finally, 
for each thread, get the reply count.
```

### Conditional Logic

```
Check the product inventory for SKU "WIDGET-100". If stock 
is below 10 units, search for the supplier contact and 
draft a reorder email. If stock is 10 or above, just 
report the current level.
```

## Common Mistakes

### 1. Overly Vague Prompts

**Problem:** "Help me with my site."
**Fix:** Specify exactly what action to take and on which data.

### 2. No Output Format

**Problem:** "Get me some analytics data."
**Fix:** "Show me daily visitor counts for the last 7 days as a table."

### 3. Missing Constraints

**Problem:** "Clean up the forum."
**Fix:** "Archive threads older than 90 days with zero replies. Do NOT delete anything."

### 4. Assuming Context

**Problem:** "Reply to the latest complaint."
**Fix:** "Search for threads tagged 'complaint' created today. Draft a polite response acknowledging the issue and promising to investigate."

### 5. Overloading a Single Prompt

**Problem:** A prompt that tries to do 10 different things.
**Fix:** Break complex workflows into separate agents, each focused on one task.

## Prompts for Different Use Cases

### Customer Support
```
Search for unanswered support tickets from the last 24 hours. 
For each ticket, draft a helpful response based on the ticket 
content. Present the drafts for review — do NOT post them.
```

### Content Moderation
```
Review posts from the last hour. Flag any post that contains 
links to domains not in this approved list: [example.com, 
docs.example.com]. Do not delete or modify any posts.
```

### Data Extraction
```
Pull all orders from the last week. Create a CSV artifact 
with columns: Order ID, Customer Name, Total, Status. 
Sort by total descending.
```

### Reporting
```
Generate a daily summary of forum activity. Include: new 
threads, total replies, most active users, and trending 
topics. Format as a Markdown artifact.
```
