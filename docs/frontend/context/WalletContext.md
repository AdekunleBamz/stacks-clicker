# WalletContext

`WalletContext` manages wallet session state and exposes:
- `address`
- `isConnected`
- `connectWallet()`
- `disconnectWallet()`
- `appDetails`

It also listens for storage changes to stay in sync across tabs.
Treat missing provider state as disconnected and recover on next explicit connect.
