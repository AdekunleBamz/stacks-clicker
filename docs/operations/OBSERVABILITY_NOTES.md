# Observability Notes

Track these signals during runtime checks:
- wallet connect success/cancel rates
- transaction submission feedback accuracy
- frontend error boundary trigger frequency
- transaction confirmation latency from submit to on-chain success
- upstream API rate-limit (`429`) frequency during peak interaction windows
- compare runtime signals against a recent baseline window before escalating anomalies
- monitor wallet reconnect success rate after browser refresh across supported wallets

Companion index: [Operations docs](README.md).

### Signal Reminder
- Track API latency spikes alongside rate-limit warnings during incident triage.
