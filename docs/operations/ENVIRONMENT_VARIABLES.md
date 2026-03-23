# Environment Variables

Start from `frontend/.env.example` when creating a local frontend `.env` file.

Frontend variables currently in use:
- `VITE_WALLETCONNECT_PROJECT_ID`: required WalletConnect / Reown project identifier.
- `VITE_DEBUG`: optional flag for verbose wallet integration logging.
- `VITE_STACKS_NETWORK`: optional network override, defaults to `mainnet`.
- `VITE_COINGECKO_API_KEY`: optional key for price lookup integrations.

Keep secrets in local `.env` files and never commit sensitive values.
Document new variables in `frontend/.env.example` as soon as they are introduced.

Companion index: [Operations docs](README.md).
