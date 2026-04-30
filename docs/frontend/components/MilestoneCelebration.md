# MilestoneCelebration

`MilestoneCelebration.jsx` displays a short-lived celebratory overlay when interaction thresholds are reached.

The parent component controls the `celebration` message and visibility timing.
Respect reduced-motion preferences when tuning celebration animation intensity.

- Keep celebration copy short enough for quick screen-reader announcements.

- Reconfirm announcement text remains concise during new milestone additions.

- Keep celebration timing in sync with reduced-motion preferences.
- Verify celebration overlays do not block primary actions longer than intended.

### Maintenance Note
- Recheck celebration copy for reduced-motion fallback compatibility.
- Audit prompt: confirm celebration fallback copy for reduced-motion users.
