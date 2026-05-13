# Post-vote state consistency

After a QuickPoll vote, the selected option should stay visually stable while confirmation is pending.

- Preserve the selected option highlight during refetches.
- Avoid resetting the option list when only pending metadata changes.
- Confirm that the final state matches the confirmed transaction result.
