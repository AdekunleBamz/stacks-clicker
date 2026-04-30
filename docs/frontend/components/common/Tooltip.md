# Tooltip

`Tooltip.jsx` wraps children and reveals delayed hover/focus help text.

It supports keyboard accessibility by opening on focus and closing on blur.
Keep tooltip content short enough to avoid obscuring nearby controls.

## Maintenance Note
- Recheck hover/focus delay values whenever interaction timing is tuned globally.

- Re-test trigger delay and escape behavior after tooltip interaction changes.

- Reconfirm tooltip portal stacking order when modal layering changes.
- Re-test tooltip discoverability on touch devices where hover is unavailable.
