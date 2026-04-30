# useNetwork

`useNetwork` polls Hiro `/v2/info` every 30 seconds and returns:
- `blockHeight`
- `isConnected`
- `network`

Requests use abort timeouts to avoid hanging fetch calls.
Treat unknown network responses as degraded state instead of hard failure.

## Maintenance Note
- Keep fallback-network handling guidance synced with wallet provider updates.

- Reconfirm fallback network state behavior after polling logic updates.

- Recheck polling fallback copy after network provider endpoint changes.
- Reconfirm retry cadence does not overwhelm providers during prolonged outages.

### Maintenance Note
- Confirm network fallback behavior remains consistent with environment defaults.
