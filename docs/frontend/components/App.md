# App Component

The `App` component is the root container that coordinates global UI concerns for the Stacks Clicker application.

Use `useInteractions` for chain actions and pass its sub-APIs to `MainGrid`.
Keep global side effects centralized here to minimize prop drilling complexity.

- Keep analytics and global browser side effects centralized here to simplify debugging.
- Update this document whenever keyboard shortcuts change to keep support docs accurate.

- Re-verify global side effects here when app-level providers are reordered.

- Keep this doc updated when app-level error handling boundaries are reorganized.

### Maintenance Note
- Keep global side-effect ownership notes aligned with provider updates.
- Audit prompt: verify provider boundary notes when adding new global effects.
