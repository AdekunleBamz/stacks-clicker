# QuickPollCard Component

The `QuickPollCard` component supports quick poll creation and voting on the Stacks blockchain.

## Overview

- **File**: `frontend/src/components/QuickPollCard.jsx`
- **Parent**: [`ActionCard`](../components/ActionCard.md)
- **Hook**: [`useQuickPoll`](../hooks/useQuickPoll.md)

## Primary Actions

| Button | Handler | Description |
| :--- | :--- | :--- |
| `Ping` | `poll.ping()` | Poll heartbeat check |
| `Create Poll` | `poll.create(question)` | Create new poll |
| `Yes` | `poll.vote(true)` | Vote yes on active poll |
| `No` | `poll.vote(false)` | Vote no on active poll |

## Validation Rules

- **Question max length**: 100 characters
- **Question validation**: Trimmed non-empty text required
- **One vote per address**: Enforced at contract level

## Props

```tsx
interface QuickPollCardProps {
  disabled?: boolean;    // Disable all interactions
  onTransaction?: (txId: string) => void;  // Transaction callback
}
```

## Behavior

### Input Validation
- Poll question input enforces max length and trimmed non-empty validation
- Real-time character count display
- Clear error messages for validation failures

### Wallet Connection
- Disconnected state blocks all actions with inline error feedback
- Wallet connection required for voting and poll creation

### UI Updates
- Keep optimistic UI labels in sync with final transaction status updates
- Show loading states during pending transactions
- Display transaction confirmations with explorer links

### Clipboard
- Document clipboard fallback messaging for environments where copy APIs are unavailable
- Show manual copy instructions when clipboard API fails

## Maintenance

- Update character limits if contract changes
- Verify clipboard fallback works in all supported browsers
- Test poll creation with edge case inputs

## Related Components

- [`ActionCard`](ActionCard.md) - Base card container
- [`useQuickPoll`](../hooks/useQuickPoll.md) - Poll interaction hook
- [`QuickPoll`](QuickPoll.md) - Full poll interface

---

Source file: `frontend/src/components/QuickPollCard.jsx`.

- Re-test clipboard fallback behavior after poll card action refactors.

- Recheck copy success feedback after clipboard helper changes.

### Maintenance Note
- Verify toggle accessibility text stays aligned with expanded panel behavior.
- Audit prompt: recheck toggle guidance with panel accessibility attributes.
