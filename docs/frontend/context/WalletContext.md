# WalletContext

`WalletContext` manages wallet session state and exposes:
- `address`
- `isConnected`
- `isConnecting`
- `connectWallet()`
- `disconnectWallet()`
- `appDetails`

It also listens for storage changes to stay in sync across tabs.
Treat missing provider state as disconnected and recover on next explicit connect.

## Maintenance Note
- Keep provider capability notes current when wallet SDK versions are upgraded.
- Recheck reconnect state transitions when wallet adapters are upgraded.
- Recheck wallet provider cleanup on unmount during adapter updates.
- Confirm wallet provider capability notes match currently supported extensions.
