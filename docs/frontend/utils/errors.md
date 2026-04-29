# errors.js

`errors.js` converts raw wallet/contract failures into user-facing copy.

Primary API:
- `parseContractError(error)`

Behavior notes:
- Numeric codes (`100`, `101`, `401`, etc.) map to stable canned messages.
- String heuristics (`user rejected`, `insufficient`) provide fallback mapping when no code is present.
- Unknown errors return a bounded fallback string prefixed with `Transaction failed:`.
- Rate-limit/backoff messages are passed through directly so retry timing remains visible.

## Maintenance Note
- Keep mappings and fallback expectations aligned with `frontend/src/utils/__tests__/errors.test.js`.

Source file: `frontend/src/utils/errors.js`.

- Recheck error normalization examples when wallet or provider error shapes evolve.
