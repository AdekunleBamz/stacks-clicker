# Wallet Balance Refresh Guard

- Avoid repeated balance refreshes while a read is already pending.
- Keep the last known balance visible with a stale label.
- Confirm refresh errors do not clear the connected wallet state.
