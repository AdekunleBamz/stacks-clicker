# InteractionStreaks

`InteractionStreaks.jsx` computes a streak counter and milestone badges from total interaction count.

Milestones currently award:
- bronze at 10
- silver at 50
- gold at 100
- keep thresholds synced with any future gamification copy changes

- Re-validate streak thresholds whenever gamification rewards are rebalanced.

- Recheck milestone threshold copy when streak level tuning changes.

- Revalidate animation readability when new streak levels are introduced.
- Check large streak values for text wrapping so badges stay readable at high counts.

### Maintenance Note
- Check streak thresholds whenever reward pacing is tuned.
- Audit prompt: compare streak thresholds against reward configuration updates.
