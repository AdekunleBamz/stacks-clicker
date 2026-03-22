# PullToRefresh

`PullToRefresh.jsx` implements mobile pull gesture detection and calls `onRefresh` when threshold is exceeded.

The refresh callback may be sync or async.
Debounce repeated pulls while an async refresh is already in progress.
