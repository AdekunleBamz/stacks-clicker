# Accessibility Checklist

Ensure the application is usable by all users regardless of ability.

## Labels & Semantics

- [ ] All interactive elements have descriptive labels.
- [ ] Form inputs have associated `<label>` elements.
- [ ] Icons without text have `aria-label` attributes.
- [ ] Landmark regions (`main`, `nav`, `footer`) are properly used.
- [ ] Headings follow logical hierarchy (h1 → h2 → h3).

## Keyboard Navigation

- [ ] Keyboard-only navigation works through key flows.
- [ ] All interactive elements are reachable via Tab key.
- [ ] Focus order follows visual layout logically.
- [ ] No keyboard traps exist (user can exit any component).
- [ ] Custom components have appropriate ARIA roles.

## Visual Design

- [ ] Focus indicators are visible and clear.
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text).
- [ ] Color contrast is readable across all themes (light/dark).
- [ ] Text can be resized to 200% without loss of functionality.
- [ ] Interactive elements have sufficient touch target size (44px minimum).

## Motion & Animation

- [ ] Motion-heavy effects include a reduced-motion fallback.
- [ ] `prefers-reduced-motion` media query is respected.
- [ ] Auto-playing animations can be paused or stopped.
- [ ] No content flashes more than 3 times per second.

## Screen Reader Support

- [ ] Status toasts/alerts are announced clearly by screen readers.
- [ ] Live regions (`aria-live`) are used for dynamic content updates.
- [ ] Images have descriptive `alt` text.
- [ ] Links have descriptive text (avoid "click here").
- [ ] Page language is set correctly (`lang` attribute).

## Testing Tools

- [ ] Test with screen reader (NVDA, VoiceOver, or JAWS).
- [ ] Run automated accessibility audit (Lighthouse, axe).
- [ ] Test with keyboard only (no mouse).
- [ ] Verify with browser zoom at 200%.

---

Companion index: [Operations docs](README.md).
