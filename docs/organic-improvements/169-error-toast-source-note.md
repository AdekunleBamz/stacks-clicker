# Error Toast Source Note

## Summary
Error toast triage should identify whether the message came from the wallet, contract read, or app validation path.

## Checks
- Reproduce each toast with the browser console open before filing copy changes.
- Label the source as wallet, contract read, transaction submit, or validation.
- Confirm duplicate toasts are not shown for a single failed action.
