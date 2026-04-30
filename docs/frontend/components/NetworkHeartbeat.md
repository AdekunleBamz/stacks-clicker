# NetworkHeartbeat

`NetworkHeartbeat.jsx` displays a small live-status affordance in the header.

It should remain non-blocking and decorative while still exposing readable status text for assistive technologies.
Avoid flashing animations during reconnect loops to reduce visual noise.

- Prefer plain status wording that matches wallet/network troubleshooting language.

- Re-test status wording when heartbeat polling cadence is adjusted.

- Confirm heartbeat fallback text remains useful when API calls timeout.
- Add debounce or cooldown checks so reconnect indicators do not flicker on brief outages.

### Maintenance Note
- Validate heartbeat status copy against current API fallback behavior.
- Audit prompt: recheck heartbeat badge wording during API outage drills.
