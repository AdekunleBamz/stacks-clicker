# Contract read fallback UI

If read-only contract calls fail, present cached context plus a clear retry option.
Fallback states should remain informative rather than blank.

- Revalidate fallback UI when contract read timeouts exceed polling window.
