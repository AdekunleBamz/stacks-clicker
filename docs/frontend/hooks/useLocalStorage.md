# useLocalStorage

`useLocalStorage` syncs state with browser storage and listens to:
- `storage` (cross-tab updates)
- `local-storage` (same-tab custom updates)

Signature: `const [value, setValue] = useLocalStorage(key, initialValue)`.
Prefer JSON-safe values to keep parsing and migration predictable.

## Maintenance Note
- Keep key versioning notes updated when persisted shape or migration logic changes.
- Revisit key versioning notes whenever storage migrations are introduced.
- Keep migration notes updated when stored value shapes are expanded.
- Recheck quota-exceeded fallback handling to avoid hard failures on write.
- Revisit key versioning notes whenever storage schema changes are introduced.
