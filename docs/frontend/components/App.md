# App

`App.jsx` coordinates global UI concerns:
- theme persistence and toggle behavior
- transaction log creation and optimistic stats
- keyboard shortcuts (`C` click, `T` tip)
- lazy-loaded primary sections and overlays

Use `useInteractions` for chain actions and pass its sub-APIs to `MainGrid`.
Keep global side effects centralized here to minimize prop drilling complexity.

- Keep analytics and global browser side effects centralized here to simplify debugging.
- Update this document whenever keyboard shortcuts change to keep support docs accurate.
