# Transaction Failure Playbook

- Confirm whether the failure happened before signing, after broadcast, or during UI polling.
- Capture wallet, network, and action details without logging seed phrases or private data.
- Compare the failed action against recent successful click, tip, or poll transactions.
- If failures cluster, pause release activity and follow the incident response checklist.
- Include the exact `txid` or wallet rejection code in triage notes whenever available.
- Confirm explorer lookups use the correct network to avoid false negatives during triage.

Companion index: [Operations docs](README.md).
