# 🎮 StacksClicker

Interactive Stacks dApp featuring Click-to-Earn game, community TipJar, and QuickPoll voting system. Built with Clarity smart contracts and React.

[![Stacks](https://img.shields.io/badge/Built%20on-Stacks-5546FF?style=flat&logo=stacks)](https://stacks.co)
[![Clarity](https://img.shields.io/badge/Smart%20Contracts-Clarity-00D4AA?style=flat)](https://clarity-lang.org)
[![WalletConnect](https://img.shields.io/badge/WalletConnect-v2-3B99FC?style=flat)](https://walletconnect.com)

## ✨ Features

### 🎮 Clicker Game
Build click streaks and compete for the highest score! Every click is recorded on-chain.

### 💰 TipJar
Send micro-tips to support your favorite creators. Quick-tip with one click or send custom amounts.

### 🗳️ QuickPoll
Create and vote on community polls. Decentralized voting for any topic.

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

## 📦 Project Structure

```
stacks-clicker/
├── contracts/
│   ├── clicker.clar      # Click-to-earn game contract
│   ├── tipjar.clar       # Tipping & donations contract
│   └── quickpoll.clar    # Community voting contract
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # Wallet context provider
│   │   ├── utils/        # WalletConnect integration
│   │   └── App.jsx       # Main application
│   └── package.json
├── tests/
│   └── contracts_test.ts # Clarinet tests
├── deployments/          # Deployment configurations
└── settings/             # Network settings
```

## 🔗 Smart Contracts

All contracts are deployed on Stacks Mainnet:

| Contract | Address | Description |
|----------|---------|-------------|
| clicker | `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.clicker` | Click counter with streaks |
| tipjar | `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.tipjar` | Micro-tipping system |
| quickpoll | `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.quickpoll` | Decentralized polls |

### Contract Functions

#### Clicker
- `click` - Single click (0.001 STX fee)
- `multi-click (count)` - Multiple clicks at once
- `ping` - Heartbeat transaction
- `get-user-clicks (user)` - Read click count

#### TipJar
- `quick-tip` - Quick 0.001 STX tip
- `tip-user (recipient, amount)` - Tip specific user
- `donate (amount)` - Donate to contract
- `self-ping` - Activity ping

#### QuickPoll
- `create-poll (question)` - Create new poll
- `vote-yes (poll-id)` - Vote yes on poll
- `vote-no (poll-id)` - Vote no on poll
- `poll-ping` - Activity ping

## 🔌 WalletConnect Integration

This app uses WalletConnect v2 (via Reown AppKit) for wallet connections:

- **Required namespaces** for Stacks chain pairing
- **stx_getAddresses** for address discovery
- **stx_signTransaction** for transaction signing
- **stx_callContract** as fallback for contract calls

See [`frontend/src/utils/walletconnect.js`](frontend/src/utils/walletconnect.js) for implementation details.

### Supported Wallets
- Xverse (Mobile & Extension)
- Leather (Mobile & Extension)

## 🧪 Testing

Run Clarinet tests:

```bash
clarinet test
```

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this code for your own projects.

## 🔗 Links

- [View on Explorer](https://explorer.hiro.so/address/SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N?chain=mainnet)
- [Stacks Documentation](https://docs.stacks.co)
- [Clarity Language](https://clarity-lang.org)
- [WalletConnect Docs](https://docs.walletconnect.com)
