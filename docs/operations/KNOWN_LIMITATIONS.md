# Known Limitations

- Some runtime metrics rely on browser-specific APIs.
- Explorer URLs are currently mainnet-oriented.
- Advanced wallet flows depend on wallet provider support.
- Heavy transaction bursts can still hit external API rate limits.
- Client-side broadcast backoff reduces repeated quota failures but cannot bypass provider-enforced limits.
- Add a next-review date whenever introducing a new known limitation.
- Note whether each limitation is mainnet-only, testnet-only, or network-agnostic.
- Pair each limitation with the customer-facing workaround used by support.

Companion index: [Operations docs](README.md).

### Scope Reminder
- Note whether a limitation is testnet-only, mainnet-only, or shared across networks.
- Link each limitation to a tracking issue or roadmap item when available.
