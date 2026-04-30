# Branching Guide

This document outlines the branching strategy for the project.

## Primary Branch

The `main` branch is the primary branch and represents the current production-ready state.

## Branch Types

### Feature Branches
- Branch from `main` for new features.
- Use descriptive names: `feat/description-of-feature`.
- Keep branches short-lived (ideally less than 1 week).
- Merge via pull request after code review.

### Bug Fix Branches
- Branch from `main` for bug fixes.
- Use descriptive names: `fix/description-of-bug`.
- Include test cases that reproduce the bug.
- Merge via pull request after verification.

### Hotfix Branches
- For urgent production fixes only.
- Use names: `hotfix/description-of-fix`.
- Include clear rollback paths in commit messages.
- Merge directly to `main` after minimal review.

## Workflow

### Before Opening a PR
1. Sync with latest `main`:
   ```bash
   git fetch origin main
   git rebase origin/main
   ```
2. Run full test suite locally.
3. Ensure all commits are signed (`git commit -S`).

### Pull Request Process

- Delete merged feature and bug-fix branches promptly to keep branch lists readable.
1. Request review from at least one maintainer.
2. Address all review feedback.
3. Ensure CI passes on the PR.
4. Squash merge to `main` if multiple small commits exist.

## Naming Conventions

| Type | Prefix | Example |
| :--- | :--- | :--- |
| Feature | `feat/` | `feat/add-dark-mode` |
| Bug Fix | `fix/` | `fix/wallet-reconnect` |
| Hotfix | `hotfix/` | `hotfix/transaction-timeout` |
| Documentation | `docs/` | `docs/update-readme` |
| Refactor | `refactor/` | `refactor/extract-hooks` |

## Cleanup

- Delete merged branches after successful merge.
- Clean up stale branches older than 30 days.

---

Companion index: [Operations docs](README.md).

- Reconfirm branch naming examples when workflow conventions evolve.

### Team Reminder
- Reconfirm branch naming and back-merge expectations before cutting a hotfix.
- Confirm hotfix branches are deleted after merge to reduce accidental reuse risk.
