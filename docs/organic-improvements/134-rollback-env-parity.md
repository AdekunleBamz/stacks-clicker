# Rollback Env Parity

## Summary
Rollback plans should include environment variable parity checks before restoring an older deployment.

## Checks
- Compare variable names for current and rollback deployments.
- Confirm rollback does not point to mixed contract versions.
- Keep values redacted in all handoff notes.
