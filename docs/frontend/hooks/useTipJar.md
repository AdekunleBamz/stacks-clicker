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
- Keep broadcast backoff messaging clear when provider quotas are hit.

Source file: `frontend/src/hooks/useTipJar.js`.
