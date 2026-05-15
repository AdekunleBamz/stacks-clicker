# Clicker Build Artifact Check

## Summary
Frontend release prep should include a quick scan for generated build artifacts before committing.

## Checks
- Run `git status --short` after `npm run build`.
- Leave Vite `dist/` output out of source commits unless intentionally tracked.
- Confirm production build warnings are captured in handoff notes.
