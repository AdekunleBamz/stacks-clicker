# ConnectButton Component

The `ConnectButton` component shows wallet connection state in compact form, serving as the primary onboarding control.

## Overview

- **File**: `frontend/src/components/ConnectButton.jsx`
- **Hook**: [`WalletContext`](../context/WalletContext.md)

## States

| State | Display | Action |
| :--- | :--- | :--- |
| Disconnected | `Connect Wallet` button | Opens wallet connection modal |
| Connected | Truncated address + disconnect icon | Shows address, allows disconnect |

## Address Formatting

- **Format**: First 6 and last 4 characters (e.g., `SP1234...5678`)
- **Copy on click**: Full address copied to clipboard
- **Tooltip**: Shows full address on hover

## Props

```tsx
interface ConnectButtonProps {
  variant?: 'compact' | 'full';  // Display variant
  onConnect?: () => void;         // Connection callback
  onDisconnect?: () => void;      // Disconnection callback
}
```

## Behavior

### Wallet Connection
- Triggers wallet connection modal on click
- Shows connection progress with loading indicator
- Handles connection errors with user-friendly messages

### Accessibility
- Preserve clear focus styling because this control is primary for onboarding
- Keyboard accessible (Enter/Space to activate)
- ARIA labels for screen readers

### Responsive Design
- Keep connected-state copy short so wallet status remains readable on narrow screens
- Adjust button size on mobile viewports
- Show full address in tooltip on hover

## Maintenance Note

- Verify focus styles meet WCAG contrast requirements
- Test wallet connection flow with multiple wallet types
- Update address truncation if ENS support is added

## Related Components

- [`WalletContext`](../context/WalletContext.md) - Wallet state management
- [`WalletConnectQRModal`](WalletConnectQRModal.md) - QR code modal
- [`Header`](Header.md) - Parent container

---

Source file: `frontend/src/components/ConnectButton.jsx`.

- Reconfirm mobile copy length whenever session-state labels are revised.
- Reconfirm copy-to-clipboard failure fallback messaging for restricted browser contexts.
- Reconfirm reconnect CTA copy remains consistent with support scripts.
- Confirm connect and disconnect affordances remain keyboard and screen-reader friendly.
- Audit prompt: check connect-button narration after locale additions.
