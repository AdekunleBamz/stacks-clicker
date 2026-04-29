# Predeploy Checks

- Confirm target network and deployment plan file.
- Ensure deployer wallet balance is sufficient.
- Verify latest commit hash and changelog alignment.
- Ensure your local branch is synced with `origin/main` before generating deploy artifacts.
- Keep rollback commit reference prepared.
- Confirm environment variables match the intended target network.
- Confirm deploy operator clock is synced to avoid confusing timestamp drift in release logs.
- Reconfirm deploy wallet can sign transactions before entering the release window.

Companion index: [Operations docs](README.md).
