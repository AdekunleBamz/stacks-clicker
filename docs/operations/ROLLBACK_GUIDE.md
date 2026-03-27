# Rollback Guide

- Identify first bad commit from deployment window.
- Revert with a focused commit; avoid history rewrites.
- Validate critical wallet and interaction flows.
- Confirm the rollback commit is signed locally and appears as `Verified` after push.
- Announce rollback and next corrective action.
- Keep the reverted commit hash in incident notes for later audit.

Companion index: [Operations docs](README.md).
