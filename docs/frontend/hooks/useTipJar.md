# useTipJar

`useTipJar` centralizes tip-related contract methods and loading states.

Exposed methods:
- `tip(amount)`
- `withdraw()`
- `handleSelfPing()`
- `isLoading(functionName)`
- Normalize amount input to micro-STX before calling `tip(amount)`.

Source file: `frontend/src/hooks/useTipJar.js`.
