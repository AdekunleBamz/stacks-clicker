# Transaction Failure Playbook

- Confirm whether the failure happened before signing, after broadcast, or during UI polling.
- Capture wallet, network, and action details without logging seed phrases or private data.
- Compare the failed action against recent successful click, tip, or poll transactions.
- If failures cluster, pause release activity and follow the incident response checklist.
- Include the exact `txid` or wallet rejection code in triage notes whenever available.
- Confirm explorer lookups use the correct network to avoid false negatives during triage.
- Capture provider throttle details (`TooMuchChaining`, quota retry seconds) when present.
- When retrying after throttling, document the cooldown used before the next broadcast attempt.
- Record whether wallet rejection happened before or after user confirmation to improve UX follow-up.

Companion index: [Operations docs](README.md).

- Reconfirm failure playbook escalation path after support rota changes.

### Recovery Reminder
- Confirm user wallet remains connected before retrying failed transactions.
- Capture whether nonce or mempool state looked stale before re-broadcast attempts.
