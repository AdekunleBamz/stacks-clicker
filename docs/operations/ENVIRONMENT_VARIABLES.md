# Environment Variables

Manage environment configuration for the Stacks Clicker frontend.

## Setup

Start from `frontend/.env.example` when creating a local frontend `.env` file:

```bash
cp frontend/.env.example frontend/.env
```

## Frontend Variables

### Required Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_WALLETCONNECT_PROJECT_ID` | WalletConnect / Reown project identifier | `your-project-id` |

### Optional Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_DEBUG` | Enables verbose debug logging | `false` |
| `VITE_STACKS_NETWORK` | Network override (mainnet/testnet) | `mainnet` |
| `VITE_COINGECKO_API_KEY` | Key for price lookup integrations | - |

## Quick Reference

| Variable | Required | Notes |
| :--- | :--- | :--- |
| `VITE_WALLETCONNECT_PROJECT_ID` | Yes | Required for wallet pairing and QR flow |
| `VITE_DEBUG` | No | Enables verbose debug logging |
| `VITE_STACKS_NETWORK` | No | Defaults to `mainnet` when omitted |
| `VITE_DEPLOYER_ADDRESS` | No | Defaults to the value shipped in `frontend/.env.example` |
| `VITE_COINGECKO_API_KEY` | No | Enables higher-limit price lookups |

## Pre-Startup Checklist

Before local startup:
1. Verify required variables are present in `.env`
2. Confirm the selected network matches your wallet network
3. Restart dev server after any `.env` changes

## Security Guidelines

- Keep secrets in local `.env` files
- Never commit sensitive values to version control
- Rotate API keys regularly
- Use different project IDs for development and production

## Adding New Variables

When introducing new environment variables:
1. Add to `frontend/.env.example` with a default value
2. Document in this file with description and usage
3. Update the variable table above
4. Ensure `.env` is in `.gitignore`

---

Companion index: [Operations docs](README.md).
