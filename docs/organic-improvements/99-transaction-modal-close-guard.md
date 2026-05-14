# Transaction Modal Close Guard

## Summary
Transaction modals should make it clear when closing will only hide progress, not cancel the wallet request.

## Checks
- Verify pending transaction modals keep the transaction id visible before close.
- Confirm close buttons do not imply cancellation after the wallet has signed.
- Capture the copy in release QA when modal states change.
