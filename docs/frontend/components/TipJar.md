# TipJar

`TipJar.jsx` is a legacy interaction card supporting:
- Quick tips
- Custom recipient tipping
- Donation flow
- Self ping

Amounts are handled in micro-STX for contract calls.
Keep recipient validation strict to avoid malformed address submissions.
- Keep custom amount guardrails explicit to reduce user-side contract rejection errors.
- Keep minimum tip value copy aligned with contract-level rejection messages.

## Maintenance Note
- Keep displayed fee caveats aligned with current network fee behavior.
- Recheck helper copy when tip presets or recommended amounts are adjusted.
- Revalidate default tip chip values against current fee guidance.
- Keep recipient address trimming and validation behavior aligned with wallet paste workflows.
- Revalidate minimum tip guidance whenever on-chain fee assumptions change.
- Audit prompt: verify minimum and preset tip copy for consistency.
