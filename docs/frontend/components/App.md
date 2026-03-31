# App Component

The `App` component is the root container that coordinates global UI concerns for the Stacks Clicker application.

## Responsibilities

### Theme Management
- Theme persistence using localStorage
- Theme toggle behavior with smooth transitions
- System preference detection (`prefers-color-scheme`)

### Transaction Management
- Transaction log creation and state management
- Optimistic stats updates for immediate feedback
- Transaction history persistence

### Keyboard Shortcuts
| Key | Action |
| :--- | :--- |
| `C` | Trigger click action |
| `T` | Open tip modal |
| `?` | Toggle help overlay |
| `Esc` | Close modals |

### Component Loading
- Lazy-loaded primary sections for performance
- Overlay management for modals and dialogs
- Loading states and skeletons

## Architecture

```jsx
// Use useInteractions for chain actions
const { click, tip, poll, transactions } = useInteractions();

// Pass sub-APIs to MainGrid
<MainGrid
  onAction={handleAction}
  transactions={transactions}
/>
```

## Guidelines

- Keep global side effects centralized here to minimize prop drilling complexity
- Keep analytics and global browser side effects centralized to simplify debugging
- Update this document whenever keyboard shortcuts change to keep support docs accurate

## Related Components

- [`MainGrid`](MainGrid.md) - Primary content layout
- [`useInteractions`](../hooks/useInteractions.md) - Chain action hooks
- [`WalletContext`](../context/WalletContext.md) - Wallet state management

---

Source file: `frontend/src/App.jsx`.
