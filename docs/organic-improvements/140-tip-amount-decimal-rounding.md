# Tip Amount Decimal Rounding

## Summary
Tip amount inputs should describe how decimal STX values are converted before signing.

## Checks
- Test small decimal values near the minimum.
- Confirm previewed micro-STX amount matches the wallet prompt.
- Avoid silently rounding to zero.
