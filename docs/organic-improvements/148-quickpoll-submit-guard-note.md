# QuickPoll Submit Guard

## Summary
QuickPoll release checks should verify that duplicate submit states are visible during wallet approval.

## Checks
- Confirm the vote action is disabled while a wallet request is pending.
- Keep pending copy short enough for mobile buttons.
- Recheck rejected-wallet flows during smoke testing.
