# Security Review Checklist

- Validate external link handling uses `noopener,noreferrer`.
- Avoid exposing secret keys in code or logs.
- Confirm wallet/session handling errors fail safely.
- Route sensitive reports through private channels.
- Check that debug flags do not leak sensitive payload details in production.
- Reconfirm wallet-provider SDK versions are still within supported security patch windows.

## Maintenance Note
- Refresh threat-model references when authentication or wallet flows are modified.

### Security Reminder
- Include wallet connector dependencies in each quarterly security review pass.
- Recheck expiration dates for any accepted vulnerability exceptions.
