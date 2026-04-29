# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Guidelines

- Use `YYYY-MM-DD` release dates and move shipped entries out of `Unreleased`.
- Group changes by type: Added, Changed, Deprecated, Removed, Fixed, Security.
- Link version tags to GitHub release pages when available.
- Mention when a release includes support-facing copy or runbook changes.

## [Unreleased]
### Added
- `PLATINUM` tier (500 interactions) to `STREAK_THRESHOLDS`.
- `MAX_POLL_OPTIONS` constant to cap quick poll option count.
- `isPositiveInteger` helper to validation utils.
- `isCritical` battery flag (level ≤ 5%) to `useBattery`.
- `showWarning` helper to `useNotifications`.
- `isDark` / `isLight` convenience booleans to `useTheme`.
- `isAnyOpen` computed field to `ModalContext`.
- `connectionCount` tracker to `useNetworkStatus`.
- `stop` method to `SoundEngine` for halting sound playback.
- 408 timeout and wallet-disconnected entries to `ERROR_MAP`.
- 2000 interaction milestone threshold to `useMilestones`.

### Changed
- `stringToColor` now varies saturation for more visually distinct colors.
- `useThrottle`, `useDebounce`, `useLongPress`, `useCombo`, `useClipboard` all use `Number.isFinite` for delay validation.
- `useScrollPosition` removal call no longer passes unnecessary passive option.
- `useDocumentTitle` trims whitespace from title before setting.
- `useIntersectionObserver` clamps `threshold` to `[0, 1]`.
- `useWindowSize` extracts debounce delay as a named constant.
- `useWhyDidYouUpdate` and `useTrace` guard against empty component names.
- `useMedia` guards against non-string query arguments.
- `useDocumentVisibility` passes `passive: true` to visibility listener.
- `formatPercent` guards `decimals` param against non-integer values.
- `formatStx` allows display of negative micro-STX values.

### Fixed
- `parseContractError` now handles `disconnected`/`connection lost` error patterns.

### Docs
- Added commit type reference list to `CONTRIBUTING.md`.
- Added response timeline table to `SECURITY.md`.

### Changed (prior)
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
