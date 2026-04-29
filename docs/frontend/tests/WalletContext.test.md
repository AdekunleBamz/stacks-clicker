# WalletContext.test

Covers:
- default disconnected state
- local storage session restore
- connect/disconnect handler wiring
- cross-tab storage event synchronization
- malformed persisted session payload fallback handling

## Maintenance Note
- Recheck reconnect-path assertions when wallet session bootstrap logic changes.

- Recheck reconnect behavior assertions after wallet adapter upgrades.

- Reconfirm disconnect recovery assertions after wallet reconnect refactors.
