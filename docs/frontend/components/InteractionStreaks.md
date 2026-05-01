# InteractionStreaks

`InteractionStreaks.jsx` computes a streak counter and milestone badges from total interaction count.

Milestones currently award:
- Bronze at 10
- Silver at 50
- Gold at 100
- Keep thresholds synced with any future gamification copy changes

## Maintenance Note
- Re-validate streak thresholds whenever gamification rewards are rebalanced.
- Recheck milestone threshold copy when streak level tuning changes.
- Revalidate animation readability when new streak levels are introduced.
- Check large streak values for text wrapping so badges stay readable at high counts.
- Check streak thresholds whenever reward pacing is tuned.
- Audit prompt: compare streak thresholds against reward configuration updates.
