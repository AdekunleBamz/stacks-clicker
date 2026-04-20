# Contributing to Stacks Clicker 🚀

Thank you for your interest in contributing! We follow an atomic-commit workflow.

## How to Contribute

1.  **Issues**: Report bugs or suggest features via GitHub Issues.
2.  **Pull Requests**:
    *   Fork the repo and create a branch from `main`.
    *   Use prefix: `feat/`, `fix/`, `docs/`, or `refactor/`.
    *   Open a draft PR early when you want feedback before final polish.
    *   **Atomic Commits**: Keep commits tiny and focused.
    *   **Commit Signing**: All commits must be signed (`git commit -S`).
3.  **Standards**:
    *   Commit types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`.
    *   React: Use functional components and hooks.
    *   Styling: Use CSS Variables from `index.css`.
    *   JSDoc: Document all primary functions and components.
    *   Accessibility: Ensure WCAG 2.1 AA compliance for all UI changes.
    *   Testing: Add tests for new features and bug fixes.

## Local Development

```bash
cd frontend
npm ci
cp .env.example .env # Add your WalletConnect ID
npm run dev
```

From the repository root, you can run the equivalent helper scripts:

```bash
npm run frontend:install
npm run frontend:dev
```

For smart contract changes, use [Clarinet](https://github.com/hirosystems/clarinet) for testing.
For frontend verification before opening a PR:
- Run `npm run frontend:test -- --run` to execute tests
- Run `npm run frontend:lint` to check code quality
- Run `npm --prefix frontend run format:check` to verify formatting

## License

By contributing, you agree that your work will be licensed under the MIT License.
