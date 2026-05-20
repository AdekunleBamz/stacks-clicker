# Clicker idempotency review

Before release, confirm repeated click submissions disable while a transaction
is pending so a slow wallet approval cannot queue duplicate click intents.
