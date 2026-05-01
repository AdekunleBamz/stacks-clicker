# Header Component

The `Header` component renders the application header with network identity, language selection, theme toggle, and wallet connection state.

Props:
- `theme`: current theme string
- `toggleTheme`: callback that flips theme state
- Keep wallet state text concise so header remains scannable on mobile

## Maintenance Note
- Keep language selector defaults aligned with i18n fallback settings to avoid mismatched initial state.
- Ensure network status fallback text remains user-friendly when heartbeat data is unavailable.
- Revisit language fallback behavior when locale defaults are updated.
- Verify header wallet status labels remain short enough for small screens.
- Test the connected wallet label with long addresses to avoid overflow at common mobile widths.
- Revalidate language selector defaults when introducing new locales.
- Audit prompt: review language fallback ordering before each release cut.
