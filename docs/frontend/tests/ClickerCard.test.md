# ClickerCard.test

Checks:
- card copy rendering
- expected button count
- disconnected guard behavior
- click/multiclick/ping callback invocation
- loading-state disable behavior for each action button

## Maintenance Note
- Revalidate timer-related assertions whenever click cooldown semantics are adjusted.

- Add an assertion reminder for click cooldown edge paths during future test updates.

- Reconfirm click cooldown assertions after updating click batching behavior.
