# Contributing to Stacks Clicker

First off, thank you for considering contributing to Stacks Clicker! It's people like you that make the open-source community such an amazing place.

## Code of Conduct

Help us keep this project open and inclusive. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).
If you need to report conduct concerns, email `security@stacksclicker.io`.

## How Can I Contribute?

### Reporting Bugs
If you find a bug, please create an issue. Include as much detail as possible, such as steps to reproduce and your environment details.

### Suggesting Enhancements
Enhancement suggestions are tracked as GitHub issues. When creating an enhancement issue, please provide a clear description and any mockups if applicable.

### Pull Requests
1. Fork the repo and create your branch from `main`.
   Use descriptive branch names such as `fix/wallet-timeout` or `docs/release-checklist`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes (`npm run test` in frontend).
5. Make sure your code lints (`npm run lint` in frontend).
6. Sign commits that will be pushed to shared branches (`git commit -S`).

## Development Setup

1. Install dependencies: `cd frontend && npm install`
2. Set up environment: `cd frontend && cp .env.example .env`
3. Add your WalletConnect project ID to `frontend/.env`
4. Smart Contract Development: Ensure [Clarinet](https://github.com/hirosystems/clarinet) is installed for local testing and contract-call simulations.
5. Start dev server: `cd frontend && npm run dev`

## Contract Contributions
When modifying Clarity contracts:
- Run `clarinet test` to ensure logic remains sound.
- Maintain the folder structure for contract archives.
- Update the relevant interface hooks in `frontend/src/hooks` if contract functions change.

## Style Guide

- Use functional components and hooks.
- Follow the existing folder structure.
- Document new components with JSDoc.
- Use CSS variables for all design tokens.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
