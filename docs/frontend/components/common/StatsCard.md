# StatsCard

`StatsCard.jsx` renders a labeled stat tile and optionally animates numeric transitions.

Use `isPrice` for raw text values that should skip count-up animation.
Avoid animating rapidly changing values to keep motion readable.

## Maintenance Note
- Keep numeric formatting examples aligned with locale and precision defaults.

- Revalidate numeric formatting assumptions when stats units are revised.

- Revalidate unit suffixes whenever metric naming conventions are updated.
- Verify non-finite values gracefully fall back instead of rendering raw `NaN` text.
