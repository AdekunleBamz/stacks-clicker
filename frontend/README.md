# 💻 StacksClicker Frontend

The frontend for StacksClicker is a modern React application built with Vite, Framer Motion, and the Stacks SDK.

## 🛠️ Tech Stack
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: Vanilla CSS + [Framer Motion](https://www.framer.com/motion/)
- **Blockchain**: [@stacks/connect](https://www.npmjs.com/package/@stacks/connect), [@stacks/transactions](https://www.npmjs.com/package/@stacks/transactions)
- **State Management**: React Context (`WalletContext`)
- **Testing**: [Vitest](https://vitest.dev/)

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file based on `.env.example`:
```dotenv
VITE_WALLETCONNECT_PROJECT_ID=your_id
VITE_DEBUG=true
```

### 3. Run Development Server
```bash
npm run dev
```

## 🧪 Testing
Run unit tests with Vitest:
```bash
npm run test
```

## 📂 Project Structure
- `src/components/`: Reusable UI components and Action Cards.
- `src/context/`: Global providers (Wallet Connection).
- `src/utils/`: Helper functions and blockchain interaction logic.
- `src/tests/`: Vitest test suites.

## 📝 Standards
- **JSDoc**: Every component and utility function is documented with JSDoc.
- **Linting**: ESLint and Prettier are configured for code consistency.
