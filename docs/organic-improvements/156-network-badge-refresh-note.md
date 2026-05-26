# Network Badge Refresh Note

## Summary
The network badge should be checked after wallet reconnects so stale testnet or mainnet labels are caught early.

## Checks
- Reconnect the wallet after changing networks in the extension.
- Confirm the badge updates before any click, poll, or tip transaction is prepared.
- Capture the stale badge state in triage notes if the UI and wallet disagree.
