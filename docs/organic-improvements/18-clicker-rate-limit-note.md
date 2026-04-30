# Clicker rate-limit guardrail

When adjusting click throughput rules, re-check server and client limits together.
Unaligned limits create false failure states and noisy support reports.

- Reconfirm rate-limit fallback copy stays actionable for user retries.

### Follow-up
- Validate clicker rate-limit notes against current throttling constants.
- Reconfirm retry-window values are consistent between backend responses and UI copy.
