# Hydration Safe Local State

## Summary
Local-only state should not cause hydration mismatches in wallet, theme, or onboarding UI.

## Checks
- Refresh pages with stored wallet and theme preferences.
- Confirm server-rendered fallback copy is stable.
- Recheck after adding new local storage reads.
