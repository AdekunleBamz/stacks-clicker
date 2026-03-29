# TipJarCard

`TipJarCard.jsx` exposes TipJar flows:
- self ping
- quick fixed tip (`0.001` STX)
- custom tip amount input with validation

Validation rule:
- minimum accepted amount is `0.001` STX

Invalid or disconnected attempts surface error state and sound feedback.
Display amount formatting help near the input to reduce invalid submissions.

## Maintenance Note
- Keep empty-state copy and min-tip validation notes aligned during UX copy updates.

Source file: `frontend/src/components/TipJarCard.jsx`.
