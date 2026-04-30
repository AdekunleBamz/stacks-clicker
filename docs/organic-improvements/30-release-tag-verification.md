# Release tag verification

Before publishing release notes, verify that the tag points to the intended commit SHA.
This prevents mismatch between deployed code and announced release content.

- Verify signed tags point to verified commits before release announcement.

### Follow-up
- Include signed-tag verification output in release handoff notes.
- Confirm release notes reference the same tag and commit hash shown in CI artifacts.
