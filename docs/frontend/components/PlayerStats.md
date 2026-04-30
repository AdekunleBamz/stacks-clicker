# PlayerStats

`PlayerStats.jsx` maps aggregate session data into `StatsCard` tiles.

Current card set:
- total clicks
- total tips
- total votes
- session transaction count

`useMemo` is used to keep card definitions stable between renders.
Keep stat labels consistent with transaction history terminology.

- Keep stat labels synchronized with transaction history terminology for easier cross-reference.

- Reconfirm value formatting consistency when stats derivation logic changes.

- Confirm stat labels stay consistent between compact and expanded layouts.

### Maintenance Note
- Revisit number formatting examples when telemetry units are updated.
