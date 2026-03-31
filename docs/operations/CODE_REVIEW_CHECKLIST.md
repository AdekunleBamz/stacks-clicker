# Code Review Checklist

Use this checklist when reviewing pull requests to ensure code quality.

## Functionality

- [ ] Verify behavior matches the intended requirements.
- [ ] Check for regressions in state management.
- [ ] Check for regressions in loading states.
- [ ] Check for regressions in error handling paths.
- [ ] Validate edge cases are handled appropriately.

## User Experience

- [ ] Confirm accessibility labels for interactive controls.
- [ ] Validate transaction failures surface actionable user feedback.
- [ ] Check loading indicators are clear and informative.
- [ ] Verify error messages are user-friendly and actionable.

## Code Quality

- [ ] Code follows project style guidelines.
- [ ] Functions are small and focused on single responsibility.
- [ ] Variable and function names are descriptive and clear.
- [ ] Complex logic has explanatory comments.

## Testing & Documentation

- [ ] Ensure tests are updated where needed.
- [ ] Ensure documentation is updated where needed.
- [ ] New features have corresponding test coverage.
- [ ] Existing tests pass with the changes.

## Security & Performance

- [ ] No sensitive data exposed in logs or error messages.
- [ ] Input validation is performed on user-provided data.
- [ ] No obvious performance regressions introduced.
- [ ] Contract interactions follow security best practices.

## Risk Assessment

- [ ] Confirm a clear rollback path exists for risky behavior changes.
- [ ] Changes are backward compatible or migration is documented.
- [ ] Database schema changes are reviewed and approved.

---

Companion index: [Operations docs](README.md).
