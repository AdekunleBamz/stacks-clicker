# TipJar Recipient Validation

## Summary
TipJar recipient validation should catch malformed addresses before users open wallet signing.

## Checks
- Test mainnet, testnet, and whitespace-padded addresses.
- Confirm validation copy identifies the expected network.
- Include one rejected recipient example in QA evidence.
