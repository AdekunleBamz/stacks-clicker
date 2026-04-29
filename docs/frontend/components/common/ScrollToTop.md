# ScrollToTop

`ScrollToTop.jsx` reveals a floating control after vertical scroll and returns the user to the top smoothly.

It uses passive scroll listening for lower main-thread overhead.
Keep reveal threshold high enough to avoid showing the button on minor scrolls.

## Maintenance Note
- Revisit visibility threshold notes after major layout or viewport breakpoint changes.

- Re-test reveal threshold after major layout height adjustments.

- Reconfirm scroll trigger offsets after major page layout changes.
