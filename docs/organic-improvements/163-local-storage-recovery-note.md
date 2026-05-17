# Local Storage Recovery Note

## Summary
Local storage recovery checks should prove stale client state does not block a fresh wallet session.

## Checks
- Clear only app-owned storage keys before retesting a reported recovery issue.
- Confirm the app can rebuild clicker, poll, and onboarding state after reload.
- Document the browser and storage key names when a corrupted value is found.
