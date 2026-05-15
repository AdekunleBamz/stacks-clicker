# Support Redaction Bundle

## Summary
Support handoffs should include enough transaction context for debugging while avoiding private wallet material.

## Checks
- Include network, tx ID, and contract name when available.
- Do not paste mnemonics, private keys, or full `.env` contents into tickets.
- Redact screenshots before attaching wallet or API configuration panels.
