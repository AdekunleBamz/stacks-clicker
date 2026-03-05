# Contributing to StacksClicker

Thanks for considering contributing to StacksClicker! 🎉

## Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/stacks-clicker.git`
3. **Install** dependencies: `cd frontend && npm install`
4. Create a **branch**: `git checkout -b feature/your-feature`

## Development Workflow

```bash
# Start dev server
cd frontend && npm run dev

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Purpose |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code restructuring |
| `style:` | Formatting, CSS changes |
| `test:` | Adding/updating tests |
| `ci:` | CI/CD changes |
| `docs:` | Documentation |
| `chore:` | Maintenance tasks |

Example: `feat(ui): add animation to clicker button`

## Pull Request Process

1. Ensure all tests pass (`npm run test -- --run`)
2. Ensure code is linted (`npm run lint`)
3. Write a clear PR description
4. Reference any related issues

## Project Structure

- **`frontend/src/components/`** — Modular React components
- **`frontend/src/context/`** — Global state (WalletContext)
- **`frontend/src/tests/`** — Unit tests (Vitest)
- **`contracts/`** — Clarity smart contracts

## Code Style

- **Prettier** enforces formatting (`.prettierrc`)
- **ESLint** enforces code quality (`eslint.config.js`)
- Both run automatically via GitHub Actions on every push
