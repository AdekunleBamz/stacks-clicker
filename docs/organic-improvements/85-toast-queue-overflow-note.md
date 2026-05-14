# Toast Queue Overflow

## Summary
Toast queues should not hide critical transaction or wallet messages during rapid interactions.

## Checks
- Trigger several click, poll, and tip messages quickly.
- Confirm errors remain visible long enough to read.
- Include queue behavior in release QA notes.
