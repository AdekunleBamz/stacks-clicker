# Local Setup Troubleshooting

Common issues and solutions for local development setup.

## Environment Setup

### Node.js Version
- Ensure Node.js version is compatible with frontend tooling.
- Check version with: `node --version`
- Use nvm: `nvm use` to switch to the correct version from `.nvmrc`.

### Dependencies
- Reinstall dependencies when lockfiles change: `npm ci`
- Clear npm cache if issues persist: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm ci`

## Environment Variables

- Confirm `.env` variables are present before wallet tests.
- Copy `.env.example` to `.env` and fill in required values.
- Restart dev server after env changes: `npm run dev`

## Wallet Connection Issues

- Clear cached browser wallet sessions when connect state appears stale.
- Check browser extension is installed and unlocked.
- Verify wallet is connected to correct network (mainnet/testnet).
- Try disconnecting and reconnecting the wallet.
- Confirm system clock is accurate when wallet signatures appear to fail unexpectedly.

## Common Issues

| Issue | Solution |
| :--- | :--- |
| Port already in use | Change port in vite config or kill process on port 5173 |
| Module not found | Run `npm ci` to sync dependencies with the lockfile |
| Wallet not connecting | Clear browser cache and wallet extension data |
| Build fails | Clear Vite cache: `rm -rf node_modules/.vite` |

## Reporting Issues

When reporting setup issues, include:
- Shell/runtime version details (`node --version`, `npm --version`)
- Operating system and version
- Browser and wallet extension version
- Steps to reproduce the issue

---

Companion index: [Operations docs](README.md).

### Setup Reminder
- Re-run installation checks with npm ci after lockfile updates to isolate env drift.
