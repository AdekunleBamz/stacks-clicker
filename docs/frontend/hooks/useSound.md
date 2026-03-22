# useSound

`useSound` generates lightweight synthesized interaction feedback using the Web Audio API.

Supported sound types:
- `click`
- `success`
- `error`
- Skip playback gracefully when the browser blocks audio autoplay.

## Maintenance Note
- Revalidate browser autoplay handling whenever audio asset paths or playback defaults change.

Source file: `frontend/src/hooks/useSound.js`.
