# Stacks Clicker 🚀

A premium, high-performance decentralized interaction hub on the Stacks blockchain. Built for speed, aesthetics, and seamless on-chain activity.

## Vision 🔗
Stacks Clicker aims to be more than just a game; it is a gateway for users to explore the Stacks ecosystem through simplified, gamified on-chain actions. By lowering the barrier to entry, we foster a more active and engaged Bitcoin L2 community.

![App Icon](frontend/public/favicon.svg)

## Project Structure 📁

- `contracts/`: Clarity smart contracts [detailed here](contracts/README.md).
- `frontend/`: React-based web application (Vite, Framer Motion).
- `deployments/`: Network-specific deployment plans.
- `settings/`: Clarinet network configuration files (simnet/devnet).
- `docs/`: Additional technical documentation and guides.
- `tests/`: Clarinet test suites for smart contracts.
- `CHANGELOG.md`: Chronological release and change history.
- `Makefile`: Root-level automation for development and deployment.

## Features 🌟

- **🎯 Power Clicker**: High-frequency on-chain clicker with "Turbo 10x" batching.
- **💰 TipJar**: Support creators and generate activity with quick and custom tips.
- **🗳️ QuickPoll**: Decentralized voting and poll creation for community engagement.
- **🔥 Interaction Streaks**: Gamified engagement tracking with earned achievement badges.
- **🌍 Multi-language**: Full I18n support including localization for English and Yoruba.
- **🛡️ Secure Wallet**: Seamless integration with the Stacks/Hiro wallet.
- **⚡ Performance First**: Zero-lag UI with glassmorphism, lazy loading, and memoized components.

## Getting Started 🛠️

### Prerequisites
- **Node.js**: v18.0.0 or higher (LTS recommended)
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Stacks Wallet**: Hiro Wallet, Leather, or Xverse extension
- **Clarinet**: Required for smart contract development and testing

### Local Discovery
- Clarinet is recommended for local smart contract testing and development.
- Docker is required for spinning up a local Stacks Devnet environment.

### Smart Contract Development (Optional)
If you wish to modify, test, or deploy the Stacks smart contracts locally:
1. Initialize the local devnet container:
   ```bash
   clarinet integrate
   ```
2. Run the test suite:
   ```bash
   clarinet test
   ```
3. Check contract syntax and static analysis rules:
   ```bash
   clarinet check
   ```

### Frontend Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AdekunleBamz/stacks-clicker.git
   ```
2. Install dependencies:
   ```bash
   cd stacks-clicker
   npm install
   npm run frontend:install
   ```
   Note: `npm ci` is recommended for deterministic installs. Use `npm install` for manual package updates.
   From the project root, you can also use:
   ```bash
   npm run frontend:install
   npm run frontend:dev
   ```
3. Configure environment variables:
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_STACKS_NETWORK=mainnet
   VITE_DEPLOYER_ADDRESS=SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT
   VITE_COINGECKO_API_KEY=your_api_key_here
   ```
   Set `VITE_DEPLOYER_ADDRESS` to the principal that deployed the app contracts.
   Optional values such as `VITE_STACKS_NETWORK`, `VITE_DEPLOYER_ADDRESS`, and `VITE_COINGECKO_API_KEY` are documented in `frontend/.env.example`.
4. Start the development server:
   ```bash
   npm run frontend:dev
   ```
   ```bash
   npm run build
   ```

## UX & Accessibility Enhancements

This project has undergone a comprehensive 94-PR improvement cycle focusing on:
- **ARIA Compliance**: Full semantic HTML5 and WAI-ARIA role coverage.
- **Keyboard Navigation**: Optimized focus management and global escape-key handlers.
- **Motion Design**: Standardized cubic-bezier transitions and reduced-motion support.
- **Loading UX**: Robust skeleton loaders, shimmers, and pulse animations for all network states.
- **Error Handling**: Graceful error boundaries and contextual validation feedback.

### ⚡ Quick Setup

```bash
# Clone
git clone https://github.com/AdekunleBamz/stacks-clicker.git && cd stacks-clicker

# Install & Run
npm run frontend:install && cp frontend/.env.example frontend/.env && npm run frontend:dev

# Run frontend tests
npm run frontend:test:run

# Run fast frontend smoke checks
npm run frontend:smoke

# Run quick repo validation
npm run check:fast

# Run full contract + frontend validation
npm run check
```

## Key Interactions 🎮

| Feature | Action | Reward | Shortcut |
| :--- | :--- | :--- | :--- |
| **Power Clicker** | On-chain Click | Clicks + Streaks | `C` |
| **TipJar** | STX Donation | Karma + Activity | `T` |
| **QuickPoll** | Governance Vote | Voice + Influence | - |

## Security & Verification 🔑

Shared branch commits should be signed (SSH or GPG) before they are pushed. You can confirm the latest signature locally with `git log -1 --show-signature` and verify the pushed commit through GitHub's `Verified` badge.

## Troubleshooting 🔍

- **Blank QR Code**: Ensure `VITE_WALLETCONNECT_PROJECT_ID` is correctly set in your `.env` file and that you have a stable internet connection.
- **Transaction Failed**: Check if you have enough STX for gas fees. Re-connecting your wallet can often resolve stale session issues.
- **Nonce Out of Sync**: If transactions fail with a "nonce" error, try manually incrementing the nonce in your wallet settings or wait a few minutes for the network to sync.
- **Contract Not Found**: Ensure you are on the correct network (Mainnet vs Testnet) by checking the toggle in the app header and your wallet extension.
- **UI Not Updating**: Try a hard refresh (`Cmd+Shift+R` or `Ctrl+F5`) to clear the local cache and reload the latest assets.
- **Wrong Network Explorer Link**: Confirm `VITE_STACKS_NETWORK` in `frontend/.env` matches the wallet network before retesting.

## License 📄

MIT License. See [LICENSE](LICENSE) for details.

---
