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
   cd stacks-clicker/frontend
   npm install
   ```
   For reproducible CI/local parity, you can use `npm ci` instead.
3. Configure environment variables:
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_STACKS_NETWORK=mainnet
   VITE_COINGECKO_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Technical Architecture 🏗️

Refer to [ARCHITECTURE.md](ARCHITECTURE.md) for a deep dive into the system design, provider hierarchy, and interaction patterns.

## Development & Performance 📈

This project includes a built-in performance monitor for developers. To activate it, add `?dev=true` to your local URL.

- **FPS Tracking**: Real-time frame rate monitoring.
- **Memory Profiling**: Heap usage tracking.
- **Interaction Logs**: Session-based transaction history.

## Security & Verification 🔑

All commits to this repository are **SSH Signed and Verified** to ensure the highest standard of code integrity and authenticity.

## License 📄

MIT License. See [LICENSE](LICENSE) for details.

---
*Built with ❤️ by Antigravity - Advanced Agentic Coding @ Google DeepMind*
