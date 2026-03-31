# Frontend Smoke Tests

Quick verification tests to run before each release to ensure core functionality.

## Initial Load

- [ ] Open the landing page and verify primary cards render without layout shifts.
- [ ] Check page loads within acceptable time (<3 seconds on 4G).
- [ ] Verify favicon and page title are correct.
- [ ] Confirm no console errors appear in developer tools.

## Wallet Connection

- [ ] Connect a wallet and confirm the main action buttons become available.
- [ ] Verify wallet address displays correctly (truncated format).
- [ ] Test wallet disconnection clears session state.
- [ ] Test wallet reconnection after page refresh.

## Core Interactions

- [ ] Run one click action and confirm success feedback appears.
- [ ] Run one tip action and confirm transaction completes.
- [ ] Run one poll vote action and confirm results update.
- [ ] Verify combo multiplier displays during rapid clicks.

## State Persistence

- [ ] Refresh the app and verify recent state still renders as expected.
- [ ] Check transaction history persists after refresh.
- [ ] Verify theme preference persists after refresh.
- [ ] Confirm language preference persists after refresh.

## Error Handling

- [ ] Confirm error toast content is readable and actionable when a transaction fails.
- [ ] Validate one user-rejected transaction path so cancellation messaging stays clear.
- [ ] Test network error handling with offline mode.
- [ ] Verify error boundary catches and displays component errors.

## Mobile Verification

- [ ] Test on mobile device or responsive mode.
- [ ] Verify touch interactions work correctly.
- [ ] Check mobile navigation menu functions properly.

---

Companion index: [Operations docs](README.md).
