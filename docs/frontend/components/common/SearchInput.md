# SearchInput

`SearchInput.jsx` is a reusable controlled input with:
- leading search icon
- optional clear button
- optional match-count badge

Expected props: `value`, `onChange`, and `onClear`.
Keep placeholder text action-oriented to improve discoverability.

## Maintenance Note
- Revalidate empty-query and clear-action behavior notes after search UX updates.

- Reconfirm empty-query behavior when search tokenization logic changes.

- Recheck clear-button behavior when search debounce settings are changed.
