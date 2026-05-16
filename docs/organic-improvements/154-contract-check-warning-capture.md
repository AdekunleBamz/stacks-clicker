# Contract check warning capture

When `clarinet check` passes with warnings, keep the warning count in the release evidence.

If the count changes, note whether it came from active contracts or archived compatibility contracts.

This makes warning drift visible without blocking production builds unnecessarily.
