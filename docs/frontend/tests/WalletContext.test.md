# WalletContext.test

Covers:
- default disconnected state
- local storage session restore
- connect/disconnect handler wiring
- cross-tab storage event synchronization
- malformed persisted session payload fallback handling

## Maintenance Note
- Recheck reconnect-path assertions when wallet session bootstrap logic changes.

Source file: `frontend/src/tests/WalletContext.test.jsx`.
