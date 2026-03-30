# WalletConnect Notes

- Validate project ID configuration before connection debugging.
- Ensure required namespaces include Stacks methods.
- Keep QR modal path available as pairing fallback.
- Log only non-sensitive session diagnostics.
- Re-test reconnect behavior after wallet app version upgrades.
- Check for chain/network mismatches first when sessions connect but contract calls fail.
- Document provider quota and chaining errors separately from contract logic failures during triage.

Companion index: [Operations docs](README.md).
