# useClicker

`useClicker` wraps Clicker contract calls and tracks per-action loading state.

Exposed methods:
- `click()`
- `multiClick(amount)`
- `ping()`
- `isLoading(functionName)`
- `isLoading` expects contract function keys like `click` and `multi-click`.

## Maintenance Note
- Confirm cooldown math notes stay aligned with contract-side click throttling updates.
