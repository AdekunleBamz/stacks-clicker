# useLocalStorage.test

Validates:
- functional updates avoid stale state
- storage-key removal restores initial value
- malformed storage payloads are handled safely
- same-tab custom event synchronization behavior

## Maintenance Note
- Add migration-case assertions whenever persisted storage schema evolves.
