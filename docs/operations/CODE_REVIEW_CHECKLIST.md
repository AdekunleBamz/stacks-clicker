# Code Review Checklist

- Verify behavior matches intent.
- Check for regressions in state, loading, and error paths.
- Confirm accessibility labels for interactive controls.
- Ensure tests/docs are updated where needed.
- Confirm env/config docs stay in sync when new runtime flags are introduced.
- Validate transaction failures still surface actionable user feedback.
- Confirm a clear rollback path exists for risky behavior changes.
- Verify default network assumptions are explicit when config values are optional.

Companion index: [Operations docs](README.md).

### Review Reminder
- Verify rollback notes mention both UI and contract-facing changes when applicable.
- Confirm reviewer can reproduce key wallet flow locally when risk is high.

Operational note: Ask reviewers to call out missing tests explicitly in approval comments when accepting risk.

Operational note: Call out any migration or data-shape assumptions in review summaries.
