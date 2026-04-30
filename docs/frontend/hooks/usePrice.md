# usePrice

`usePrice` polls CoinGecko for STX USD value every 60 seconds.

Returned state:
- `price`
- `loading`
- `error`

Fetches are timeout-protected with `AbortController`.
Render fallbacks when `price` is unavailable instead of blocking interactions.

## Maintenance Note
- Reconfirm staleness threshold guidance when price source refresh cadence changes.

- Recheck staleness threshold assumptions when price provider limits change.

- Revalidate stale data handling when refresh interval values are tuned.
- Ensure stale-price indicators are shown before cached values drift too far.

### Maintenance Note
- Recheck staleness thresholds after changing refresh cadence or API providers.
