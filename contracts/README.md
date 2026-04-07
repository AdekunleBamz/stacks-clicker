# Smart Contracts

This directory contains the Clarity smart contracts for the Stacks Clicker application.

## Contract Overview

| Contract | Version | Description |
|----------|---------|-------------|
| `clicker-v2p.clar` | 2p | Main clicker game contract with multi-click support |
| `quickpoll-v2p.clar` | 2p | Decentralized polling/voting contract |
| `tipjar-v2p.clar` | 2p | Creator tipping contract |

## Development

### Run Tests

```bash
make test
```

### Check Contract Syntax

```bash
make check
```

### Deploy to Devnet

```bash
make deploy-devnet
```

## Contract Features

- **Interaction Fees**: Each contract call requires a small fee (0.0001 STX)
- **Pause Mechanism**: Owner can pause/unpause contracts for maintenance
- **Event Emission**: All actions emit events for tracking and analytics
- **User Tracking**: Tracks unique users, streaks, and first interaction block

## Archive

Older contract versions are stored in the `archive/` directory for reference.
