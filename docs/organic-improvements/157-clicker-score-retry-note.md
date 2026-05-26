# Clicker Score Retry Note

## Summary
Score reconciliation checks should distinguish retryable read lag from a permanent score mismatch.

## Checks
- Re-read the score after one fresh block before filing a mismatch.
- Compare the displayed score with the contract read response used by the UI.
- Include the block height and wallet network in the issue notes.
