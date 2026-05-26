# Contract Read Timeout Note

## Summary
Contract read timeout reports should separate network latency from missing contract data.

## Checks
- Retry the read against the same network before switching RPC endpoints.
- Record whether the timeout affects score, poll, or tip balance reads.
- Include the endpoint host only when it is safe to share publicly.
