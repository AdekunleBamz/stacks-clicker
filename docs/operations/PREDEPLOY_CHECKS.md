# Predeploy Checks

Complete all items before initiating a deployment.

## Checklist

### Code & Version

- [ ] Confirm target network and deployment plan file.
- [ ] Verify latest commit hash and changelog alignment.
- [ ] Keep rollback commit reference prepared.
- [ ] Confirm version tags are updated in package.json files.

### Wallet & Network

- [ ] Ensure deployer wallet balance is sufficient for gas fees.
- [ ] Confirm environment variables match the intended target network.
- [ ] Verify contract addresses are correct for the target network.
- [ ] Run one wallet-authenticated dry action on the target network before final deploy broadcast.

### System

- [ ] Confirm deploy operator clock is synced to avoid confusing timestamp drift in release logs.
- [ ] Verify stable internet connection for deployment duration.

### Documentation

- [ ] Update CHANGELOG.md with release notes.
- [ ] Update ROADMAP.md if releasing new features.
- [ ] Ensure all new features have corresponding documentation.

## Verification Commands

```bash
# Check current git commit
git rev-parse HEAD

# Verify deployment plan exists
ls deployments/*.yaml

# Check wallet balance (via Clarinet console)
clarinet console
```

---

Companion index: [Operations docs](README.md).
