# WalletConnect Notes

- Validate project ID configuration before connection debugging.
- Ensure required namespaces include Stacks methods.
- Keep QR modal path available as pairing fallback.
- Log only non-sensitive session diagnostics.
- Re-test reconnect behavior after wallet app version upgrades.
- Check for chain/network mismatches first when sessions connect but contract calls fail.
- Confirm session expiry copy clearly tells users when a fresh pairing is required.

Companion index: [Operations docs](README.md).

### WalletConnect Reminder
- Validate project id, chain, and redirect metadata together during setup checks.
- Recheck deep-link behavior on both iOS and Android wallet app flows.
