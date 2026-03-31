# ClickerCard Component

The `ClickerCard` component wraps clicker interactions in an `ActionCard` container, providing the primary clicking interface for the GameFi experience.

## Overview

- **File**: `frontend/src/components/ClickerCard.jsx`
- **Parent**: [`ActionCard`](../components/ActionCard.md)
- **Hook**: [`useClicker`](../hooks/useClicker.md)

## Primary Actions

| Button | Handler | Description |
| :--- | :--- | :--- |
| `Express Click` | `clicker.click()` | Single click action |
| `Turbo 10x` | `clicker.multiClick(10)` | Batch of 10 clicks |
| `Network Ping` | `clicker.ping()` | Network heartbeat check |

## Props

```tsx
interface ClickerCardProps {
  disabled?: boolean;    // Disable all interactions
  onTransaction?: (txId: string) => void;  // Transaction callback
}
```

## Behavior

### Wallet Connection
- A connected address is required for all actions
- Disconnected actions trigger error feedback via toast
- Wallet connection state is managed by [`WalletContext`](../context/WalletContext.md)

### Loading States
- Keep button disabled/loading state tied to hook-level function keys
- Show spinner during pending transactions
- Display optimistic UI updates for better perceived performance

## Maintenance

- Align displayed action cost labels with current on-chain fee assumptions before each release
- Update cost display when contract fees change
- Verify combo multiplier displays correctly during rapid clicks

## Related Components

- [`ActionCard`](ActionCard.md) - Base card container
- [`useClicker`](../hooks/useClicker.md) - Click interaction hook
- [`ComboBadge`](ComboBadge.md) - Combo multiplier display

---

Source file: `frontend/src/components/ClickerCard.jsx`.
