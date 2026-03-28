# Environment Variables

Start from `frontend/.env.example` when creating a local frontend `.env` file.

Frontend variables currently in use:
- `VITE_WALLETCONNECT_PROJECT_ID`: required WalletConnect / Reown project identifier.
- `VITE_DEBUG`: optional flag for verbose wallet integration logging.
- `VITE_STACKS_NETWORK`: optional network override, defaults to `mainnet`.
- `VITE_COINGECKO_API_KEY`: optional key for price lookup integrations.

Quick reference:

| Variable | Required | Notes |
|----------|----------|-------|
| `VITE_WALLETCONNECT_PROJECT_ID` | Yes | Required for wallet pairing and QR flow |
| `VITE_DEBUG` | No | Enables verbose debug logging |
| `VITE_STACKS_NETWORK` | No | Defaults to `mainnet` when omitted |
| `VITE_COINGECKO_API_KEY` | No | Enables higher-limit price lookups |

Before local startup:
- verify required variables are present
- confirm the selected network matches your wallet network

Keep secrets in local `.env` files and never commit sensitive values.
Document new variables in `frontend/.env.example` as soon as they are introduced.

Companion index: [Operations docs](README.md).
