# Commit Guidelines

This project follows an atomic commit workflow to maintain a clean, understandable git history.

## Commit Structure

- **Keep commits focused** on one concern or change.
- **Use imperative mood** in commit subjects (e.g., "Add feature" not "Added feature").
- **Avoid mixing** refactors with behavior changes in the same commit.
- **Include docs or tests** when behavior changes to maintain documentation parity.

## Signing Commits

All commits to shared branches must be signed:

```bash
git commit -S -m "Your commit message"
```

### Verifying Signatures

1. Check the latest signature locally:
   ```bash
   git log -1 --show-signature
   ```

2. Confirm the pushed commit shows a `Verified` badge on GitHub before requesting review.

## Commit Message Format

```
type: short description

Longer description if needed.

- Bullet points for key changes
- References to issues or PRs

Co-authored-by: Name <email@example.com>
```

### Types

| Type | Description |
| :--- | :--- |
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, semicolons) |
| `refactor` | Code refactoring |
| `perf` | Performance improvement |
| `test` | Test additions or modifications |
| `chore` | Build process or auxiliary tool changes |

## Examples

```bash
# Good: focused, imperative, specific
git commit -S -m "docs: add commit guidelines to operations docs"

# Good: with body
git commit -S -m "feat: add dark mode toggle

- Add theme context provider
- Implement toggle button in header
- Persist preference to localStorage

Closes #42"

# Bad: too vague
git commit -S -m "fix stuff"

# Bad: multiple concerns
git commit -S -m "fix bug and update docs and refactor utils"
```

---

Companion index: [Operations docs](README.md).
