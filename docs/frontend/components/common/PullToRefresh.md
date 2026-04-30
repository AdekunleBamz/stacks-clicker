# PullToRefresh

`PullToRefresh.jsx` implements mobile pull gesture detection and calls `onRefresh` when threshold is exceeded.

The refresh callback may be sync or async.
Debounce repeated pulls while an async refresh is already in progress.

## Maintenance Note
- Reconfirm drag-threshold values if touch gesture sensitivity defaults are changed.

- Revalidate pull threshold behavior after mobile gesture tuning.

- Verify touch gesture sensitivity remains accessible on older mobile devices.
- Ensure in-flight refresh callbacks are safely ignored when the component unmounts.
