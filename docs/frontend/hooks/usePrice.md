# usePrice

`usePrice` polls CoinGecko for STX USD value every 60 seconds.

Returned state:
- `price`
- `loading`
- `error`

Fetches are timeout-protected with `AbortController`.
