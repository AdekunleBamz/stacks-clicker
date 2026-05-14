# App Shell No Wallet Route

## Summary
Routes that do not require a wallet should remain readable before connection.

## Checks
- Load the app in a fresh profile with no wallet connected.
- Confirm public cards do not show broken balances.
- Keep connect prompts scoped to actions that need signing.
