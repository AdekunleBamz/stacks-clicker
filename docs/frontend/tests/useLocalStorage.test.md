# useLocalStorage.test

Validates:
- functional updates avoid stale state
- storage-key removal restores initial value
- malformed storage payloads are handled safely
- same-tab custom event synchronization behavior

## Maintenance Note
- Add migration-case assertions whenever persisted storage schema evolves.

Source file: `frontend/src/tests/useLocalStorage.test.jsx`.

- Re-run migration-path assertions whenever local storage key versions change.

- Revalidate migration rollback tests when storage schema changes.

### Maintenance Note
- Recheck migration and malformed-event coverage when storage logic evolves.
