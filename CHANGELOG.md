# Changelog

All notable changes to StacksClicker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2j] - 2026-01-31

### Added
- `VERSION` constant (u2) in all contracts
- Print events for all state-changing operations
- Unique user tracking (`unique-users`, `unique-tippers`, `unique-voters`, `unique-creators`)
- First activity block tracking (`user-first-click`, `user-first-tip`, `user-first-vote`)
- `last-activity-block` variable in all contracts
- `get-contract-info` read-only function in all contracts
- `get-largest-tip` in TipJar for tracking record tips
- Comprehensive test suites for all v2j contracts
- GitHub Actions CI workflow for automated testing
- API reference documentation
- CONTRIBUTING guide
- SECURITY policy
- Issue and PR templates

### Changed
- Enhanced analytics across all contracts
- Improved event emission with more detailed data

### Contracts
- `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.clicker-v2j`
- `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.tipjar-v2j`
- `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.quickpoll-v2j`

---

## [v2i] - 2026-01-30

### Added
- Initial mainnet deployment of v2i contracts
- Clicker game with click/multi-click/ping/reset-streak
- TipJar with quick-tip/tip-user/tip-jar/donate/self-ping
- QuickPoll with create-poll/vote-yes/vote-no/close-poll/poll-ping
- User stats tracking (clicks, tips sent/received, votes)
- Streak system for clicker
- Poll creator permissions

### Contracts
- `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.clicker-v2i`
- `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.tipjar-v2i`
- `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.quickpoll-v2i`

---

## [v1] - 2026-01-15

### Added
- Initial development version
- Basic clicker functionality
- Basic tipping functionality
- Basic polling functionality

### Note
- Deployed to testnet only
