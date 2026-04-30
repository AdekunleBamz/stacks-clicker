# format.js

`format.js` provides display helpers for addresses, counts, and STX amounts.

Exported helpers:
- `truncateAddress(address, options)`
- `formatNumber(value, options)`
- `formatNumberCompact(value, decimals)`
- `formatStx(microStx)`
- `formatCompact(value)`
- `formatPercent(value, decimals)`
- `normalizeDecimalPlaces(value, fallback)`
- `formatDuration(ms)`

Behavior notes:
- `formatNumber`, `formatStx`, and other helpers return safe fallback strings for non-finite input.
- `truncateAddress` returns the original address unchanged if it is shorter than the combined prefix/suffix length.

## Maintenance Note
- Keep truncation examples synced with `frontend/src/utils/__tests__/format.test.js`.

Source file: `frontend/src/utils/format.js`.

- Revalidate rounding expectations when displayed token precision rules change.

- Reconfirm number formatting edge cases for very small STX values.

### Maintenance Note
- Revalidate bigint and locale formatting examples during utility updates.
