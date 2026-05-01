# FloatingActionButton

`FloatingActionButton.jsx` exposes mobile-friendly shortcuts:
- Ping all
- Clear activity
- Scroll to top

The main button toggles an expandable quick-action menu with animated items.
Ensure expanded actions remain reachable with keyboard and screen readers.

- Keep quick action labels consistent with matching desktop action names where both exist.

Source file: `frontend/src/components/FloatingActionButton.jsx`.

## Maintenance Note
- Revalidate support-link behavior after quick action menu changes.
- Validate collapsed and expanded states on narrow mobile viewports.
- Verify bottom offset accounts for safe-area insets on modern mobile devices.
- Ensure FAB shortcuts stay in sync with the visible action labels.
- Audit prompt: align shortcut hints with the active FAB action order.
