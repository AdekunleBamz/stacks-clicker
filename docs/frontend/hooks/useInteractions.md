# useInteractions

`useInteractions` aggregates domain hooks into one interface:
- `clicker`
- `tipjar`
- `quickpoll`
- `pingAll()`

Use this hook in `App.jsx` to avoid scattered transaction callback wiring.
Surface transaction callbacks from this level to keep card components lean.

Source file: `frontend/src/hooks/useInteractions.js`.
