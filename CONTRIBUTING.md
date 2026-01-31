# Contributing to StacksClicker

Thank you for your interest in contributing to StacksClicker! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We're building together.

## Getting Started

### Prerequisites

- Node.js 18+
- [Clarinet](https://github.com/hirosystems/clarinet) installed
- A code editor (VS Code recommended)
- Git

### Local Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/stacks-clicker.git
   cd stacks-clicker
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install
   ```

3. **Run tests to verify setup**
   ```bash
   clarinet test
   ```

## Development Workflow

### Branch Naming Convention

- `feat/` - New features (e.g., `feat/leaderboard`)
- `fix/` - Bug fixes (e.g., `fix/vote-counting`)
- `docs/` - Documentation (e.g., `docs/api-reference`)
- `test/` - Test additions (e.g., `test/tipjar-edge-cases`)
- `refactor/` - Code refactoring (e.g., `refactor/fee-collection`)
- `ci/` - CI/CD changes (e.g., `ci/add-coverage`)

### Commit Message Format

We follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `test` - Adding tests
- `refactor` - Code refactoring
- `chore` - Maintenance tasks
- `ci` - CI/CD changes

**Examples:**
```
feat(clicker): add streak multiplier bonus
fix(quickpoll): prevent voting on closed polls
docs(readme): update contract addresses
test(tipjar): add edge case tests for zero tips
```

## Smart Contract Development

### Contract Guidelines

1. **Fee Collection**: All public functions should collect the interaction fee
2. **Events**: Emit print events for all state-changing operations
3. **Error Handling**: Use descriptive error constants
4. **Documentation**: Add comments explaining complex logic

### Testing Requirements

- All new features must have corresponding tests
- Tests should cover success and failure cases
- Run `clarinet test` before submitting PR

### Contract Versioning

When making breaking changes, create a new contract version:
- `contract-v2i.clar` → `contract-v2j.clar` → `contract-v2k.clar`

## Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** with clear commits
3. **Run tests** and ensure they pass
4. **Update documentation** if needed
5. **Submit PR** with a clear description

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests passing

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed my code
- [ ] Commented complex areas
- [ ] Documentation updated
```

## Contract Security

### Security Checklist

- [ ] No reentrancy vulnerabilities
- [ ] Proper authorization checks
- [ ] Input validation on all parameters
- [ ] Safe arithmetic operations
- [ ] Fee collection before state changes

### Reporting Security Issues

If you discover a security vulnerability, please email the maintainers directly instead of creating a public issue.

## Questions?

Open an issue with the `question` label or reach out to maintainers.

---

Thank you for contributing! 🚀
