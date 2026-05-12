# Local storage quota fallback

Keep storage-quota behavior in regression notes so history, preferences, and onboarding state degrade gracefully when local storage is full.

## Checklist

- Simulate a storage quota failure in a browser profile.
- Confirm the app still renders and shows a recoverable message for saved preferences.
