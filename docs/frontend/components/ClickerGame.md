# ClickerGame

`ClickerGame.jsx` is a legacy full-card clicker implementation with:
- single click
- configurable multi-click
- heartbeat ping

It remains useful as a fallback or experimentation surface.
Treat this module as non-primary UI unless parity tests are updated.

- Mark legacy-only behavior changes clearly in release notes when this fallback view is touched.

- Re-run one keyboard-only click flow whenever control bindings change.

- Re-run mobile interaction smoke tests after adjusting click gesture handlers.

### Maintenance Note
- Validate ping and click action labels against the latest wallet flow wording.
- Audit prompt: retest ping and click labels after wallet copy updates.
