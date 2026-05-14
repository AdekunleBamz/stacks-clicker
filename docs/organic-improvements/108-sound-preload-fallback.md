# Sound Preload Fallback

## Summary
Sound effects should degrade quietly when a browser blocks preload or autoplay behavior.

## Checks
- Test with sound enabled before the first user gesture.
- Confirm muted and reduced-motion preferences stay independent.
- Verify failed sound loads do not block click interactions.
