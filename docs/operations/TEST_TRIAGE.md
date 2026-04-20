# Test Triage

- Reproduce failure with the smallest relevant test file.
- Separate flaky environment issues from logic regressions.
- Fix root cause before adjusting assertions.
- Document recurring failures for maintainers.
- Record failing commit hash when triage starts for reproducibility.
- Tag suspected flakes clearly so they are tracked separately from confirmed regressions.
- Capture Node/npm and wallet extension versions in the triage note when failures are environment-specific.

Companion index: [Operations docs](README.md).
