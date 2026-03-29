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
- Keep fallback behavior documented for cases where API keys or rate limits block price fetches.

Source file: `frontend/src/hooks/usePrice.js`.
