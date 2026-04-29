# Release Checklist

Complete all items before and during a release to ensure quality and traceability.

## Pre-Release

### Code Quality
- [ ] Confirm changelog updates for all user-facing changes.
- [ ] Verify frontend build completes without errors.
- [ ] Run full test suite and confirm all tests pass.
- [ ] Run linter and fix any violations.
- [ ] Confirm version numbers are updated in package.json files.

### Git Verification
- [ ] Confirm the latest release commit has a good local signature:
  ```bash
  git log -1 --show-signature
  ```
- [ ] Push only reviewed commits to `origin/main`.
- [ ] After pushing, confirm GitHub marks the release commits as `Verified`.

## Release

### Documentation
- [ ] Capture at least one explorer link for a representative production transaction.
- [ ] Include explorer link in release notes for audit trail.
- [ ] Update ROADMAP.md to mark completed items.

### Validation
- [ ] Validate production links work correctly after deployment.
- [ ] Record the release timestamp and operator in deployment notes.
- [ ] Tag the release commit with semantic version tag.
- [ ] Example: `git tag vX.Y.Z && git push origin vX.Y.Z`
- [ ] Confirm one wallet connect and one wallet disconnect pass immediately after release.

## Post-Release

- [ ] Monitor error rates and performance metrics.
- [ ] Announce release to contributors and community.
- [ ] Update project website with release notes.

## Maintenance Note
- Re-audit this checklist whenever release gate criteria are updated.
