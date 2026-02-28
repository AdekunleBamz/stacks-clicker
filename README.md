# 🎮 StacksClicker v2m

Interactive Stacks dApp featuring Click-to-Earn game, community TipJar, and QuickPoll voting system. Built with Clarity smart contracts and React.

[![Stacks](https://img.shields.io/badge/Built%20on-Stacks-5546FF?style=flat&logo=stacks)](https://stacks.co)
[![Clarity](https://img.shields.io/badge/Smart%20Contracts-Clarity-00D4AA?style=flat)](https://clarity-lang.org)
[![WalletConnect](https://img.shields.io/badge/WalletConnect-v2-3B99FC?style=flat)](https://walletconnect.com)
[![Version](https://img.shields.io/badge/Version-2m-green?style=flat)](https://github.com/AdekunleBamz/stacks-clicker)

---

## 🛠️ Built With Stacks SDKs

This project extensively uses the official **Stacks JavaScript libraries** for all blockchain interactions — wallet authentication, transaction signing, contract calls, and key management.

### [@stacks/connect](https://www.npmjs.com/package/@stacks/connect)
> **Wallet Authentication & Transaction Signing**

Used in the frontend to connect user wallets (Xverse, Leather) and prompt transaction signing via the browser extension or mobile wallet.

```javascript
import { openContractCall, showConnect, disconnect } from '@stacks/connect';

// Connect wallet
showConnect({
  appDetails: { name: 'StacksClicker', icon: '/logo.svg' },
  onFinish: () => console.log('Connected!'),
});

// Call smart contract
openContractCall({
  contractAddress: 'YOUR_DEPLOYER_ADDRESS',
  contractName: 'clicker-v2p',
  functionName: 'click',
  functionArgs: [],
  network: 'mainnet',
});
```

### [@stacks/transactions](https://www.npmjs.com/package/@stacks/transactions)
> **Transaction Building, Clarity Values & Broadcasting**

Used in deployment and interaction scripts to build, sign, and broadcast contract-call and STX-transfer transactions programmatically.

```javascript
import {
  makeContractCall,
  broadcastTransaction,
  uintCV,
  PostConditionMode,
  AnchorMode,
} from '@stacks/transactions';

// Build and broadcast transaction
const tx = await makeContractCall({
  contractAddress: 'YOUR_DEPLOYER_ADDRESS',
  contractName: 'clicker-v2p',
  functionName: 'multi-click',
  functionArgs: [uintCV(5)],
  senderKey: privateKey,
  network: 'mainnet',
  anchorMode: AnchorMode.Any,
  postConditionMode: PostConditionMode.Allow,
  fee: 1000,
});

const result = await broadcastTransaction(tx, network);
```

### Other Stacks Libraries Used

| Package | Purpose |
|---------|---------|
| `@stacks/network` | Mainnet/Testnet network configuration |
| `@stacks/wallet-sdk` | Wallet generation & HD key derivation |

---

## ✨ Features

### 🎮 Clicker Game
Build click streaks and compete for the highest score! Every click is recorded on-chain with full event emission.

### 💰 TipJar
Send micro-tips to support your favorite creators. Quick-tip with one click or send custom amounts.

### 🗳️ QuickPoll
Create and vote on community polls. Decentralized voting for any topic — no poll IDs needed in v2n.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- [Clarinet](https://github.com/hirosystems/clarinet) (for contract development)
- A Stacks wallet (Xverse or Leather)

### 1. Clone & Install

```bash
git clone https://github.com/AdekunleBamz/stacks-clicker.git
cd stacks-clicker

# Install frontend dependencies
cd frontend
npm install
```

### 2. Environment Setup

Create `frontend/.env`:

```dotenv
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
VITE_DEBUG=true
```

Get a project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).

### 3. Run Development Server

```bash
cd frontend
npm run dev
```

Open http://localhost:5173

---

## 📦 Project Structure

```
stacks-clicker/
├── contracts/
│   ├── clicker-v2m.clar      # ✅ Active — Click-to-earn game (Clarity 2, Epoch 3.0)
│   ├── tipjar-v2m.clar       # ✅ Active — Tipping & donations (Clarity 2, Epoch 3.0)
│   ├── quickpoll-v2m.clar    # ✅ Active — Community voting (Clarity 2, Epoch 3.0)
│   ├── quickpoll-v2n.clar    # ✅ Active — Simplified voting, no poll IDs (Clarity 2)
│   └── archive/              # 📦 Legacy contracts (v2i, v2j, v2k, v2l) — retired
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # Wallet context provider
│   │   ├── utils/            # WalletConnect integration
│   │   └── App.jsx           # Main application
│   └── package.json
├── deployments/              # Deployment plan YAMLs
└── settings/                 # Network settings (Devnet/Simnet only — Mainnet.toml is gitignored)
```

---

## 🔗 Active Smart Contracts (v2p — Current)

Deploed on Stacks Mainnet:

| Contract | Description |
|----------|-------------|
| `clicker-v2p` | Click counter with streaks, events & analytics |
| `tipjar-v2p` | Tipping with largest-tip tracking |
| `quickpoll-v2p` | Polls with creator analytics |

> All v2p contracts use **Clarity Version 2** and target **Epoch 3.0**.

### Contract Functions

#### Clicker (v2m)
- `click` — Single click (0.001 STX fee) + emits event
- `multi-click (count)` — Multiple clicks + emits event
- `ping` — Heartbeat transaction + emits event
- `reset-streak` — Resets click streak
- `get-user-clicks (user)` — Read click count
- `get-contract-info` — Returns version, total clicks, unique users, fees collected

#### TipJar (v2m)
- `quick-tip` — Quick 0.001 STX tip + emits event
- `ping` — Activity heartbeat
- `get-contract-info` — Returns version, total tips, unique tippers, largest tip

#### QuickPoll (v2m)
- `vote-yes (poll-id)` — Vote yes on a poll
- `vote-no (poll-id)` — Vote no on a poll
- `ping` — Activity heartbeat
- `get-contract-info` — Returns version, total polls, votes, unique voters

#### QuickPoll (v2n — Simplified)
- `vote-yes` — Vote yes (global, no poll ID)
- `vote-no` — Vote no (global, no poll ID)
- `ping` — Activity heartbeat

---

## 📦 Legacy / Archived Contracts

Previous versions are archived in `contracts/archive/` and remain active on mainnet. They are no longer maintained.

| Version | Contracts | Status |
|---------|-----------|--------|
| v2i | clicker, tipjar, quickpoll | 🗄️ Archived |
| v2j | clicker, tipjar, quickpoll | 🗄️ Archived |
| v2k | clicker, tipjar, quickpoll | 🗄️ Archived (failed deploy) |
| v2l | clicker, tipjar, quickpoll | 🗄️ Archived |

---

## 🔌 WalletConnect Integration

This app uses WalletConnect v2 (via Reown AppKit) for wallet connections:

- **Required namespaces** for Stacks chain pairing
- **stx_getAddresses** for address discovery
- **stx_signTransaction** for transaction signing
- **stx_callContract** as fallback for contract calls

See `frontend/src/utils/walletconnect.js` for implementation details.

### Supported Wallets
- Xverse (Mobile & Extension)
- Leather (Mobile & Extension)

---

## 🔐 Security

- `settings/Mainnet.toml` is **gitignored** — never committed
- `internal/` directory is **gitignored** — all wallet keys stay local
- `wallets.json` is **gitignored** — private keys never leave your machine
- Only public test mnemonics (`zoo zoo zoo...`) appear in `Devnet.toml` / `Simnet.toml`

---

## 🧪 Testing

Run Clarinet tests:

```bash
clarinet test
```

---

## 🚢 Deployment

### Deploy Contracts

1. Configure `settings/Mainnet.toml` with your mnemonic (never commit this file)
2. Generate deployment plan:

```bash
clarinet deployments generate --mainnet --low-cost
```

3. Apply deployment:

```bash
clarinet deployments apply -p deployments/your-plan.yaml
```

### Deploy Frontend

The frontend can be deployed to Vercel:

```bash
cd frontend
npm run build
# Deploy dist/ to Vercel
```

Add environment variables in Vercel dashboard:
- `VITE_WALLETCONNECT_PROJECT_ID`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this code for your own projects.

---

## 🔗 Links

- [Stacks Explorer](https://explorer.hiro.so?chain=mainnet)
- [Stacks Documentation](https://docs.stacks.co)
- [Clarity Language](https://clarity-lang.org)
- [@stacks/connect NPM](https://www.npmjs.com/package/@stacks/connect)
- [@stacks/transactions NPM](https://www.npmjs.com/package/@stacks/transactions)
- [WalletConnect Docs](https://docs.walletconnect.com)
