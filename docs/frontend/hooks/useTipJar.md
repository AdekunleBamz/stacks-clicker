# useTipJar

`useTipJar` centralizes tip-related contract methods and loading states.

Exposed methods:
- `tip(amount)`
- `withdraw()`
- `handleSelfPing()`
- `isLoading(functionName)`

Input guard:
- Normalize amount input to micro-STX before calling `tip(amount)`.

## Maintenance Note
- Update retry and rate-limit notes whenever tip submission behavior changes.

- Recheck retry and cooldown guidance when tip submission backoff changes.

- Recheck amount parsing edge cases after decimal precision rule changes.

### Maintenance Note
- Verify tip retry guidance reflects current network rate-limit handling.
