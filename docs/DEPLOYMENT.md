# Deployment Guide

Complete guide for deploying StacksClicker contracts to Stacks mainnet.

## Prerequisites

- [Clarinet](https://github.com/hirosystems/clarinet) v2.3.0+
- Stacks wallet with STX for deployment fees
- Your wallet's secret key (mnemonic phrase)

## Deployment Cost Estimate

| Item | Estimated Cost |
|------|---------------|
| clicker-v2j deployment | ~0.05 STX |
| tipjar-v2j deployment | ~0.05 STX |
| quickpoll-v2j deployment | ~0.08 STX |
| **Total** | **~0.18 STX** |

*Note: Actual costs vary based on network conditions.*

## Step 1: Configure Network Settings

Edit `settings/Mainnet.toml`:

```toml
[network]
name = "mainnet"
stacks_node_rpc_address = "https://api.mainnet.hiro.so"
deployment_fee_rate = 10

[accounts.deployer]
mnemonic = "your twenty-four word mnemonic phrase here"
```

⚠️ **SECURITY WARNING**: Never commit your mnemonic to git!

## Step 2: Verify Contract Syntax

Run syntax check before deployment:

```bash
clarinet check
```

All contracts should pass without errors.

## Step 3: Run Tests

Ensure all tests pass:

```bash
clarinet test
```

## Step 4: Create Deployment Plan

The deployment plan is in `deployments/default.mainnet-plan.yaml`:

```yaml
---
id: 0
name: Mainnet deployment
network: mainnet
stacks-node: "https://api.mainnet.hiro.so"
bitcoin-node: "http://blockstream.info/api"
plan:
  batches:
    - id: 0
      transactions:
        - contract-publish:
            contract-name: clicker-v2j
            expected-sender: $DEPLOYER
            cost: 50000
            path: contracts/clicker-v2j.clar
            anchor-block-only: true
        - contract-publish:
            contract-name: tipjar-v2j
            expected-sender: $DEPLOYER
            cost: 50000
            path: contracts/tipjar-v2j.clar
            anchor-block-only: true
        - contract-publish:
            contract-name: quickpoll-v2j
            expected-sender: $DEPLOYER
            cost: 80000
            path: contracts/quickpoll-v2j.clar
            anchor-block-only: true
```

## Step 5: Deploy to Mainnet

Execute the deployment:

```bash
clarinet deployments apply -p deployments/default.mainnet-plan.yaml
```

You'll be prompted to confirm. Type `y` to proceed.

## Step 6: Verify Deployment

Check deployment on the explorer:

1. Go to https://explorer.hiro.so
2. Search for your deployer address
3. View the deployed contracts

## Post-Deployment

### Update Contract Addresses

After deployment, update your frontend configuration with the deployed contract addresses:

```javascript
const CONTRACTS = {
  clicker: 'SP...YOUR_ADDRESS.clicker-v2j',
  tipjar: 'SP...YOUR_ADDRESS.tipjar-v2j',
  quickpoll: 'SP...YOUR_ADDRESS.quickpoll-v2j',
};
```

### Verify Contract Functionality

Test each contract function:

```bash
# Using stx CLI or explorer
stx call_read_only_function <address> clicker-v2j get-version
```

## Troubleshooting

### "Insufficient balance"
Ensure your deployer wallet has enough STX (at least 0.5 STX recommended).

### "Nonce too low/high"
Wait for pending transactions to confirm, or manually specify the nonce.

### "Contract already exists"
The contract name is already deployed. Use a different version suffix (v2k, v2l, etc.).

### Stuck transactions
Check the mempool and wait, or use Replace-By-Fee if supported.

## Rollback

Smart contracts on Stacks are immutable once deployed. To "rollback":

1. Deploy a new version with fixes
2. Update frontend to use new contract addresses
3. Optionally migrate data (if applicable)

## Security Checklist

- [ ] Mnemonic not committed to git
- [ ] Settings file in .gitignore
- [ ] Contracts tested thoroughly
- [ ] Deployment cost covered
- [ ] Contract addresses documented
- [ ] Frontend updated with new addresses
