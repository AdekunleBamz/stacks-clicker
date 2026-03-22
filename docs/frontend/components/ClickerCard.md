# ClickerCard

`ClickerCard.jsx` wraps clicker interactions in an `ActionCard`.

Primary actions:
- `Express Click` -> `clicker.click()`
- `Turbo 10x` -> `clicker.multiClick(10)`
- `Network Ping` -> `clicker.ping()`

A connected address is required; disconnected actions trigger error feedback.
Keep button disabled/loading state tied to hook-level function keys.

- Align displayed action cost labels with current on-chain fee assumptions before each release.
