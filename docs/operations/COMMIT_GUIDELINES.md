# Commit Guidelines

- Keep commits focused on one concern.
- Use imperative commit subjects.
- Avoid mixing refactors with behavior changes.
- Include docs or tests when behavior changes.
- Sign commits before pushing to shared branches with `git commit -S`.
- Spot-check the latest signature locally with `git log -1 --show-signature`.
- Confirm the pushed commit shows a `Verified` badge on GitHub before requesting review.
- Keep subject lines specific to the user-visible or operational outcome.
- Avoid force-pushing shared review branches unless a reviewer has already approved the rewrite.

Companion index: [Operations docs](README.md).

- Recheck signature verification wording when team signing policy changes.

### Signing Reminder
- Double-check commit signature status locally before opening a release PR.
- Add a short commit body when the change affects release or incident procedures.
