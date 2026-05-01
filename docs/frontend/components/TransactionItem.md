# TransactionItem

`TransactionItem.jsx` renders one history entry with:
- Swipe affordances
- Status progression indicator
- Optional explorer deep-link
- Context menu callback integration
- Keep swipe gestures optional on desktop-focused interaction paths

## Maintenance Note
- Revalidate status-badge wording when transaction lifecycle states are expanded.

Source file: `frontend/src/components/TransactionItem.jsx`.

- Recheck status badge wording during transaction state model changes.
- Validate transaction status icon meaning when new states are added.
- Confirm explorer links are hidden or disabled for entries without finalized transaction IDs.
- Recheck transaction status badge copy for consistency with failure playbooks.
