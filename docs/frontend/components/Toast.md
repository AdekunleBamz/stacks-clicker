# Toast

`Toast.jsx` standardizes ephemeral feedback rendering for success/error/informational messages.

Prefer concise copy and action-oriented language for all toast notifications.
Include recovery hints for failures that users can immediately retry.

## Maintenance Note
- Revalidate timeout durations with accessibility guidance whenever toast variants change.
- Reconfirm toast timeout accessibility after changing default durations.
- Keep severity-based live-region behavior aligned with toast type mapping.
- Recheck duplicate-toast suppression so repeated failures do not flood the UI.
- Keep severity-to-live-region mappings aligned with current notification policy.
- Audit prompt: confirm severity announcements still map to toast semantics.
