# QA Checklist

Complete this checklist before each release to ensure quality standards.

## Core Functionality

### Wallet Integration
- [ ] Verify wallet connect flow completes successfully.
- [ ] Verify wallet disconnect clears session data.
- [ ] Test wallet reconnection after page refresh.
- [ ] Validate wallet switching between networks.

### User Interactions
- [ ] Confirm click interactions trigger expected UI updates.
- [ ] Confirm tip interactions process transactions correctly.
- [ ] Confirm poll vote interactions update results in real-time.
- [ ] Verify combo multiplier displays correctly.

### Transaction History
- [ ] Check transaction history loads with correct data.
- [ ] Check filtering by type works correctly.
- [ ] Check export actions generate valid files.
- [ ] Verify transaction status indicators are accurate.

## Responsive Design

- [ ] Validate mobile rendering on small screens (<768px).
- [ ] Validate tablet rendering on medium screens (768-1024px).
- [ ] Validate desktop rendering on large screens (>1024px).
- [ ] Test orientation change on mobile devices.

## Performance & Edge Cases

- [ ] Run smoke pass on constrained network profile (slow 3G).
- [ ] Confirm burst submissions surface retry timing correctly.
- [ ] Validate reduced-motion mode preserves critical feedback.
- [ ] Test with empty wallet balance scenarios.
- [ ] Verify error boundaries catch and display errors gracefully.

## Accessibility

- [ ] Test keyboard navigation through all interactive elements.
- [ ] Verify screen reader announces key UI elements.
- [ ] Check color contrast meets WCAG AA standards.
- [ ] Validate focus indicators are visible and clear.

## Maintenance Note

Update regression focus areas after every major feature rollout.

---

Companion index: [Operations docs](README.md).
