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

Source file: `frontend/src/utils/walletconnect.js`.
