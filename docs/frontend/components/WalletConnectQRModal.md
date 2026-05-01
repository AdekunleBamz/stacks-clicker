# WalletConnectQRModal

`WalletConnectQRModal.jsx` presents WalletConnect pairing details:
- QR code for desktop-to-mobile pairing
- Deep-link fallback for mobile wallet apps
- Close controls via backdrop or close button
- Surface pairing timeout hints when session approval takes too long

## Maintenance Note
- Reconfirm QR session-expiry wording when WalletConnect timeout defaults are updated.
- Reconfirm QR session expiry messaging whenever WalletConnect behavior changes.
- Re-test QR fallback actions after WalletConnect modal style updates.
- Keep deep-link fallback visible when camera scanning is unavailable or blocked.
- Re-verify modal focus behavior after wallet connector SDK upgrades.
