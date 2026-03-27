# Getting Started with Stacks Clicker

Welcome to the Stacks Clicker development guide! This document will help you go from zero to a running dApp in minutes.

## 🧱 Project Overview
Stacks Clicker is a GameFi demonstration built on the Stacks blockchain (Bitcoin Layer 2). It showcases:
- Contract interactions (Clicker, TipJar, QuickPoll)
- WalletConnect integration
- Synthesized audio feedback
- Dynamic theme management

## 🛠️ Prerequisites
- **Node.js**: v18.0.0 or higher
- **Package Manager**: npm (comes with Node.js)
- **Stacks Wallet**: [Hiro](https://www.hiro.so/wallet), [Leather](https://leather.io/), or [Xverse](https://www.xverse.app/) (installed as a browser extension)
- **WalletConnect ID**: Obtain one at [reown.com](https://reown.com/)

## 🏃 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/AdekunleBamz/stacks-clicker.git
cd stacks-clicker
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```
For cleaner CI parity, `npm ci` also works when you do not need to refresh the lockfile.

### 3. Configure Environment
Copy the checked-in example file before editing local values:
```bash
cp .env.example .env
```
Update the required variables in `frontend/.env`:
```env
VITE_WALLETCONNECT_PROJECT_ID=893... # Your Project ID
VITE_DEBUG=true
```
Keep `.env` local and never commit secrets to source control.
Optional values such as `VITE_STACKS_NETWORK` and `VITE_COINGECKO_API_KEY` are documented in `.env.example`.

### 4. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` to interact with the dApp.

## 🧪 Testing
From the `frontend` directory, run the automated test suite:
```bash
npm run test -- --run
```
Use `npm run lint` before opening a pull request if you touched application code.

## 🧰 Troubleshooting
- If wallet connection does not appear, verify `VITE_WALLETCONNECT_PROJECT_ID` is set.
- If UI changes do not reflect, restart `npm run dev` after editing `.env`.

## 📜 Contract Interaction
The dApp interacts with pre-deployed contracts on the network configured by `VITE_STACKS_NETWORK` (default: Stacks Mainnet). You can find the contract source code in the `contracts/` directory for reference.

Current active contract names used by the frontend:
- `clicker-v2p`
- `tipjar-v2p`
- `quickpoll-v2m`

---
Need help? Open an issue on [GitHub](https://github.com/AdekunleBamz/stacks-clicker/issues).

- Keep local env values network-specific when switching between test and main environments.
