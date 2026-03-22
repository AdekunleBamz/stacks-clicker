# Stacks Clicker 🚀

A premium, high-performance decentralized interaction hub on the Stacks blockchain. Built for speed, aesthetics, and seamless on-chain activity.

![App Icon](frontend/public/favicon.svg)

## Project Structure 📁

- `contracts/`: Clarity smart contracts for the Stacks blockchain.
- `frontend/`: React-based web application (Vite, Framer Motion).
- `deployments/`: Network-specific deployment plans.
- `docs/`: Additional technical documentation and guides.
- `tests/`: Clarinet test suites for smart contracts.
- `Makefile`: Root-level automation for development and deployment.

## Features 🌟

- **🎯 Power Clicker**: High-frequency on-chain clicker with "Turbo 10x" batching.
- **💰 TipJar**: Support creators and generate activity with quick and custom tips.
- **🗳️ QuickPoll**: Decentralized voting and poll creation for community engagement.
- **🔥 Interaction Streaks**: Gamified engagement tracking with earned achievement badges.
- **🌍 Multi-language**: Full I18n support including localization for Yoruba and English.
- **🛡️ Secure Wallet**: Seamless integration with the Stacks/Hiro wallet.
- **⚡ Performance First**: Zero-lag UI with glassmorphism, lazy loading, and memoized components.

## Getting Started 🛠️

### Prerequisites
- Node.js (v18+)
- Stacks Wallet (Hiro/Leather)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AdekunleBamz/stacks-clicker.git
   ```
2. Install dependencies:
   ```bash
   cd stacks-clicker/frontend
   npm install
   ```
   For reproducible CI/local parity, you can use `npm ci` instead.
3. Configure environment variables:
   Copy the example file in the `frontend` directory and update the required values:
   ```bash
   cp .env.example .env
   ```
   ```env
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
   VITE_DEBUG=true
   ```
   Optional values such as `VITE_STACKS_NETWORK` and `VITE_COINGECKO_API_KEY` are documented in `frontend/.env.example`.
4. Start the development server:
   ```bash
   npm run dev
   ```

### ⚡ Quick Setup

```bash
# Clone
git clone https://github.com/AdekunleBamz/stacks-clicker.git && cd stacks-clicker/frontend

# Install & Run
npm install && cp .env.example .env && npm run dev
```

## Key Interactions 🎮

| Feature | Action | Reward | Shortcut |
| :--- | :--- | :--- | :--- |
| **Power Clicker** | On-chain Click | Clicks + Streaks | `C` |
| **TipJar** | STX Donation | Karma + Activity | `T` |
| **QuickPoll** | Governance Vote | Voice + Influence | - |

## Technical Architecture 🏗️

## Security & Verification 🔑

Shared branch commits should be SSH signed before they are pushed. You can confirm the latest signature locally with `git log -1 --show-signature` and verify the pushed commit through GitHub's `Verified` badge.

## License 📄

MIT License. See [LICENSE](LICENSE) for details.

---
*Built with ❤️ by Antigravity - Advanced Agentic Coding @ Google DeepMind*
