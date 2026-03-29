# TipJarCard.test

Checks:
- fixed-tip and self-ping callback wiring
- valid custom tip submission
- invalid tip rejection
- disconnected action blocking
- minimum amount boundary validation (`0.001` STX)

## Maintenance Note
- Revisit minimum-tip validation test notes whenever fee assumptions are updated.

Source file: `frontend/src/tests/TipJarCard.test.jsx`.
