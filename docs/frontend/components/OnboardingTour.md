# OnboardingTour

`OnboardingTour.jsx` presents first-run guidance and persists completion in local storage (`hasSeenTour`).

Interaction model:
- click backdrop to dismiss
- skip or next through predefined steps
- auto-opens after a short delay for first-time users
- keep step copy stable to preserve screenshot-based help docs

- Persist dismissal state only after explicit user intent to avoid hiding first-run guidance accidentally.

Source file: `frontend/src/components/OnboardingTour.jsx`.

- Re-test skip and dismiss persistence when onboarding step order changes.

- Recheck focus restoration targets when onboarding steps are reordered.

### Maintenance Note
- Verify dismissal persistence still works after onboarding flow updates.
- Audit prompt: retest dismissal persistence across storage migration changes.
