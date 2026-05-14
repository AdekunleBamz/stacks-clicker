# TipJar Amount Boundary

## Summary
Tip amounts should clearly reject zero, negative, and over-precision values.

## Checks
- Test small valid amount and invalid decimal precision.
- Confirm wallet signing only opens for valid amounts.
- Capture fee and amount labels together.
