# OnboardingTour

`OnboardingTour.jsx` presents first-run guidance and persists completion in local storage (`hasSeenTour`).

Interaction model:
- Click backdrop to dismiss
- Skip or next through predefined steps
- Auto-opens after a short delay for first-time users
- Keep step copy stable to preserve screenshot-based help docs

- Persist dismissal state only after explicit user intent to avoid hiding first-run guidance accidentally.

Source file: `frontend/src/components/OnboardingTour.jsx`.

## Maintenance Note
- Re-test skip and dismiss persistence when onboarding step order changes.
- Recheck focus restoration targets when onboarding steps are reordered.
- Verify local-storage write failures do not trap users in repeated onboarding loops.
- Verify dismissal persistence still works after onboarding flow updates.
- Audit prompt: retest dismissal persistence across storage migration changes.
