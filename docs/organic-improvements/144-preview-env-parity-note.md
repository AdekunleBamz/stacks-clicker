# Preview Env Parity

## Summary
Preview deployments should document which client-safe environment variable names match production before QA starts.

## Checks
- Compare preview and production variable names without copying secret values into notes.
- Confirm wallet network labels match the selected `VITE_STACKS_NETWORK`.
- Record any intentional preview-only overrides in release handoff notes.
