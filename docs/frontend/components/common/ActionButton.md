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
