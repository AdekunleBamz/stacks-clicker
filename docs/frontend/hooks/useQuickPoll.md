# useQuickPoll

`useQuickPoll` provides poll interaction calls with keyed loading state.

Exposed methods:
- `vote(pollId, option)`
- `createPoll(question)`
- `handlePollPing()`
- `isLoading(functionName)`
- Validate question length before `createPoll` to avoid rejected transactions.
