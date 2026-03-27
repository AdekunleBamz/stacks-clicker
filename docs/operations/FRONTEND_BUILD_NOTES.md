# Frontend Build Notes

Build command:
- `cd frontend && npm run build`

If build hangs locally, kill stale vite processes before retrying.
Capture the failing package/version from terminal output before clearing caches.
When lockfiles change, re-run `npm ci` before retrying a failed production build.

Companion index: [Operations docs](README.md).
