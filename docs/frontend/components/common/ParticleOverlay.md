# ParticleOverlay

`ParticleOverlay.jsx` renders celebratory particle bursts triggered by parent state changes.

It should remain decorative and non-blocking (`pointer-events: none`).
Throttle repeated triggers during rapid success events to avoid render spikes.

Source file: `frontend/src/components/common/ParticleOverlay.jsx`.
