# Incident Response

- Acknowledge incident and freeze non-critical merges.
- Capture failing flow, timestamps, and affected network.
- Preserve failed transaction `tx-result`/repr details when available to accelerate root-cause analysis.
- Apply mitigation, then prepare root-cause notes.
- Publish a short post-incident summary.
- Track customer-facing status updates in a single incident thread.
- Assign one incident owner per shift to avoid split decisions during active mitigation.
- Log when rollback is considered and why it was accepted or rejected.

## Maintenance Note
- Reconfirm escalation contacts and communication channels each release cycle.

### Incident Reminder
- Always attach the first failing transaction hash when opening an incident channel thread.
