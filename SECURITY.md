# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| v2j     | :white_check_mark: |
| v2i     | :white_check_mark: |
| < v2i   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### Do NOT

- Open a public GitHub issue
- Discuss the vulnerability publicly
- Exploit the vulnerability

### Do

1. **Email the maintainers** with details of the vulnerability
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

3. **Allow time** for us to respond and fix the issue before disclosure

### Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Depends on severity

### Severity Levels

| Level | Description | Response Time |
|-------|-------------|---------------|
| Critical | Funds at risk, contract exploitable | 24 hours |
| High | Significant impact, workaround exists | 72 hours |
| Medium | Limited impact | 7 days |
| Low | Minimal impact | 14 days |

## Smart Contract Security

### Known Security Measures

1. **Fee Collection First**: Fees are collected before state changes to prevent manipulation
2. **Owner Validation**: Only contract owner can perform administrative functions
3. **Input Validation**: All user inputs are validated
4. **Integer Overflow Protection**: Clarity's native uint prevents overflow
5. **Reentrancy Protection**: Clarity's design prevents reentrancy attacks

### Audit Status

- [ ] Internal review completed
- [ ] External audit pending

## Bug Bounty

Currently, we do not have a formal bug bounty program. However, we appreciate responsible disclosure and will acknowledge contributors in our release notes.

## Security Best Practices for Users

1. **Verify contract addresses** before interacting
2. **Use trusted wallets** (Xverse, Leather)
3. **Review transaction details** before signing
4. **Keep wallet software updated**

## Contact

For security concerns, reach out via GitHub security advisory or direct message to maintainers.

---

Thank you for helping keep StacksClicker secure! 🔒
