# Environment Variables

Manage environment configuration for the Stacks Clicker frontend.

## Setup

Quick reference:

| Variable | Required | Notes |
|----------|----------|-------|
| `VITE_WALLETCONNECT_PROJECT_ID` | Yes | Required for wallet pairing and QR flow |
| `VITE_DEBUG` | No | Enables verbose debug logging |
| `VITE_STACKS_NETWORK` | No | Defaults to `mainnet` when omitted |
| `VITE_DEPLOYER_ADDRESS` | No | Defaults to the value shipped in `frontend/.env.example` |
| `VITE_COINGECKO_API_KEY` | No | Enables higher-limit price lookups |

Before local startup:
- verify required variables are present
- confirm the selected network matches your wallet network
- keep separate `.env` snapshots per network when switching frequently during QA
- confirm wallet address and deployer address expectations are aligned for the chosen network

Keep secrets in local `.env` files and never commit sensitive values.
Document new variables in `frontend/.env.example` as soon as they are introduced.

Companion index: [Operations docs](README.md).
