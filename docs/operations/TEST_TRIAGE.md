# Test Triage

- Reproduce failure with the smallest relevant test file.
- Separate flaky environment issues from logic regressions.
- Fix root cause before adjusting assertions.
- Document recurring failures for maintainers.
- Record failing commit hash when triage starts for reproducibility.
- Tag suspected flakes clearly so they are tracked separately from confirmed regressions.
- Save the exact repro command used during triage so reviewers can replay quickly.

Companion index: [Operations docs](README.md).
