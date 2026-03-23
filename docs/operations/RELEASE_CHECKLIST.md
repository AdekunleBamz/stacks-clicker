# Release Checklist

- Confirm changelog updates for user-facing changes.
- Verify frontend build and key tests pass.
- Confirm the latest release commit has a good local signature with `git log -1 --show-signature`.
- Push only reviewed commits to `origin/main`.
- After pushing, confirm GitHub marks the release commits as `Verified`.
- Validate production links after deployment.
- Record the release timestamp and operator in deployment notes.

Companion index: [Operations docs](README.md).
