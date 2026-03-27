# Dependency Update Policy

- Prefer incremental dependency upgrades.
- Run affected test/build checks after updates.
- Capture notable upgrade risks in PR/commit notes.
- Avoid broad version jumps without rollback plans.
- Review lockfile diffs for unexpected transitive package changes.
- Reserve an explicit fast-track window for critical security patches.

Companion index: [Operations docs](README.md).
