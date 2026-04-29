# I18nContext.test

Covers:
- default English fallback
- persisted language switching
- unsupported language fallback behavior
- translation lookup fallback when a key is missing

## Maintenance Note
- Keep fallback-locale test cases updated when language packs are added.

- Revisit fallback key coverage whenever locale bootstrap behavior changes.

- Recheck missing-key fallback assertions when locale bundles are reorganized.
