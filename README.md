# Stacks Clicker v2 🚀

A premium, high-performance decentralized interaction hub on the Stacks blockchain. Built for speed, aesthetics, and seamless on-chain activity.

![App Icon](frontend/public/favicon.svg)

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
   cd stacks-clicker
   npm install
   npm run frontend:install
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
   npm run frontend:dev
   ```

## Technical Architecture 🏗️

Refer to [ARCHITECTURE.md](ARCHITECTURE.md) for a deep dive into the system design, provider hierarchy, and interaction patterns.

## Development & Performance 📈

This project includes a built-in performance monitor for developers. To activate it, add `?dev=true` to your local URL.

- **FPS Tracking**: Real-time frame rate monitoring.
- **Memory Profiling**: Heap usage tracking.
- **Interaction Logs**: Session-based transaction history.

## Security & Verification 🔑

Shared branch commits should be SSH signed before they are pushed. You can confirm the latest signature locally with `git log -1 --show-signature` and verify the pushed commit through GitHub's `Verified` badge.

## License 📄

MIT License. See [LICENSE](LICENSE) for details.

---
*Built with ❤️ by Antigravity - Advanced Agentic Coding @ Google DeepMind*
