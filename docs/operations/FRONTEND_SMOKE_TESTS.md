# Frontend Smoke Tests

- Open the landing page and verify primary cards render without layout shifts.
- Connect a wallet and confirm the main action buttons become available.
- Run one click, one tip, and one poll action to confirm success feedback appears.
- Refresh the app and verify recent state still renders as expected.
- Confirm error toast content is readable and actionable when a transaction fails.
- Validate one user-rejected transaction path so cancellation messaging stays clear.
- Dismiss and reopen the wallet popup once to confirm reconnect UX remains stable.
- Verify transaction buttons return to enabled state after a rejected signature.

Companion index: [Operations docs](README.md).

### Smoke Reminder
- Include at least one wallet connect-disconnect cycle in every frontend smoke run.
