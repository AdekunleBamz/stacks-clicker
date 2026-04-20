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
- Include shell/runtime version details when setup issues are reported.

Companion index: [Operations docs](README.md).
