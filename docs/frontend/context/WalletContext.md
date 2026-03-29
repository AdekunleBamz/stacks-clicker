# WalletContext

`WalletContext` manages wallet session state and exposes:
- `address`
- `isConnected`
- `connectWallet()`
- `disconnectWallet()`
- `appDetails`

It also listens for storage changes to stay in sync across tabs.
Treat missing provider state as disconnected and recover on next explicit connect.

## Maintenance Note
- Keep provider capability notes current when wallet SDK versions are upgraded.

Source file: `frontend/src/context/WalletContext.jsx`.
