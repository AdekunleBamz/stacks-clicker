# Rollback Guide

- Identify first bad commit from deployment window.
- Revert with a focused commit; avoid history rewrites.
- Validate critical wallet and interaction flows.
- Confirm the rollback commit is signed locally and appears as `Verified` after push.
- Announce rollback and next corrective action.
- Keep the reverted commit hash in incident notes for later audit.
- Archive rollback validation evidence (screenshots/log snippets) with the incident record.
- Confirm the rollback commit is included in the next release communication summary.

Companion index: [Operations docs](README.md).

### Rollback Reminder
- Verify rollback instructions include cache-bust and wallet reconnect guidance.
