# Offline banner retry state

When connectivity returns, verify the offline banner clears only after a real
network check succeeds, not merely after the browser fires an online event.
