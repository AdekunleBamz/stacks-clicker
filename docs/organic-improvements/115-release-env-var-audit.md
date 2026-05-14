# Release Env Var Audit

## Summary
Environment variables should be audited before release without exposing values in commits or screenshots.

## Checks
- Compare required variable names across local, preview, and production.
- Redact all values in handoff notes.
- Confirm missing optional variables have safe fallbacks.
