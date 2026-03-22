# ErrorBoundary

`ErrorBoundary.jsx` catches runtime React tree failures and displays a recoverable fallback card.

Fallback behavior:
- shows captured error message
- offers a retry action that resets boundary state
- avoid exposing sensitive stack details in user-facing copy

- Include likely user recovery steps beside retry when the failure source is known.
