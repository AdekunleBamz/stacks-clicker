# Service Worker Cache Clear

## Summary
Service worker cache behavior should not leave users on stale contract addresses after a deployment.

## Checks
- Verify new builds load updated config after refresh.
- Test cache clearing on the preview deployment before production.
- Include contract-address changes in release notes.
