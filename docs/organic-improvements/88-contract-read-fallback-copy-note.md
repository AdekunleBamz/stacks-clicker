# Contract Read Fallback Copy

## Summary
Readonly contract failures should show recoverable fallback copy instead of blank cards.

## Checks
- Simulate slow and failed contract reads.
- Confirm retry action keeps wallet context.
- Include failed-read copy in release review.
