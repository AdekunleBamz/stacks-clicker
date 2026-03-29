# useNetwork

`useNetwork` polls Hiro `/v2/info` every 30 seconds and returns:
- `blockHeight`
- `isConnected`
- `network`

Requests use abort timeouts to avoid hanging fetch calls.
Treat unknown network responses as degraded state instead of hard failure.

## Maintenance Note
- Keep fallback-network handling guidance synced with wallet provider updates.
- Confirm the Hiro API base URL switches correctly when `VITE_STACKS_NETWORK` changes.

Source file: `frontend/src/hooks/useNetwork.js`.
