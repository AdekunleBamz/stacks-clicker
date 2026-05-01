# ClickerCard.test

Checks:
- Card copy rendering
- Expected button count
- Disconnected guard behavior
- Click/multiclick/ping callback invocation
- Loading-state disable behavior for each action button

## Maintenance Note
- Revalidate timer-related assertions whenever click cooldown semantics are adjusted.
- Add an assertion reminder for click cooldown edge paths during future test updates.
- Reconfirm click cooldown assertions after updating click batching behavior.
- Recheck cooldown assertions when click throttling configuration changes.
