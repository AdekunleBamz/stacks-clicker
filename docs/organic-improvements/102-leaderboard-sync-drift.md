# Leaderboard Sync Drift

## Summary
Leaderboard rows should explain when scores may lag behind recently submitted click transactions.

## Checks
- Compare local click totals with the displayed leaderboard after a write.
- Confirm refresh controls do not reset local progress.
- Note any expected indexer delay in QA handoff notes.
