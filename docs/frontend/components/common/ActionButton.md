# ActionButton

`ActionButton.jsx` is the main reusable animated action control.

Key props:
- `label`, `icon`, `onClick`
- `isLoading`, `disabled`, `isError`
- `cost` (secondary fee/value text)

It exposes built-in loading and shake-on-error affordances.
Provide an accessible label when icon-only variants are introduced.

## Maintenance Note
- Keep loading/disabled state guidance synchronized with async action patterns.

- Re-test loading label clarity whenever async button states are renamed.

- Ensure loading text remains specific to the action being executed.
- Recheck disabled-state helper text so blocked actions still communicate next steps.
