# 📜 StacksClicker Contracts

This directory contains the Clarity smart contracts for the StacksClicker dApp.

## 🚀 Active Contracts (v2p)

| File | Contract Name | Description |
|------|---------------|-------------|
| `clicker-v2p.clar` | `clicker-v2p` | Click-to-earn game logic with streaks and fees. |
| `tipjar-v2p.clar` | `tipjar-v2p` | Tipping system for developers and users. |
| `quickpoll-v2p.clar` | `quickpoll-v2p` | Decentralized community voting system. |

## 🛠️ Development

### Prerequisites
- [Clarinet](https://github.com/hirosystems/clarinet)

### Testing
To run the Clarity unit tests:
```bash
clarinet test
```

### Console
To interact with contracts in a local environment:
```bash
clarinet console
```

## 📂 Structure
- `contracts/`: Active smart contracts.
- `contracts/archive/`: Legacy versions of contracts for historical reference.

## 🔐 Standards
- All contracts use **Clarity 2**.
- NatSpec documentation is included for all public/read-only functions and data variables.
