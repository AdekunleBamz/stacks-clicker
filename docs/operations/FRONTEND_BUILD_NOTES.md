# Frontend Build Notes

Reference for building, troubleshooting, and optimizing the frontend.

If build hangs locally, kill stale vite processes before retrying.
Capture the failing package/version from terminal output before clearing caches.
When lockfiles change, re-run `npm ci` before retrying a failed production build.
Confirm the active Node.js version matches project expectations before retrying repeated build failures.
If a build fails only in CI, compare local and CI environment variable sets before retrying.

Companion index: [Operations docs](README.md).

### Build Reminder
- Capture the exact node and npm versions used for reproducible frontend builds.
- Record build artifact checksum or commit hash in release handoff notes.
