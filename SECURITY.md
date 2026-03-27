# 🔐 Security Policy — StacksClicker

We take the security of the StacksClicker project and its users very seriously. This document outlines our policy for reporting and addressing potential security vulnerabilities.

## 🛡️ Reporting a Vulnerability
If you discover a security vulnerability within this project, please **do not open a public issue**. Instead, report it privately via the project maintainer's contact details or by submitting a security advisory if available on GitHub.

## 🏗️ Security Best Practices
- **Local Keys**: Always keep your private keys and mnemonics local. Never commit files like `Mainnet.toml` or `settings.json` that may contain sensitive information.
- **Verified Contracts**: Review smart contract code before interacting. Our contracts are documented with NatSpec to aid in code clarity.
- **Official SDKs**: Only use official Stacks SDKs for blockchain interactions to ensure secure transaction building and signing.

## Reporting a Vulnerability

If you find a security vulnerability, please contact us:
- **Email**: `security@stacksclicker.io`
- **Fallback**: Open a private GitHub security advisory.

We aim to acknowledge valid reports within 72 hours.

Please include:
- Type of vulnerability.
- Location in source code.
- Steps to reproduce.
- Impact assessment.

## User Best Practices

- **Private Keys**: We will NEVER ask for your seed phrase.
- **Official Domain**: Only interact with `stacksclicker.io`.
- **Review Transactions**: Always check Hiro/Leather wallet popups for detailed transaction context.
