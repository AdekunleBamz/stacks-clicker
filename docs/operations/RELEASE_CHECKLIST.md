# Release Checklist

- Confirm changelog updates for user-facing changes.
- Verify frontend build and key tests pass.
- Confirm the latest release commit has a good local signature with `git log -1 --show-signature`.
- Push only reviewed commits to `origin/main`.
- After pushing, confirm GitHub marks the release commits as `Verified`.
- Capture at least one explorer link for a representative production transaction in release notes.
- Validate production links after deployment.
- Record the release timestamp and operator in deployment notes.

## Maintenance Note
- Re-audit this checklist whenever release gate criteria are updated.
