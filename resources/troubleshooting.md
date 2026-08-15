---
title: Troubleshooting
description: Solutions for common Goldnat issues — connection problems, credit errors, agent failures, and more.
---

# Troubleshooting

This page covers the most common issues users encounter and how to resolve them.

## Site Connection Issues

### "Could not fetch manifest from site"

**Symptoms:** Adding a site fails with a manifest fetch error.

**Causes and solutions:**

1. **Wrong URL** — verify the URL is correct and includes `https://`.
2. **No manifest** — the site may not have a manifest at the standard paths (`/.well-known/servio.json`, `/servio.json`, `/api/servio/manifest`). Contact the site administrator.
3. **SSL error** — the site's SSL certificate may be invalid or expired. Goldnat does not connect to HTTP-only sites.
4. **Firewall blocking** — the site may block requests from Goldnat's servers. Contact the site administrator to allow incoming requests.
5. **Site down** — try again later if the site is temporarily unreachable.

### Token shows "Expired" status

**Symptoms:** The vault shows the token as expired; tool calls fail.

**For Bearer tokens:**
1. Obtain a new token from the site.
2. Go to **Sites** > click the site > **Update Token**.
3. Paste the new token and save.

**For OAuth tokens:**
1. The platform should refresh automatically. If it fails, the refresh token may have expired.
2. Remove the site from the vault.
3. Re-connect via the Directory using the OAuth flow.

### Tools are not appearing in chat

1. Verify the site is selected in the session settings (click **Change** in the session header).
2. Check that the tools are not on the session's deny list.
3. Go to **Sites** and confirm the token status is **Active**.
4. If the token is active but tools are missing, the manifest may have changed. Remove and re-add the site.

### OAuth redirect fails or loops

1. Ensure third-party cookies are not blocked in your browser.
2. Try using a different browser or incognito mode.
3. Clear your browser cookies for goldnat.ai.
4. The site's OAuth configuration may be incorrect — contact the site administrator.

## Credit Issues

### "No Credits" error when sending a message

**Cause:** Your credit balance is zero.

**Solutions:**
1. Go to **Billing** > **Buy Credits** and purchase a package.
2. Enable **Auto Top-up** to prevent future occurrences.
3. If you have a BYOK key, ensure it is active in **Settings** > **API Key**.

### Credits not showing after purchase

1. Refresh the page (Ctrl+R / Cmd+R).
2. Check **Billing** > **Transaction History** — the purchase should appear with status "Completed."
3. If the transaction shows "Pending," wait a few minutes for Stripe to process.
4. If the transaction is not listed, the payment may have failed. Check your card statement.

### Credit balance seems to decrease too fast

1. Check **Analytics** to see per-model credit usage.
2. Review active scheduled agents — they consume credits on each run.
3. Long conversations cost more per message because previous messages are included as input tokens.
4. Switch to a cheaper model for simple tasks (Claude Haiku 4.5).

## Agent Issues

### Agent stuck in "Pending" status

**Cause:** The agent worker process may be busy or down.

**Solutions:**
1. Wait a few minutes — runs are queued and processed sequentially.
2. If the run has been pending for more than 10 minutes, cancel it and try again.
3. This may indicate a platform-side issue. Check [status.goldnat.ai](https://status.goldnat.ai) for outage reports.

### Agent run shows "Failed" status

1. Go to the run detail page.
2. Examine the timeline — find the step with type "Error."
3. Common errors:
   - **Site unreachable** — the external site returned an error or timed out. Check the site's status.
   - **Token expired** — update the token in the vault.
   - **Model error** — the AI provider returned an error. Try a different model.
   - **No credits** — the run was blocked due to insufficient balance.

### Agent produces unexpected results

1. Review the run timeline step by step.
2. Check which tools were called and what parameters were sent.
3. Refine the system prompt:
   - Be more specific about what to do and what not to do.
   - Add examples of expected behavior.
   - Reduce ambiguity.
4. Test with a manual run after prompt changes.

### Scheduled agent is not running

1. Verify the agent's **Active** toggle is on.
2. Check the schedule — confirm the cron expression is correct.
3. Ensure you are on the **Harness** plan or higher (scheduling requires it).
4. Check the runs list — the agent may have run but failed silently.

## Chat Issues

### Streaming response stops mid-sentence

**Possible causes:**
1. **Network interruption** — refresh the page and check if the response was saved.
2. **90-second timeout** — the AI took too long to respond. Try a simpler prompt or a faster model.
3. **Browser tab suspended** — some browsers suspend background tabs. Keep the tab active during streaming.

### "Session expired" error

The chat session has expired. Click **New Session** to create a fresh one. Your conversation history is preserved — you can continue from where you left off.

### Tool call shows an error

1. Check the error message in the tool result block.
2. Common causes:
   - **Rate limited** — you are sending too many tool calls too fast. Wait and retry.
   - **Site error** — the external site returned a 4xx or 5xx error. The site may be down or the endpoint may have changed.
   - **Permission denied** — your token may not have sufficient permissions for this operation on the site.

## Payment Issues

### "No payment method" error

Add a card on the **Billing** page before purchasing credits or enabling auto top-up.

### Payment declined

1. Verify your card details are correct.
2. Ensure the card has sufficient funds.
3. Contact your card issuer — they may be blocking the charge.
4. Try a different card.

### Subscription shows "Past Due"

Your payment failed. Update your payment method within 7 days to avoid being downgraded to Free:
1. Go to **Billing** > **Payment Method**.
2. Add a new card or update the existing one.
3. The system will retry the charge automatically.

## General Issues

### Page shows a loading spinner indefinitely

1. Refresh the page.
2. Clear browser cache and cookies for goldnat.ai.
3. Try a different browser.
4. Check your internet connection.

### Changes not saving

1. Look for error notifications (red toasts) at the top of the page.
2. Check browser console (F12 > Console) for errors.
3. Try refreshing and re-applying the change.

### Need more help?

Contact **support@goldnat.ai** with:
- Your account email
- The action you were trying to perform
- Any error messages you received
- Browser and device information
