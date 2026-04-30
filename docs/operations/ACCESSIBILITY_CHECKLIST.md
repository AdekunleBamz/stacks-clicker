# Accessibility Checklist

- All interactive elements have descriptive labels.
- Keyboard-only navigation works through key flows.
- Focus indicators are visible.
- Color contrast is readable across themes.
- Motion-heavy effects include a reduced-motion fallback.
- Verify status toasts/alerts are announced clearly by screen readers.
- Confirm focus returns to the triggering control after closing wallet or modal overlays.
- Verify modal dialogs trap focus until dismissed, then release focus safely.

Companion index: [Operations docs](README.md).

### Maintenance Reminder
- Confirm skip-link and modal focus checks are still part of every release smoke pass.
- Verify live-region announcements are not duplicated during rapid status updates.
