# Header Component

The `Header` component renders the application header with network identity, language selection, theme toggle, and wallet connection state.

Props:
- `theme`: current theme string
- `toggleTheme`: callback that flips theme state
- keep wallet state text concise so header remains scannable on mobile

- Keep language selector defaults aligned with i18n fallback settings to avoid mismatched initial state.
