# useQuickPoll

`useQuickPoll` provides poll interaction calls with keyed loading state.

Exposed methods:
- `vote(pollId, option)`
- `createPoll(question)`
- `handlePollPing()`
- `isLoading(functionName)`
- Validate question length before `createPoll` to avoid rejected transactions.

## Maintenance Note
- Revisit poll expiry/window assumptions when backend polling cadence is adjusted.

Source file: `frontend/src/hooks/useQuickPoll.js`.
