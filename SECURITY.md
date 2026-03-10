# 🔐 Security Policy — StacksClicker

We take the security of the StacksClicker project and its users very seriously. This document outlines our policy for reporting and addressing potential security vulnerabilities.

## 🛡️ Reporting a Vulnerability
If you discover a security vulnerability within this project, please **do not open a public issue**. Instead, report it privately via the project maintainer's contact details or by submitting a security advisory if available on GitHub.

## 🏗️ Security Best Practices
- **Local Keys**: Always keep your private keys and mnemonics local. Never commit files like `Mainnet.toml` or `settings.json` that may contain sensitive information.
- **Verified Contracts**: Review smart contract code before interacting. Our contracts are documented with NatSpec to aid in code clarity.
- **Official SDKs**: Only use official Stacks SDKs for blockchain interactions to ensure secure transaction building and signing.

## 🚀 Scope
This policy applies to all components of the StacksClicker project, including:
- Smart contracts (`contracts/`)
- Frontend application (`frontend/`)
- Deployment scripts and configuration files

## 📜 Disclaimer
StacksClicker is provided "as is" without warranty of any kind. Users are responsible for their own security and the safety of their funds when interacting with the Stacks blockchain.
