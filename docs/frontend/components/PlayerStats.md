# PlayerStats

`PlayerStats.jsx` maps aggregate session data into `StatsCard` tiles.

Current card set:
- total clicks
- total tips
- total votes
- session transaction count

`useMemo` is used to keep card definitions stable between renders.
Keep stat labels consistent with transaction history terminology.

Source file: `frontend/src/components/PlayerStats.jsx`.
