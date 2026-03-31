# Security Review Checklist

Complete this checklist before each release to ensure security best practices.

## Code Security

### Input/Output
- [ ] Validate external link handling uses `noopener,noreferrer`.
- [ ] Sanitize all user inputs before contract calls.
- [ ] Validate contract call arguments match expected types.
- [ ] Escape HTML content in user-generated displays.

### Secrets & Keys
- [ ] Avoid exposing secret keys in code or logs.
- [ ] Verify `.env` files are in `.gitignore`.
- [ ] Check that API keys are not hardcoded in source.
- [ ] Confirm mnemonic files are never committed.

## Application Security

### Wallet & Session
- [ ] Confirm wallet/session handling errors fail safely.
- [ ] Verify session tokens expire appropriately.
- [ ] Test wallet disconnection clears all sensitive data.
- [ ] Validate address truncation doesn't leak full addresses.

### Debug & Logging
- [ ] Check that debug flags do not leak sensitive payload details.
- [ ] Verify production builds have debug mode disabled.
- [ ] Review error messages don't expose internal implementation.

## Dependency Security

- [ ] Review dependency advisories (`npm audit`).
- [ ] Confirm mitigation status before release cut.
- [ ] Update packages with known vulnerabilities.
- [ ] Verify lockfile integrity after updates.

## Reporting

- [ ] Route sensitive reports through private channels.
- [ ] Follow vulnerability disclosure process in SECURITY.md.
- [ ] Document security findings in incident tracking.

## Maintenance Note

Refresh threat-model references when authentication or wallet flows are modified.

---

Companion index: [Operations docs](README.md).
