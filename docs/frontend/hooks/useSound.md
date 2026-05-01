# useSound

`useSound` generates lightweight synthesized interaction feedback using the Web Audio API.

Supported sound types:
- `click`
- `success`
- `error`
- Skip playback gracefully when the browser blocks audio autoplay.

## Maintenance Note
- Revalidate browser autoplay handling whenever audio asset paths or playback defaults change.
- Re-test autoplay fallback notes whenever browser policy behavior changes.
- Verify mute toggle behavior after browser autoplay policy updates.
- Confirm suspended audio contexts are resumed or recreated safely after tab restores.
- Reconfirm autoplay fallback wording whenever browser policies shift.
