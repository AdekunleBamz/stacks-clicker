# Contract Read Retry Cap

## Summary
Contract reads need a retry cap so temporary API failures do not produce endless loading states.

## Checks
- Simulate repeated read failures.
- Confirm the terminal error state offers a retry action.
- Document any default retry delay in the release checklist.
