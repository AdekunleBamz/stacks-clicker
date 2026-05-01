# Rollback Guide

- Identify first bad commit from deployment window.
- Pause automated deployment jobs before applying rollback changes.
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

Operational note: After rollback completes, validate cache headers and trigger a CDN purge if stale bundles persist.

Operational note: Confirm rollback signer wallet has enough balance for emergency retries.

Quarterly follow-up: Dry-run rollback commands in staging to keep playbook current.
