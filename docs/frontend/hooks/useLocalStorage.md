# useLocalStorage

`useLocalStorage` syncs state with browser storage and listens to:
- `storage` (cross-tab updates)
- `local-storage` (same-tab custom updates)

Signature: `const [value, setValue] = useLocalStorage(key, initialValue)`.
