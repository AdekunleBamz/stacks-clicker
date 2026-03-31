# Rollback Guide

Follow this procedure when a deployment requires rollback to restore service.

## Identification

- [ ] Identify the first bad commit from the deployment window.
- [ ] Review commit history to understand the scope of changes.
- [ ] Determine if rollback or hotfix is the appropriate response.

## Execution

### Git Operations
- [ ] Revert with a focused commit; avoid history rewrites.
  ```bash
  git revert <bad-commit-hash>
  ```
- [ ] Confirm the rollback commit is signed locally:
  ```bash
  git commit -S --amend --no-edit
  ```
- [ ] Push to origin/main and verify `Verified` badge appears.

### Validation
- [ ] Validate critical wallet connection flows work.
- [ ] Test all interaction flows (click, tip, vote).
- [ ] Verify transaction history displays correctly.
- [ ] Check theme toggle and language selection.

## Communication

- [ ] Announce rollback to contributors and stakeholders.
- [ ] Document next corrective action plan.
- [ ] Update incident tracking with rollback details.

## Documentation

- [ ] Keep the reverted commit hash in incident notes for later audit.
- [ ] Record rollback timestamp and operator name.
- [ ] Update CHANGELOG.md with rollback entry if user-facing impact.

## Post-Rollback

- [ ] Schedule root cause analysis meeting.
- [ ] Prepare hotfix if needed to address the underlying issue.
- [ ] Update deployment checklist to prevent similar issues.

---

Companion index: [Operations docs](README.md).
