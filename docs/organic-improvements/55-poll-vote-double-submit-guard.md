# Poll vote double-submit guard

Confirm vote actions disable repeated submits while signatures are pending.
This reduces accidental duplicate confirmations in wallet popups.

- Re-test double-submit behavior on slow network conditions.

### Follow-up
- Validate double-submit guards after any form-state refactor.
