# Frequently Asked Questions

## General

### What is StacksClicker?
StacksClicker is a collection of interactive smart contracts on the Stacks blockchain. It includes three games/tools:
- **Clicker**: A click-to-earn game where you build streaks
- **TipJar**: A micro-tipping system for sending STX
- **QuickPoll**: A decentralized voting system

### What blockchain does it run on?
StacksClicker runs on the [Stacks blockchain](https://stacks.co), which is secured by Bitcoin through Proof of Transfer (PoX).

### Do I need cryptocurrency to use it?
Yes, you need a small amount of STX to interact with the contracts. Each action costs 0.001 STX (plus network fees).

## Costs

### How much does each action cost?
| Action | Cost |
|--------|------|
| Click | ~0.003 STX |
| Multi-click | ~0.003 STX |
| Quick tip | ~0.004 STX (0.003 + 0.001 tip) |
| Create poll | ~0.003 STX |
| Vote | ~0.003 STX |
| Ping | ~0.003 STX |

*Costs include ~0.002 STX network fee + 0.001 STX contract fee*

### Where do the fees go?
The 0.001 STX contract fee goes to the contract deployer. Network fees go to Stacks miners.

## Wallets

### Which wallets are supported?
- **Xverse** (Mobile + Browser Extension)
- **Leather** (Mobile + Browser Extension)

### How do I connect my wallet?
Click "Connect Wallet" in the app. You'll be prompted to select and authorize your wallet.

## Contracts

### What are the current contract addresses?
```
Clicker:   SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.clicker-v2j
TipJar:    SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.tipjar-v2j
QuickPoll: SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.quickpoll-v2j
```

### What's the difference between v2i and v2j?
v2j is the latest version with:
- Event emissions for all actions
- Unique user tracking
- First activity timestamps
- `get-contract-info` function
- TipJar largest-tip tracking
- QuickPoll creator analytics

### Are the contracts audited?
The contracts have undergone internal review. An external audit is planned.

## Clicker

### What are streaks?
Streaks track consecutive clicks. Each click increases your streak by 1. Use `reset-streak` to start over.

### What's the maximum multi-click?
Multi-click is capped at 100 clicks per transaction to prevent abuse.

## TipJar

### Can I tip any address?
Yes! Use `tip-user` to tip any valid Stacks address.

### What's the minimum tip?
Any amount works, but very small tips may not be worth the transaction fee.

## QuickPoll

### Can I vote multiple times?
No, each address can only vote once per poll.

### Can I change my vote?
No, votes are permanent once cast.

### Who can close a poll?
Only the poll creator can close their poll.

## Technical

### How do I read contract data?
Use read-only functions like:
- `get-user-clicks`
- `get-total-tips`
- `get-poll`

These don't require transactions or fees.

### What's the VERSION constant?
v2j contracts return `u2` to identify the contract version programmatically.

### Are transactions reversible?
No, blockchain transactions are permanent and immutable.

## Troubleshooting

### Transaction stuck/pending
Wait for network confirmation (usually 10-30 minutes). Check status on [Hiro Explorer](https://explorer.hiro.so).

### "Insufficient balance" error
Ensure you have at least 0.01 STX for the action plus network fees.

### "Already voted" error
You've already voted on this poll. Each address can only vote once.

### Wallet not connecting
- Refresh the page
- Check wallet is unlocked
- Try a different browser
- Ensure you're on mainnet

## More Questions?

- Open a [GitHub Issue](https://github.com/AdekunleBamz/stacks-clicker/issues)
- Check the [API Documentation](./API.md)
- Review the [Architecture](./ARCHITECTURE.md)
