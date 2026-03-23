# Security Review Checklist

- Validate external link handling uses `noopener,noreferrer`.
- Avoid exposing secret keys in code or logs.
- Confirm wallet/session handling errors fail safely.
- Route sensitive reports through private channels.
- Check that debug flags do not leak sensitive payload details in production.

Companion index: [Operations docs](README.md).
