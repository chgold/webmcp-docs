---
title: "Tutorial: Multi-Site Workflows"
description: Step-by-step tutorial to use multiple connected sites together in chat sessions and agents for cross-site operations.
---

# Multi-Site Workflows

In this tutorial, you will learn how to use multiple connected sites together — querying one site, processing the data, and acting on another. This is one of the most powerful features of Goldnat.

**Time:** 15 minutes
**Requirements:** Pro plan or higher, two or more connected sites

## What You Will Build

Examples of multi-site workflows:
- Query a support forum and cross-reference with a documentation site
- Pull data from a store and post summaries to a blog
- Aggregate content from multiple forums into a single report

## Step 1: Set Up a Site Group

Multi-site workflows are easier to manage with site groups:

1. Go to **Site Groups** > **Create Group**.
2. Name: "Cross-Site Workflow".
3. Add your sites (e.g., "Support Forum" and "Product Docs").
4. Configure deny lists:
   - Block `*_delete_*` on all sites (safety)
   - Block `*_admin_*` on all sites
5. Save.

## Step 2: Multi-Site Chat

### Starting a Multi-Site Session

1. Go to **Chat** > **New Session**.
2. Select your model.
3. Under **Sites**, select the "Cross-Site Workflow" group (or check multiple individual sites).
4. Click **Start Chat**.

All tools from all selected sites are available in the session.

### Cross-Site Query Example

You can ask the AI to work across sites in a single message:

```
Search the support forum for threads about "checkout error" 
from the last week. For each thread, check the product 
documentation for relevant troubleshooting steps. Create a 
summary with the thread title, the customer's issue, and 
the relevant documentation link.
```

The AI will:
1. Call `forum_search_threads` to find support threads
2. For each thread, call `docs_search` to find relevant documentation
3. Combine the results into a cross-referenced summary

### Data Transfer Between Sites

```
Find the top 5 feature requests on the forum (threads in the 
"Feature Requests" category with the most replies). Then 
create a new blog post on the company blog site summarizing 
these requests with vote counts and representative quotes.
```

The AI will:
1. Call `forum_search_threads` with the Feature Requests category, sorted by replies
2. Call `forum_get_thread` for each to read the discussions
3. Call `blog_create_post` to publish the summary

## Step 3: Multi-Site Agent

### Creating the Agent

1. Go to **Agents** > **New Agent**.
2. Configure:

| Field | Value |
|-------|-------|
| **Name** | Cross-Site Sync Agent |
| **Description** | Syncs data between forum and documentation site |
| **Model** | Claude Sonnet 4 (complex reasoning needed) |
| **Sites** | Cross-Site Workflow group |
| **Max Rounds** | 8 |
| **Trigger** | Scheduled (daily) |

3. System prompt:

```
You are a cross-site synchronization assistant managing our 
support forum and documentation site.

TASK:
1. Search the support forum for resolved threads from the 
   past 24 hours (threads tagged "resolved").
2. For each resolved thread:
   a. Read the thread to understand the problem and solution.
   b. Search the documentation for an existing article on 
      this topic.
   c. If an article exists but the solution adds new 
      information, note it for a documentation update.
   d. If no article exists and the issue has appeared 3+ 
      times, note it for a new documentation page.
3. Output a report with:
   - Existing articles that need updates (with suggested 
     additions)
   - Topics that need new documentation pages (with 
     outlines)

RULES:
- Do NOT modify the documentation site directly.
- Only output recommendations for human review.
- Focus on issues that appear repeatedly (3+ occurrences).
```

## Step 4: Data Flow Between Sites

### Understanding Tool Prefixes

When multiple sites are in a session, tools are prefixed with the site identifier to avoid naming collisions:

| Site | Tool | Full Tool Name |
|------|------|----------------|
| Support Forum | search_threads | `forum_search_threads` |
| Support Forum | get_thread | `forum_get_thread` |
| Product Docs | search | `docs_search` |
| Product Docs | get_article | `docs_get_article` |
| Blog | create_post | `blog_create_post` |

The AI understands these prefixes and routes calls to the correct site.

### Data Flow Pattern

A typical multi-site workflow follows this pattern:

```
Site A (Source) → AI Processing → Site B (Destination)

1. Read data from Site A (search, get, list tools)
2. AI analyzes, transforms, or summarizes the data
3. Write results to Site B (create, update, post tools)
```

## Step 5: Permission Considerations

### Principle of Least Privilege

- Grant read-only access to source sites
- Grant write access only to destination sites
- Use deny lists to block operations you do not want

### Example Permission Setup

For a "Forum to Blog" workflow:

| Site | Allowed Tools | Denied Tools |
|------|---------------|--------------|
| Forum | `forum_search_*`, `forum_get_*` | `forum_create_*`, `forum_delete_*` |
| Blog | `blog_create_post` | `blog_delete_*`, `blog_admin_*` |

Set these in the site group's deny list or in the session's tool permissions.

### Token Scopes

If using OAuth, ensure each site's token has the appropriate scopes:
- Source sites: `read` scope only
- Destination sites: `read` and `write` scopes

## Advanced Patterns

### Conditional Cross-Site Actions

```
Search the forum for threads about "shipping delay" from 
today. If more than 5 threads are found, create an 
announcement post on the blog about the shipping situation. 
If fewer than 5, just output a summary without posting.
```

### Aggregation from Multiple Sources

```
Search all three forums (community, support, feedback) for 
threads mentioning "version 3.0" from the last week. 
Aggregate all mentions into a single report organized by 
sentiment (positive, negative, neutral).
```

### Periodic Sync Agent

Create a scheduled agent that runs hourly to keep content synchronized between sites — for example, ensuring that FAQ content on the docs site reflects the most common support questions on the forum.

## Tips

- Start simple — get a two-site workflow working before adding more sites.
- Test thoroughly — multi-site agents can have unexpected interactions.
- Monitor credit usage — more sites means more tool calls per round.
- Use Claude Haiku for read-heavy workflows and Claude Sonnet 4 for complex reasoning tasks.
