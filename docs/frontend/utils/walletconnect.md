# walletconnect.js

`walletconnect.js` wraps WalletConnect provider setup and Stacks RPC helpers.

Primary APIs include:
- `initProvider()`
- `wcConnect(onDisplayUri)`
- `getAddresses()`
- `callContract(payload)`
- `transferStx(recipient, amount, memo)`
- `getWalletConnectLink(wcUri)`

Behavior notes:
- Uses env-driven `STACKS_NETWORK` to choose the Stacks chain ID.
- `getWalletConnectLink` trims and URL-encodes WC URIs for camera-friendly links.
- `getWalletConnectLink` ignores non-`wc:` values to avoid generating invalid camera links.
- `getWalletConnectLink` normalizes `WC:` and `wc:` schemes to lowercase before encoding.
- `callContract` applies temporary per-call backoff after rate-limit/chaining broadcast errors.
- Default fallback waits are 8 seconds for `TooMuchChaining` and 15 seconds for generic rate-limit failures.

## Maintenance Note
- Keep helper behavior synchronized with `frontend/src/utils/__tests__/walletconnect.test.js`.

Source file: `frontend/src/utils/walletconnect.js`.

- Re-test session parsing notes after walletconnect protocol updates.

- Recheck session namespace parsing rules when walletconnect upgrades land.
