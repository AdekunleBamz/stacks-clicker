# QA Checklist

- Verify wallet connect/disconnect flows.
- Confirm click, tip, and poll interactions trigger expected UI updates.
- Check transaction history filtering and export actions.
- Validate mobile and desktop rendering.
- Verify primary actions remain reachable via keyboard navigation only.
- Validate reduced-motion mode does not hide critical status feedback.
- Capture one failed transaction example with txid/rejection details for support handoff quality.
- Confirm tooltip and helper text remain readable at high browser zoom levels.

## Maintenance Note
- Update regression focus areas after every major feature rollout.

### QA Reminder
- Include one wallet reconnect flow in every smoke cycle before approval.

Operational note: Record timezone and test timestamp when capturing QA evidence for release signoff.

Operational note: Log browser version with each QA signoff artifact.

Quarterly follow-up: Include one assistive tech pass in every major QA cycle.
