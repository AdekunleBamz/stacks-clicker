# Dependency Update Policy

- Prefer incremental dependency upgrades.
- Run affected test/build checks after updates.
- Capture notable upgrade risks in PR/commit notes.
- Avoid broad version jumps without rollback plans.
- Review lockfile diffs for unexpected transitive package changes.
- Reserve an explicit fast-track window for critical security patches.
- Prefer merging non-critical upgrades early in the week to leave rollback time before release cutoff.
- Assign an owner for each high-risk upgrade so follow-up validation does not drift.

Companion index: [Operations docs](README.md).

### Update Reminder
- Prioritize dependency patches that affect transaction signing and wallet connection paths.
