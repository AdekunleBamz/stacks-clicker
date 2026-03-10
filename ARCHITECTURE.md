# 🏛️ Architecture Overview — StacksClicker

StacksClicker is a decentralized application (dApp) built on the Stacks blockchain. This document outlines the project's technical architecture and how its various components interact.

## 🔗 System Architecture

### 1. Smart Contract Layer (Clarity)
The core logic resides in smart contracts written in Clarity 2.
- **`clicker-v2p`**: Manages the clicker game state, streaks, and on-chain event emission.
- **`tipjar-v2p`**: Handles STX transfers between users and tracks tipping statistics.
- **`quickpoll-v2p`**: Manages decentralized voting and poll creation.

### 2. Frontend Layer (React + Vite)
The frontend is a single-page application (SPA) that provides a user-friendly interface for interacting with the smart contracts.
- **`WalletContext`**: Manages the global wallet connection state using Stacks Connect.
- **Action Cards**: Modular components that facilitate specific contract interactions (e.g., `ClickerCard`).
- **Transaction Log**: Provides real-time feedback on user-initiated blockchain transactions.

### 3. Interaction Layer (Stacks SDK)
The bridge between the frontend and the blockchain:
- **`@stacks/connect`**: Handles wallet authentication and transaction signing.
- **`@stacks/transactions`**: Facilitates the construction and broadcasting of Clarity contract calls.

## 🔄 Data Flow
1. **User Action**: A user clicks a button in the UI.
2. **Transaction Building**: The frontend uses `WalletContext` to request a contract call signature.
3. **Wallet Signing**: The user approves the transaction in their Stacks wallet (Xverse/Leather).
4. **On-Chain Execution**: The signed transaction is broadcast to the Stacks network and executed.
5. **State Update**: The smart contract emits an event, which can be indexed off-chain or reflected in the UI via transaction status polling.

## 🔐 Security Standards
- **Non-Custodial**: Users always retain control of their private keys.
- **Clarity Safety**: Contracts are written to be human-readable and predictable.
- **Environment Safety**: Private keys and mnemonics are never committed or exposed on the frontend.
