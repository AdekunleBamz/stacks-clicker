# Security Review Note

- Re-check contract call parameters for user inputs.
- Validate post conditions for all write transactions.
- Ensure sensitive env values are never logged.
- Confirm dependency advisories are reviewed each release.

- Reconfirm security review scope whenever wallet session flows are expanded.

### Follow-up
- Recheck third-party key storage assumptions during security reviews.
- Confirm secret scanning covers newly added configuration and docs files.
