# Incident Response

Follow this procedure when production incidents occur to ensure rapid response and resolution.

## Immediate Response (0-15 minutes)

### Acknowledgment
- [ ] Acknowledge incident in team communication channel.
- [ ] Freeze non-critical merges to prevent compounding issues.
- [ ] Assign incident commander role.

### Information Gathering
- [ ] Capture failing flow with detailed steps to reproduce.
- [ ] Record timestamps of incident start and detection.
- [ ] Identify affected network (mainnet, testnet, devnet).
- [ ] Preserve failed transaction `tx-result` and repr details.

## Mitigation (15-60 minutes)

### Assessment
- [ ] Determine incident severity level.
- [ ] Assess impact scope (users affected, functionality impacted).
- [ ] Check if rollback is necessary.

### Action
- [ ] Apply immediate mitigation (rollback, hotfix, or configuration change).
- [ ] Verify mitigation effectiveness.
- [ ] Document all actions taken with timestamps.

## Resolution & Follow-up

### Communication
- [ ] Track customer-facing status updates in a single incident thread.
- [ ] Notify stakeholders of resolution status.
- [ ] Update status page if customer-facing impact occurred.

### Post-Incident
- [ ] Prepare root-cause analysis notes.
- [ ] Publish a short post-incident summary.
- [ ] Schedule post-mortem meeting within 48 hours.
- [ ] Create action items to prevent recurrence.

## Maintenance Note

Reconfirm escalation contacts and communication channels each release cycle.

---

Companion index: [Operations docs](README.md).
