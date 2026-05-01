# ARIA live announcement check

Verify live-region announcements fire for async transaction status updates.
Screen-reader users rely on these cues during long-running confirmations.

- Include delayed toast scenarios when validating live-region announcements.

### Follow-up
- Reconfirm aria-live announcements after notification copy revisions.
- Re-test announcement ordering when multiple transaction updates arrive quickly.

Follow-up note: Include aria-live announcement timing checks for rapid state transitions.
