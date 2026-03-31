# Postdeploy Checks

Complete all items after deployment to verify successful release.

## Immediate Checks (0-5 minutes)

### UI Verification
- [ ] Confirm homepage loads without errors.
- [ ] Verify core cards (Clicker, TipJar, QuickPoll) render correctly.
- [ ] Check theme toggle functionality works.
- [ ] Test wallet connection flow end-to-end.

### Interaction Validation
- [ ] Execute one test click transaction.
- [ ] Execute one test tip transaction.
- [ ] Execute one test vote transaction.
- [ ] Verify transaction history updates with new entries.

### Links & Navigation
- [ ] Check explorer links open correct transaction pages.
- [ ] Verify all internal navigation links work.
- [ ] Test mobile responsive layout.

## Short-term Checks (5-30 minutes)

### Transaction Monitoring
- [ ] Record the first successful postdeploy transaction ID in release notes.
- [ ] Monitor transaction confirmations on explorer.
- [ ] Verify gas fees are within expected ranges.

### Communication
- [ ] Announce deploy status to contributors.
- [ ] Update project status page if applicable.
- [ ] Notify community moderators of successful deployment.

### Performance Monitoring
- [ ] Confirm telemetry dashboards show expected traffic.
- [ ] Check error rates are within acceptable thresholds.
- [ ] Monitor page load times and Core Web Vitals.

## Verification Commands

```bash
# Check recent transactions on Stacks explorer
open https://explorer.hiro.so/txid/$TX_ID?chain=mainnet

# Monitor frontend performance
npm run build && npm run preview
```

---

Companion index: [Operations docs](README.md).
