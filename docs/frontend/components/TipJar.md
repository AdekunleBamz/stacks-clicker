# TipJar

`TipJar.jsx` is a legacy interaction card supporting:
- quick tips
- custom recipient tipping
- donation flow
- self ping

Amounts are handled in micro-STX for contract calls.
Keep recipient validation strict to avoid malformed address submissions.
- Keep custom amount guardrails explicit to reduce user-side contract rejection errors.

## Maintenance Note
- Keep displayed fee caveats aligned with current network fee behavior.
