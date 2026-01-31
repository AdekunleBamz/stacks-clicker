# Testing Guide

This guide covers how to run tests and write new tests for the Stacks Clicker contracts.

## Prerequisites

- [Clarinet](https://github.com/hirosystems/clarinet) v2.3.0 or later
- Node.js 18+ (for running test scripts)

## Running Tests

### Run All Tests

```bash
clarinet test
```

### Run Specific Test File

```bash
clarinet test tests/clicker-v2j_test.ts
```

### Run Tests with Coverage

```bash
clarinet test --coverage
```

### Run Tests in Watch Mode

```bash
clarinet test --watch
```

## Test Structure

Tests are located in the `tests/` directory:

```
tests/
├── clicker-v2j_test.ts    # Clicker contract tests
├── tipjar-v2j_test.ts     # TipJar contract tests
├── quickpoll-v2j_test.ts  # QuickPoll contract tests
├── edge_cases_test.ts     # Edge case scenarios
├── integration_test.ts    # Cross-contract tests
└── fee_collection_test.ts # Fee verification tests
```

## Writing Tests

### Basic Test Structure

```typescript
import { Clarinet, Tx, Chain, Account, types } from 'clarinet-sdk';
import { describe, it, expect } from 'vitest';

describe('Contract Name', () => {
  it('should do something', () => {
    // Arrange
    const accounts = simnet.getAccounts();
    const wallet1 = accounts.get('wallet_1')!;

    // Act
    const result = simnet.callPublicFn(
      'contract-name',
      'function-name',
      [types.uint(100)],
      wallet1
    );

    // Assert
    expect(result.result).toBeOk(types.bool(true));
  });
});
```

### Testing Read-Only Functions

```typescript
const result = simnet.callReadOnlyFn(
  'contract-name',
  'get-value',
  [],
  wallet1
);
expect(result.result).toBeUint(100);
```

### Testing Error Conditions

```typescript
const result = simnet.callPublicFn(
  'contract-name',
  'function-name',
  [types.uint(0)], // Invalid input
  wallet1
);
expect(result.result).toBeErr(types.uint(101)); // Expected error code
```

### Testing STX Transfers

```typescript
const result = simnet.callPublicFn(
  'tipjar-v2j',
  'tip',
  [],
  wallet1
);

// Verify STX transfer events
const stxEvent = result.events.find(e => e.type === 'stx_transfer_event');
expect(stxEvent).toBeDefined();
expect(stxEvent.stx_transfer_event.amount).toBe('1000');
```

## Test Categories

### Unit Tests
Test individual functions in isolation:
- Input validation
- State changes
- Return values

### Integration Tests
Test contract interactions:
- Cross-contract calls
- State consistency
- Event emissions

### Edge Case Tests
Test boundary conditions:
- Zero values
- Maximum values
- Unauthorized access

## Best Practices

1. **Test one thing at a time** - Each test should verify a single behavior
2. **Use descriptive names** - Test names should explain what's being tested
3. **Arrange-Act-Assert** - Follow the AAA pattern for test structure
4. **Test both success and failure** - Cover error paths
5. **Reset state between tests** - Tests should be independent
6. **Use meaningful test data** - Avoid magic numbers

## Debugging Tests

### View Transaction Logs

```typescript
console.log(result.events);
```

### Check Contract State

```typescript
const state = simnet.getDataVar('contract-name', 'variable-name');
console.log(state);
```

### Run Single Test

```bash
clarinet test --filter "test name"
```

## CI Integration

Tests run automatically on:
- Pull requests to `main`
- Pushes to `main`

See `.github/workflows/test.yml` for CI configuration.
