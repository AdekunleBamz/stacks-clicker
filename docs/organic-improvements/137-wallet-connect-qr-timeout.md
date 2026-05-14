# Wallet Connect QR Timeout

## Summary
QR-based wallet connection should show a timeout or refresh path before the code becomes stale.

## Checks
- Let a QR session expire during QA.
- Confirm refresh does not create duplicate pending sessions.
- Keep timeout copy short enough for mobile modals.
