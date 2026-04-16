# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Guidelines

- Use `YYYY-MM-DD` release dates and move shipped entries out of `Unreleased`.
- Group changes by type: Added, Changed, Deprecated, Removed, Fixed, Security.
- Link version tags to GitHub release pages when available.

## [Unreleased]
### Changed
- Improved contributor and setup documentation quality.
- Enhanced security policy with detailed procedures.
- Updated code of conduct with comprehensive guidelines.
- Improved roadmap documentation with progress legend.
- Consolidated STACKS_NETWORK and explorer URL references to shared constants.
- Replaced all `style jsx` non-standard pragmas with standard style tags.
- Marked passive event listeners across scroll, resize, focus and key hooks.
- Added COMBO_TIMEOUT_MS and PRICE_REFRESH_INTERVAL_MS to constants module.
- Derived tip amounts from MIN_TIP_MICRO_STX instead of hardcoded values.

### Fixed
- useWindowFocus, useKeyPress, useNetworkStatus, useWindowSize missing passive flags.
- Initial focus target in OnboardingTour now points to the correct button class.
- ScrollArea effect missing handleScroll in dependency array.

## [v2p] - 2026-03-11
### Added
- Comprehensive documentation improvements (Batch 1).
- Visual Guide section in README.md.
- CONTRIBUTING.md for project standards.
- Detailed JSDoc for main components and context.
- Detailed internal comments for transaction handlers in App.jsx.

### Changed
- Refactored README.md feature descriptions for clarity.
- Updated WalletConnect utility documentation.

## [v2n] - 2026-03-10
### Added
- Simplified global voting system (QuickPoll v2n).
- Network heartbeat indicator.

## [v2m] - 2026-03-09
### Added
- TipJar micro-tipping protocol.
- Clicker streak mechanics.
- Initial mainnet deployment plan.
