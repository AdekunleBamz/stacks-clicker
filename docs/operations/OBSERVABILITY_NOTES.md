# Observability Notes

Track these signals during runtime checks:
- WalletConnect success/cancel rates
- Transaction submission feedback accuracy
- Frontend error boundary trigger frequency
- Transaction confirmation latency from submit to on-chain success
- Upstream API rate-limit (`429`) frequency during peak interaction windows
- Compare runtime signals against a recent baseline window before escalating anomalies
- Monitor wallet reconnect success rate after browser refresh across supported wallets
- Watch for sudden drops in click submission success after wallet extension updates

Companion index: [Operations docs](README.md).

### Signal Reminder
- Track API latency spikes alongside rate-limit warnings during incident triage.
