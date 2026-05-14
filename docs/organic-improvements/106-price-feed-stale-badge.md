# Price Feed Stale Badge

## Summary
Price-dependent displays should show when the last successful price read is stale.

## Checks
- Simulate a failed price refresh after a successful read.
- Confirm stale badges do not hide the last known value.
- Include stale state screenshots in frontend smoke notes.
