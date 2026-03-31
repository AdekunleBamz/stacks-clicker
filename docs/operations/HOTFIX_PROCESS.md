# Hotfix Process

Follow this procedure when a critical production issue requires immediate resolution.

## Assessment

1. **Confirm customer-facing severity**
   - Is the issue blocking core functionality?
   - Are users unable to complete transactions?
   - Is data at risk of corruption or loss?

2. **Determine hotfix vs rollback**
   - If rollback is safer, follow [ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md)
   - If hotfix is needed, proceed with this process

## Implementation

### Code Changes
- **Implement the smallest safe fix**
- Focus only on the critical issue
- Avoid refactoring or unrelated changes
- Add regression tests for the fix

### Validation
- **Validate key paths before deployment**
- Test the fix in devnet environment
- Verify no regressions in core flows
- Get quick peer review if possible

## Deployment

### Release
- **Release quickly but carefully**
- Follow deployment checklist for critical steps
- Monitor deployment in real-time
- Have rollback ready if issues arise

### Verification
- Confirm the hotfix commit appears as `Verified` before closing incident
- Document the exact commit hash used for hotfix deployment
- Update incident tracking with deployment details

## Post-Hotfix

### Follow-up
- **Follow up with root-cause analysis**
- Schedule post-mortem within 48 hours
- Identify preventive measures
- Create cleanup tasks for technical debt

### Documentation
- Update relevant documentation if process changed
- Add learnings to troubleshooting guides
- Update test coverage to prevent recurrence

## Maintenance Note

Verify rollback-link references whenever hotfix approval flow is updated.

---

Companion index: [Operations docs](README.md).
