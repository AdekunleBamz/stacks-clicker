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
- **Stacks Wallet**: [Xverse](https://www.xverse.app/) or [Leather](https://leather.io/) (installed as a browser extension)
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

### 3. Configure Environment
Create a `.env` file in the `frontend` directory:
```bash
VITE_WALLETCONNECT_PROJECT_ID=893... # Your Project ID
VITE_DEBUG=true
```

### 4. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` to interact with the dApp.

## 🧪 Testing
To run the automated test suite:
```bash
npm run test
```

## 📜 Contract Interaction
The dApp interacts with pre-deployed contracts on Stacks Mainnet. You can find the contract source code in the `contracts/` directory for reference.

---
Need help? Open an issue on [GitHub](https://github.com/AdekunleBamz/stacks-clicker/issues).
