# QA Checklist

- Verify wallet connect/disconnect flows.
- Confirm click, tip, and poll interactions trigger expected UI updates.
- Check transaction history filtering and export actions.
- Validate mobile and desktop rendering.
- Run at least one smoke pass on a constrained network profile to catch timeout-sensitive flows.
- Confirm burst submissions surface retry timing instead of repeating immediate broadcast failures.
- Validate reduced-motion mode does not hide critical status feedback.

## Maintenance Note
- Update regression focus areas after every major feature rollout.
