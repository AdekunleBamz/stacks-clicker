# WalletContext.test

Covers:
- Default disconnected state
- Local storage session restore
- Connect/disconnect handler wiring
- Cross-tab storage event synchronization
- Malformed persisted session payload fallback handling

## Maintenance Note
- Recheck reconnect-path assertions when wallet session bootstrap logic changes.
- Recheck reconnect behavior assertions after wallet adapter upgrades.
- Reconfirm disconnect recovery assertions after wallet reconnect refactors.
- Confirm reconnect-path assertions after wallet provider dependency upgrades.
