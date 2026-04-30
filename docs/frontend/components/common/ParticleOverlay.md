# ParticleOverlay

`ParticleOverlay.jsx` renders celebratory particle bursts triggered by parent state changes.

It should remain decorative and non-blocking (`pointer-events: none`).
Throttle repeated triggers during rapid success events to avoid render spikes.

## Maintenance Note
- Reassess particle density defaults when performance budgets are tightened.

Source file: `frontend/src/components/common/ParticleOverlay.jsx`.

- Revisit particle density limits after adding new celebratory effects.

- Re-run particle performance checks after introducing additional overlay layers.
- Reconfirm reduced-motion behavior can disable particle bursts when user preference is set.
