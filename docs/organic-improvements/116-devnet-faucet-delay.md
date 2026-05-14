# Devnet Faucet Delay

## Summary
Devnet faucet delays should be called out when QA wallets need funds before contract interactions.

## Checks
- Fund wallets before running interaction smoke tests.
- Confirm pending faucet transactions are visible in notes.
- Avoid blocking frontend build checks on faucet availability.
