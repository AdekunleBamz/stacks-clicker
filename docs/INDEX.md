# Documentation Index

Welcome to the Stacks Clicker documentation! This index helps you navigate all available documentation.

## Quick Links

| Document | Description |
|----------|-------------|
| [README](../README.md) | Project overview and quick start |
| [API Reference](API.md) | Complete contract API documentation |
| [Architecture](ARCHITECTURE.md) | System design and contract relationships |
| [Deployment Guide](DEPLOYMENT.md) | How to deploy to testnet/mainnet |
| [FAQ](FAQ.md) | Frequently asked questions |

## Getting Started

1. **New to the project?** Start with the [README](../README.md)
2. **Want to integrate?** Check the [API Reference](API.md)
3. **Planning to deploy?** Read the [Deployment Guide](DEPLOYMENT.md)
4. **Understanding the system?** See [Architecture](ARCHITECTURE.md)

## Contract Documentation

### clicker-v2j
The main counter contract with click tracking and analytics.
- [API Reference - Clicker](API.md#clicker-v2j-contract)
- Key functions: `click`, `get-click-count`, `get-total-clicks`

### tipjar-v2j
Tipping contract with analytics and top tipper tracking.
- [API Reference - TipJar](API.md#tipjar-v2j-contract)
- Key functions: `tip`, `get-total-tips`, `get-tip-count`

### quickpoll-v2j
Polling contract for yes/no voting with results tracking.
- [API Reference - QuickPoll](API.md#quickpoll-v2j-contract)
- Key functions: `vote`, `get-results`, `get-total-votes`

## Contributing

- [Contributing Guide](../CONTRIBUTING.md) - How to contribute
- [Code of Conduct](../CODE_OF_CONDUCT.md) - Community guidelines
- [Security Policy](../SECURITY.md) - Reporting vulnerabilities

## Additional Resources

- [Changelog](../CHANGELOG.md) - Version history
- [License](../LICENSE) - MIT License
- [Stacks Documentation](https://docs.stacks.co) - Official Stacks docs
- [Clarity Language Reference](https://docs.stacks.co/clarity) - Clarity documentation

## Support

- Open an [issue](https://github.com/AdekunleBamz/stacks-clicker/issues) for bugs
- Start a [discussion](https://github.com/AdekunleBamz/stacks-clicker/discussions) for questions
- Check [FAQ](FAQ.md) for common questions
