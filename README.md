# 🎮 StacksClicker v2j

Interactive Stacks dApp featuring Click-to-Earn game, community TipJar, and QuickPoll voting system. Built with Clarity smart contracts and React.

[![Stacks](https://img.shields.io/badge/Built%20on-Stacks-5546FF?style=flat&logo=stacks)](https://stacks.co)
[![Clarity](https://img.shields.io/badge/Smart%20Contracts-Clarity-00D4AA?style=flat)](https://clarity-lang.org)
[![WalletConnect](https://img.shields.io/badge/WalletConnect-v2-3B99FC?style=flat)](https://walletconnect.com)
[![Version](https://img.shields.io/badge/Version-2j-green?style=flat)](https://github.com/AdekunleBamz/stacks-clicker)

---

## 🛠️ Built With Stacks SDKs

This project extensively uses the official **Stacks JavaScript libraries** for blockchain interactions:

### [@stacks/connect](https://www.npmjs.com/package/@stacks/connect)
> **Wallet Authentication & Transaction Signing**

```javascript
import { openContractCall, showConnect, disconnect } from '@stacks/connect';

// Connect wallet
showConnect({
  appDetails: { name: 'StacksClicker', icon: '/logo.svg' },
  onFinish: () => console.log('Connected!'),
});

// Call smart contract
openContractCall({
  contractAddress: 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N',
  contractName: 'clicker-v2j',
  functionName: 'click',
  functionArgs: [],
  network: new StacksMainnet(),
});
```

### [@stacks/transactions](https://www.npmjs.com/package/@stacks/transactions)
> **Transaction Building, Clarity Values & Broadcasting**

```javascript
import { 
  makeContractCall,
  broadcastTransaction,
  uintCV,
  stringAsciiCV,
  principalCV,
  PostConditionMode,
  AnchorMode,
} from '@stacks/transactions';

// Build and broadcast transaction
const txOptions = {
  contractAddress: 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N',
  contractName: 'clicker-v2j',
  functionName: 'multi-click',
  functionArgs: [uintCV(10)],
  senderKey: privateKey,
  network: new StacksMainnet(),
  anchorMode: AnchorMode.Any,
  postConditionMode: PostConditionMode.Allow,
  fee: 2000,
};

const transaction = await makeContractCall(txOptions);
const response = await broadcastTransaction(transaction, network);
```

### Other Stacks Libraries Used

| Package | Purpose |
|---------|---------|
| `@stacks/network` | Mainnet/Testnet network configuration |
| `@stacks/wallet-sdk` | Wallet generation & key management |

---

## ✨ Features

### 🎮 Clicker Game
Build click streaks and compete for the highest score! Every click is recorded on-chain.

### 💰 TipJar
Send micro-tips to support your favorite creators. Quick-tip with one click or send custom amounts.

### 🗳️ QuickPoll
Create and vote on community polls. Decentralized voting for any topic.

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
│   ├── clicker-v2j.clar   # Click-to-earn game contract (v2j)
│   ├── tipjar-v2j.clar    # Tipping & donations contract (v2j)
│   ├── quickpoll-v2j.clar # Community voting contract (v2j)
│   ├── clicker-v2i.clar   # Legacy v2i contract
│   ├── tipjar-v2i.clar    # Legacy v2i contract
│   └── quickpoll-v2i.clar # Legacy v2i contract
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Wallet context provider
│   │   ├── utils/         # WalletConnect integration
│   │   └── App.jsx        # Main application
│   └── package.json
├── tests/
│   └── contracts_test.ts  # Clarinet tests
├── deployments/           # Deployment configurations
└── settings/              # Network settings
```

---

## 🔗 Smart Contracts (v2j - Current)

All contracts are deployed on Stacks Mainnet with enhanced features:

| Contract | Address | Description |
|----------|---------|-------------|
| clicker-v2j | `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.clicker-v2j` | Click counter with events & analytics |
| tipjar-v2j | `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.tipjar-v2j` | Tipping with largest-tip tracking |
| quickpoll-v2j | `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.quickpoll-v2j` | Polls with creator analytics |

### v2j Enhancements over v2i

| Feature | v2i | v2j |
|---------|-----|-----|
| Version constant | ❌ | ✅ `VERSION u2` |
| Print events | ❌ | ✅ All actions emit events |
| Unique user tracking | ❌ | ✅ `unique-users` counter |
| First activity block | ❌ | ✅ Tracks first interaction |
| Last activity block | ❌ | ✅ `last-activity-block` |
| Contract info getter | ❌ | ✅ `get-contract-info` |
| Largest tip tracking | ❌ | ✅ TipJar tracks largest |
| Creator analytics | ❌ | ✅ QuickPoll creator stats |

### Contract Functions

#### Clicker (v2j)
- `click` - Single click (0.001 STX fee) + emits `click-event`
- `multi-click (count)` - Multiple clicks at once + emits `multi-click-event`
- `ping` - Heartbeat transaction + emits `ping-event`
- `get-user-clicks (user)` - Read click count
- `get-contract-info` - Returns version, total clicks, unique users, fees collected
- `get-version` - Returns VERSION constant (u2)

#### TipJar (v2j)
- `quick-tip` - Quick 0.001 STX tip + emits `quick-tip-event`
- `tip-user (recipient, amount)` - Tip specific user + emits `tip-event`
- `donate (amount)` - Donate to contract + emits `donate-event`
- `self-ping` - Activity ping + emits `self-ping-event`
- `get-contract-info` - Returns version, total tips, unique tippers, largest tip
- `get-largest-tip` - Returns the largest tip amount ever sent

#### QuickPoll (v2j)
- `create-poll (question)` - Create new poll + emits `poll-created-event`
- `vote-yes (poll-id)` - Vote yes + emits `vote-event`
- `vote-no (poll-id)` - Vote no + emits `vote-event`
- `poll-ping` - Activity ping + emits `ping-event`
- `get-contract-info` - Returns version, total polls, total votes, unique voters/creators

---

## 📜 Legacy Contracts (v2i)

Previous version contracts (still active on mainnet):

| Contract | Address |
|----------|---------|
| clicker-v2i | `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.clicker-v2i` |
| tipjar-v2i | `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.tipjar-v2i` |
| quickpoll-v2i | `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.quickpoll-v2i` |

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

## 🧪 Testing

Run Clarinet tests:

```bash
clarinet test
```

---

## 🚢 Deployment

### Deploy Contracts

1. Configure `settings/Mainnet.toml` with your mnemonic
2. Run deployment:

```bash
clarinet deployments apply -p deployments/default.mainnet-plan.yaml
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

- [View on Explorer](https://explorer.hiro.so/address/SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N?chain=mainnet)
- [Stacks Documentation](https://docs.stacks.co)
- [Clarity Language](https://clarity-lang.org)
- [@stacks/connect NPM](https://www.npmjs.com/package/@stacks/connect)
- [@stacks/transactions NPM](https://www.npmjs.com/package/@stacks/transactions)
- [WalletConnect Docs](https://docs.walletconnect.com)
