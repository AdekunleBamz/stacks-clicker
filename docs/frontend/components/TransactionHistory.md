# TransactionHistory

`TransactionHistory.jsx` renders the local transaction log with per-entry status tracking:
- Shows submitted, mempool, and confirmed progress steps
- Links confirmed transactions to the Hiro Explorer
- Displays skeleton loaders when the log is empty

It expects `txLog` entries with at least `id`, `action`, `status`, and `time`.
Treat unknown status values as neutral badges instead of dropping entries.
Prefer locale-aware timestamp formatting so support logs align with user-reported local times.

## Maintenance Note
- Re-check filter and sort behavior notes when history query defaults change.

- Revalidate sorting and filtering defaults when history controls expand.

- Recheck pagination and filtering interplay after history UI updates.

### Maintenance Note
- Verify explorer links and network fallbacks after every wallet flow update.
