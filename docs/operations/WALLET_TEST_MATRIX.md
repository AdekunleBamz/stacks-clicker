# Wallet Test Matrix

- Test connect, reconnect, and disconnect flows on both desktop and mobile wallets.
- Validate click, tip, and poll transactions with the default wallet path.
- Retry the same actions after a page refresh to confirm session recovery.
- Record any wallet-specific warnings so support can reuse known workarounds.
- Capture wallet app/extension version details with each matrix run.
- Include at least one low-balance wallet scenario in matrix coverage.
- Include a burst-transaction run to verify client-side backoff behavior under provider limits.

Companion index: [Operations docs](README.md).
