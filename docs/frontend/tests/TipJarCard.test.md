# TipJarCard.test

Checks:
- Fixed-tip and self-ping callback wiring
- Valid custom tip submission
- Invalid tip rejection
- Disconnected action blocking
- Minimum amount boundary validation (`0.001` STX)

## Maintenance Note
- Revisit minimum-tip validation test notes whenever fee assumptions are updated.

Source file: `frontend/src/tests/TipJarCard.test.jsx`.

- Reconfirm min-tip and invalid-input scenarios after fee rule changes.
- Re-run invalid amount test coverage after precision rule updates.
- Revalidate minimum amount scenarios after contract-side validation updates.
