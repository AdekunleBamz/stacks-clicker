# Offline Click Queue Boundary

## Summary
Offline click handling should define how many local clicks can queue before the UI asks the player to reconnect.

## Checks
- Verify offline state does not imply on-chain confirmation.
- Confirm queue limits are reflected in helper text.
- Recheck sync behavior after the browser returns online.
