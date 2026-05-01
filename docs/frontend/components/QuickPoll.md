# QuickPoll

`QuickPoll.jsx` is a legacy poll interaction card with:
- Poll creation
- Quick yes/no voting
- Poll-id targeted votes
- Poll ping

This module can serve as a reference implementation for direct contract-call UIs.
Prefer `QuickPollCard` in production-facing layouts to reduce duplicated logic.

- Trim question and poll-id inputs before submit to reduce avoidable contract rejections.
- Keep vote-option labeling aligned with `QuickPollCard` to avoid inconsistent wording.

Source file: `frontend/src/components/QuickPoll.jsx`.

## Maintenance Note
- Revalidate default poll expiry copy when contract defaults evolve.
- Reconfirm vote status messaging after introducing new poll states.
- Disable poll creation controls while submit transactions are pending to prevent duplicate polls.
- Recheck vote and create-poll copy after contract validation rule updates.
- Audit prompt: align poll creation hints with latest validation boundaries.
