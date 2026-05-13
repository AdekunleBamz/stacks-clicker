# Clicker score sync fallback

When score reads fail, the UI should separate cached progress from confirmed chain state.

- Label cached totals so they are not mistaken for final balances.
- Retry score reads without blocking the rest of the dashboard.
- Log the failing network source for release smoke review.
