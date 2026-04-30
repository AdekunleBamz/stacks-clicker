# PerformanceOverlay

`PerformanceOverlay.jsx` shows FPS and heap metrics when `?dev` is present in the URL.

It is a developer-only runtime diagnostics layer.
Keep this overlay disabled in production builds to avoid noisy metrics output.

## Maintenance Note
- Reconfirm metric sampling frequency notes when profiling defaults are updated.

- Recheck sampling interval notes when telemetry cadence changes.

- Keep telemetry labels stable to preserve dashboard comparison continuity.
- Avoid exposing wallet or user-identifying values in developer metric overlays.
