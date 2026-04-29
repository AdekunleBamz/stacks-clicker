# Hotfix Process

- Confirm customer-facing severity.
- Implement the smallest safe fix.
- Validate key paths and release quickly.
- Follow up with root-cause and cleanup tasks.
- Document the exact commit hash used for hotfix deployment.
- Confirm the hotfix commit appears as `Verified` before closing the incident timeline.
- Merge hotfix changes back into the primary development line as soon as the incident is closed.
- Capture the exact smoke checks run during hotfix validation for post-incident audit.

## Maintenance Note
- Verify rollback-link references whenever hotfix approval flow is updated.
