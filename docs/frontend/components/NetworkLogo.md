# NetworkLogo

`NetworkLogo.jsx` is a visual brand/chain marker used in the top header.

Keep assets lightweight and SVG-first for sharp rendering and low bundle cost.
Provide descriptive `alt` text when this component is wrapped in an image tag.

- Re-check SVG weight after visual updates to prevent accidental bundle growth.

- Recheck logo asset weight whenever replacing network icon variants.

- Revalidate icon contrast after any header theme palette changes.
- Preserve explicit logo dimensions to avoid layout shift during header hydration.

### Maintenance Note
- Confirm network logo source and sizing stay aligned with active branding assets.
- Audit prompt: verify logo asset dimensions after icon pack updates.
