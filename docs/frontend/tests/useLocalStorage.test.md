# useLocalStorage.test

Validates:
- Functional updates avoid stale state
- Storage-key removal restores initial value
- Malformed storage payloads are handled safely
- Same-tab custom event synchronization behavior

## Maintenance Note
- Add migration-case assertions whenever persisted storage schema evolves.

Source file: `frontend/src/tests/useLocalStorage.test.jsx`.

- Re-run migration-path assertions whenever local storage key versions change.
- Revalidate migration rollback tests when storage schema changes.
- Recheck migration and malformed-event coverage when storage logic evolves.
