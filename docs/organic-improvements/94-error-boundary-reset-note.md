# Error Boundary Reset

## Summary
Error boundary reset actions should preserve enough context for users to retry safely.

## Checks
- Trigger a recoverable UI error in staging.
- Confirm reset does not submit any transaction.
- Include reset path in support guidance.
