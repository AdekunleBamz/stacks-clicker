# Session reset troubleshooting note

When users report stuck wallet state, recommend a controlled session reset before deeper debugging.
This resolves stale provider state in many reconnect scenarios.

- Recheck session reset guidance after wallet adapter major upgrades.

### Follow-up
- Check session reset behavior after auth and wallet state refactors.
