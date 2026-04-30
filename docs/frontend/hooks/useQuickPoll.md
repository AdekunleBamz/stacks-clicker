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

- Reconfirm vote expiry defaults when contract-level timing windows change.

- Reconfirm default option validation when poll form constraints shift.

### Maintenance Note
- Keep expiry and validation notes aligned with current poll contract behavior.
