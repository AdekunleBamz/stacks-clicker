# Sound preference persistence

Sound settings should survive reloads without replaying audio unexpectedly.

- Persist mute state independently from wallet connection state.
- Respect reduced-motion and autoplay restrictions during startup.
- Verify the first user gesture still enables intentional sound playback.
