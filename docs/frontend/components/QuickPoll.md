# QuickPoll

`QuickPoll.jsx` is a legacy poll interaction card with:
- poll creation
- quick yes/no voting
- poll-id targeted votes
- poll ping

This module can serve as a reference implementation for direct contract-call UIs.
Prefer `QuickPollCard` in production-facing layouts to reduce duplicated logic.

- Trim question and poll-id inputs before submit to reduce avoidable contract rejections.
- Keep vote-option labeling aligned with `QuickPollCard` to avoid inconsistent wording.

Source file: `frontend/src/components/QuickPoll.jsx`.

- Revalidate default poll expiry copy when contract defaults evolve.

- Reconfirm vote status messaging after introducing new poll states.
