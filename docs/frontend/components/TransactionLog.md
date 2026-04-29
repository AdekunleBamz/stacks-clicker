# TransactionLog

`TransactionLog.jsx` is a compact transaction feed variant used for simple history display.

It maps statuses to icons and links confirmed tx IDs to the Hiro explorer.
Prefer this view for lightweight embeds where filters/export are unnecessary.

## Maintenance Note
- Revisit retention and truncation notes if log paging strategy changes.

- Revisit retention assumptions when transaction log persistence changes.

- Reconfirm retention wording if log pruning behavior changes.
