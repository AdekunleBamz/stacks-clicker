# TransactionHistory

`TransactionHistory.jsx` provides searchable activity history with:
- status filtering
- JSON/CSV export
- context menu actions
- modal detail view (summary/raw)

It expects `txLog` entries with at least `id`, `action`, `status`, and `time`.
Treat unknown status values as neutral badges instead of dropping entries.
- Keep exported timestamps timezone-aware so support teams can correlate incidents accurately.

## Maintenance Note
- Re-check filter and sort behavior notes when history query defaults change.
