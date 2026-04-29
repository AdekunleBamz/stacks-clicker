# TransactionHistory

`TransactionHistory.jsx` renders the local transaction log with per-entry status tracking:
- Shows submitted, mempool, and confirmed progress steps
- Links confirmed transactions to the Hiro Explorer
- Displays skeleton loaders when the log is empty

It expects `txLog` entries with at least `id`, `action`, `status`, and `time`.
Treat unknown status values as neutral badges instead of dropping entries.

## Maintenance Note
- Re-check filter and sort behavior notes when history query defaults change.

- Revalidate sorting and filtering defaults when history controls expand.
