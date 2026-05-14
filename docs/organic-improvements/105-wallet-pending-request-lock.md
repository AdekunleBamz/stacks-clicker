# Wallet Pending Request Lock

## Summary
Wallet actions should prevent duplicate prompts while a request is already waiting on the wallet extension.

## Checks
- Double-click each wallet action during the pending state.
- Confirm disabled labels explain the pending request.
- Check that rejected requests unlock the action again.
