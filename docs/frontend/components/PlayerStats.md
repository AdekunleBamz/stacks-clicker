# PlayerStats

`PlayerStats.jsx` maps aggregate session data into `StatsCard` tiles.

Current card set:
- Total clicks
- Total tips
- Total votes
- Session transaction count

`useMemo` is used to keep card definitions stable between renders.
Keep stat labels consistent with transaction history terminology.

## Maintenance Note
- Keep stat labels synchronized with transaction history terminology for easier cross-reference.
- Reconfirm value formatting consistency when stats derivation logic changes.
- Confirm stat labels stay consistent between compact and expanded layouts.
- Keep rounding rules consistent across cards so totals match transaction log expectations.
- Revisit number formatting examples when telemetry units are updated.
- Audit prompt: confirm stat units remain clear in all supported locales.
