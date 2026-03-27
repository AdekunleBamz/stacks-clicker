# Performance Budget Notes

- Keep initial screen content responsive while wallet state and price data load.
- Watch for regressions that slow repeated click actions or animation feedback.
- Treat long main-thread tasks during connect or submit flows as release blockers.
- Capture before-and-after measurements when tuning rendering or network polling.
- Prefer budget checks on both low-power mobile and laptop-class hardware.
- Include a cold-start load measurement after any major bundle or route change.

Companion index: [Operations docs](README.md).
