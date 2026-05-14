# Keyboard Shortcut Conflict

## Summary
Keyboard shortcuts should avoid conflicts with wallet popups, form entry, and browser defaults.

## Checks
- Test shortcuts while focus is inside inputs.
- Confirm modal shortcuts do not leak to the page behind them.
- Document any changed shortcut in release notes.
