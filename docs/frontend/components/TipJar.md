# TipJar

`TipJar.jsx` is a legacy interaction card supporting:
- quick tips
- custom recipient tipping
- donation flow
- self ping

Amounts are handled in micro-STX for contract calls.
Keep recipient validation strict to avoid malformed address submissions.
- Keep custom amount guardrails explicit to reduce user-side contract rejection errors.
- Keep minimum tip value copy aligned with contract-level rejection messages.

## Maintenance Note
- Keep displayed fee caveats aligned with current network fee behavior.

- Recheck helper copy when tip presets or recommended amounts are adjusted.
