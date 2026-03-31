# Deployment Overview

This document provides an overview of the deployment process for the Stacks Clicker project.

## Deployment Structure

Deployments are split by network plan files in `deployments/`:

| File | Purpose |
| :--- | :--- |
| `default.devnet-plan.yaml` | Local devnet deployment for testing |
| `fund-wallets.yaml` | Wallet funding transactions |

## Deployment Environments

### Devnet
- Use for rehearsal and testing new contracts.
- Run `clarinet deploy` with devnet settings.
- Verify all interactions work correctly.

### Testnet
- Deploy to testnet after successful devnet testing.
- Use for final validation before mainnet.
- Test with real wallet connections.

### Mainnet
- Only run mainnet deploys after full checklist completion.
- Ensure all pre-deploy checks are verified.
- Have rollback plan prepared before deployment.

## Deployment Process

1. **Preparation**
   - Review [PREDEPLOY_CHECKS.md](PREDEPLOY_CHECKS.md)
   - Ensure wallet has sufficient balance for gas fees
   - Verify deployment plan file is correct

2. **Execution**
   - Run deployment with Clarinet: `clarinet deploy`
   - Monitor transaction confirmations
   - Record deployment transaction IDs

3. **Verification**
   - Run post-deploy verification immediately after each successful network rollout
   - Follow [POSTDEPLOY_CHECKS.md](POSTDEPLOY_CHECKS.md)
   - Test all contract interactions

## Related Documents

- [Predeploy Checks](PREDEPLOY_CHECKS.md)
- [Postdeploy Checks](POSTDEPLOY_CHECKS.md)
- [Release Checklist](RELEASE_CHECKLIST.md)
- [Rollback Guide](ROLLBACK_GUIDE.md)

---

Companion index: [Operations docs](README.md).
