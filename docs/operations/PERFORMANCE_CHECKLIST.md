# Performance Checklist

- Confirm lazy-loaded sections render without blocking.
- Avoid unnecessary rerenders in hot interaction components.
- Keep expensive listeners passive where possible.
- Verify mobile scrolling and animation smoothness.
- Capture one before/after performance trace when tuning hot paths.
- Re-check performance after enabling debug logging flags.
- Include at least one trace from a low-end mobile profile when performance regressions are suspected.
- Compare trace results with and without a connected wallet session for parity.

Companion index: [Operations docs](README.md).

### Checklist Reminder
- Include at least one low-memory mobile run when validating performance regressions.
