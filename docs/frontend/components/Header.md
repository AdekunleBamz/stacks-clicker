# Header Component

The `Header` component renders the application header with network identity, language selection, theme toggle, and wallet connection state.

## Overview

- **File**: `frontend/src/components/Header.jsx`
- **Location**: Top navigation bar
- **Children**: [`NetworkHeartbeat`](NetworkHeartbeat.md), [`NetworkLogo`](NetworkLogo.md), [`ConnectButton`](ConnectButton.md)

## Rendered Elements

| Element | Component | Description |
| :--- | :--- | :--- |
| Network Identity | `NetworkHeartbeat` + `NetworkLogo` | Shows network status and branding |
| Language Selector | `useI18n` hook | Language switcher dropdown |
| Theme Toggle | Button with icon | Switches between light/dark themes |
| Wallet State | `ConnectButton` | Connect/disconnect wallet |

## Props

```tsx
interface HeaderProps {
  theme: string;                    // Current theme ('light' | 'dark')
  toggleTheme: () => void;          // Theme toggle callback
}
```

## Behavior

### Responsive Design
- Keep wallet state text concise so header remains scannable on mobile
- Collapse language selector on small screens
- Adjust logo size for mobile viewports

### Internationalization
- Keep language selector defaults aligned with i18n fallback settings to avoid mismatched initial state
- Support RTL languages if needed

### Network Status
- Ensure network status fallback text remains user-friendly when heartbeat data is unavailable
- Show loading state during network status fetch

## Maintenance

- Verify header height remains consistent across themes
- Test wallet connection flow from header on all devices
- Update network branding if rebranding occurs

## Related Components

- [`NetworkHeartbeat`](NetworkHeartbeat.md) - Network status indicator
- [`NetworkLogo`](NetworkLogo.md) - Brand logo
- [`ConnectButton`](ConnectButton.md) - Wallet connection button
- [`App`](App.md) - Parent component

---

Source file: `frontend/src/components/Header.jsx`.
