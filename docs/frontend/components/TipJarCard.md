# TipJarCard Component

The `TipJarCard` component exposes TipJar flows for micro-tipping on the Stacks blockchain.

## Overview

- **File**: `frontend/src/components/TipJarCard.jsx`
- **Parent**: [`ActionCard`](../components/ActionCard.md)
- **Hook**: [`useTipJar`](../hooks/useTipJar.md)

## Primary Actions

| Button | Handler | Description |
| :--- | :--- | :--- |
| `Self Ping` | `tipjar.ping()` | Test transaction to self |
| `Quick Tip` | `tipjar.tip(0.001)` | Fixed 0.001 STX tip |
| `Custom Tip` | `tipjar.tip(amount)` | User-defined amount |

## Validation Rules

- **Minimum amount**: `0.001` STX
- **Maximum amount**: Wallet balance minus gas fees
- **Format**: Decimal numbers only (e.g., `0.005`)

## Props

```tsx
interface TipJarCardProps {
  disabled?: boolean;    // Disable all interactions
  onTransaction?: (txId: string) => void;  // Transaction callback
}
```

## Behavior

### Error Handling
- Invalid or disconnected attempts surface error state and sound feedback
- Display amount formatting help near the input to reduce invalid submissions
- Show clear error messages for insufficient balance

### Accessibility
- Input has descriptive label and validation hints
- Error messages are announced to screen readers
- Keyboard-accessible amount input

## Maintenance

- Keep empty-state copy and min-tip validation notes aligned during UX copy updates
- Update minimum tip amount display if contract changes
- Verify sound feedback works across browsers

## Related Components

- [`ActionCard`](ActionCard.md) - Base card container
- [`useTipJar`](../hooks/useTipJar.md) - Tip interaction hook
- [`TipJar`](TipJar.md) - Full tip jar interface

---

Source file: `frontend/src/components/TipJarCard.jsx`.

- Re-verify minimum amount hints whenever fee assumptions are tuned.

- Reconfirm inline validation timing after custom input behavior changes.
