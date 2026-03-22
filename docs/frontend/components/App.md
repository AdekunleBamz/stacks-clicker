# App Component

The `App` component is the root container that coordinates global UI concerns for the Stacks Clicker application.

Use `useInteractions` for chain actions and pass its sub-APIs to `MainGrid`.
Keep global side effects centralized here to minimize prop drilling complexity.

- Keep analytics and global browser side effects centralized here to simplify debugging.
