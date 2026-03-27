# Security Review Checklist

- Validate external link handling uses `noopener,noreferrer`.
- Avoid exposing secret keys in code or logs.
- Confirm wallet/session handling errors fail safely.
- Route sensitive reports through private channels.
- Check that debug flags do not leak sensitive payload details in production.
- Review dependency advisories and confirm mitigation status before release cut.

## Maintenance Note
- Refresh threat-model references when authentication or wallet flows are modified.
