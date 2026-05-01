# ErrorBoundary

`ErrorBoundary.jsx` catches runtime React tree failures and displays a recoverable fallback card.

Fallback behavior:
- Shows captured error message
- Offers a retry action that resets boundary state
- Avoid exposing sensitive stack details in user-facing copy

## Maintenance Note
- Include likely user recovery steps beside retry when the failure source is known.
- Re-test retry flow messaging after any fallback boundary logic change.
- Ensure fallback path references match the latest transaction status patterns.
- Capture a lightweight correlation ID in fallback copy when incidents require support follow-up.
- Reconfirm retry behavior surfaces useful context after recoverable runtime failures.
- Audit prompt: ensure retry affordance still clears stale error state.
