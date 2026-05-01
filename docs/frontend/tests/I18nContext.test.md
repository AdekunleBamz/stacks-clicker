# I18nContext.test

Covers:
- Default English fallback
- Persisted language switching
- Unsupported language fallback behavior
- Translation lookup fallback when a key is missing

## Maintenance Note
- Keep fallback-locale test cases updated when language packs are added.
- Revisit fallback key coverage whenever locale bootstrap behavior changes.
- Recheck missing-key fallback assertions when locale bundles are reorganized.
- Ensure fallback language expectations stay aligned with translation updates.
