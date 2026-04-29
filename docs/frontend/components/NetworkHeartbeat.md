# NetworkHeartbeat

`NetworkHeartbeat.jsx` displays a small live-status affordance in the header.

It should remain non-blocking and decorative while still exposing readable status text for assistive technologies.
Avoid flashing animations during reconnect loops to reduce visual noise.

- Prefer plain status wording that matches wallet/network troubleshooting language.

- Re-test status wording when heartbeat polling cadence is adjusted.
