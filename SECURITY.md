# Security Policy 🛡️

We take the security of our users and the Stacks ecosystem seriously.

## Supported Versions

| Version | Status |
| ------- | ------ |
| v2.x    | ✅ Supported |
| < v2.0  | ❌ Not Supported |

## Reporting a Vulnerability

If you find a security vulnerability, please contact us:

| Method | Contact |
| :--- | :--- |
| Email | `security@stacksclicker.io` |
| GitHub | [Private security advisory](https://github.com/AdekunleBamz/stacks-clicker/security/advisories/new) |

We aim to acknowledge valid reports within 72 hours.

### Response Timeline

| Stage | Target |  
| :--- | :--- |
| Acknowledgement | 72 hours |
| Initial Assessment | 5 business days |
| Fix / Patch Release | 14 business days |

### What to Include

- Type of vulnerability
- Location in source code (file and line number)
- Steps to reproduce
- Impact assessment
- Any potential exploits or attack vectors

## Security Best Practices

### For Users

- **Private Keys**: We will NEVER ask for your seed phrase.
- **Official Domain**: Only interact with `stacksclicker.io`.
- **Review Transactions**: Always check Hiro/Leather wallet popups for detailed transaction context.
- **Verify URLs**: Bookmark the official site to avoid phishing.

### For Developers

- **GPG Signing**: All commits must be signed before merging to main.
- **Dependency Updates**: Review security advisories for dependencies regularly.
- **Code Review**: Security-sensitive changes require additional review.

## Security Audit

For detailed security review procedures, see [SECURITY_REVIEW_CHECKLIST.md](docs/operations/SECURITY_REVIEW_CHECKLIST.md).

## Incident Response

In the event of a security incident, follow the procedures outlined in [INCIDENT_RESPONSE.md](docs/operations/INCIDENT_RESPONSE.md).
