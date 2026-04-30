# WalletConnectQRModal

`WalletConnectQRModal.jsx` presents WalletConnect pairing details:
- QR code for desktop-to-mobile pairing
- deep link fallback for mobile wallet apps
- close controls via backdrop or close button
- surface pairing timeout hints when session approval takes too long

## Maintenance Note
- Reconfirm QR session-expiry wording when walletconnect timeout defaults are updated.

- Reconfirm QR session expiry messaging whenever walletconnect behavior changes.

- Re-test QR fallback actions after walletconnect modal style updates.
- Keep deep-link fallback visible when camera scanning is unavailable or blocked.

### Maintenance Note
- Re-verify modal focus behavior after wallet connector SDK upgrades.
