# Wallet disconnect recovery

After an unexpected disconnect, preserve pending form inputs where safe.
This prevents accidental data loss during reconnect flows.

- Verify post-disconnect actions show next steps without requiring refresh.

### Follow-up
- Repeat disconnect recovery checks after wallet SDK upgrades.
- Verify recovery flow keeps unsent draft inputs without replaying stale transactions.
