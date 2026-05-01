# QuickActions

`QuickActions.jsx` groups utility actions:
- Ping all contracts
- Clear in-memory transaction log
- Open Stacks support site

All actions route through a sound-enabled wrapper for consistent interaction feedback.
Keep external support links reviewed to avoid stale destinations.

## Maintenance Note
- Keep support destination URLs reviewed during release prep to avoid stale help links.
- Keep clear-log behavior discoverable and reversible to reduce accidental data loss.
- Require a lightweight confirmation affordance before destructive quick actions execute.
- Recheck shortcut labels whenever quick action mappings are updated.
- Re-test shortcut discoverability when action grouping changes.
- Keep quick action labels aligned with shortcut behavior and disable states.
- Audit prompt: verify disabled-state messaging across quick action entries.
