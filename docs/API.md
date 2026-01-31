# StacksClicker v2j API Reference

Complete API documentation for all v2j smart contracts.

## Contract Addresses (Mainnet)

```
Owner: SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N
Clicker: SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.clicker-v2j
TipJar: SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.tipjar-v2j
QuickPoll: SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.quickpoll-v2j
```

## Common Constants

All v2j contracts share these constants:

| Constant | Value | Description |
|----------|-------|-------------|
| `VERSION` | `u2` | Contract version |
| `interaction-fee` | `u1000` | Fee per action (0.001 STX) |

---

## Clicker v2j

### Public Functions

#### `click`
Increment your click counter by 1.

```clarity
(define-public (click))
```

**Cost**: 0.001 STX  
**Returns**: `(ok uint)` - Your new total clicks  
**Event**: `{ event: "click", user: principal, count: uint, block: uint }`

---

#### `multi-click`
Increment your click counter by multiple (capped at 100).

```clarity
(define-public (multi-click (count uint)))
```

**Parameters**:
- `count`: Number of clicks to add (max 100)

**Cost**: 0.001 STX  
**Returns**: `(ok uint)` - Number of clicks added  
**Event**: `{ event: "multi-click", user: principal, added: uint, total: uint, block: uint }`

---

#### `ping`
Send a heartbeat transaction.

```clarity
(define-public (ping))
```

**Cost**: 0.001 STX  
**Returns**: `(ok uint)` - Current block height  
**Event**: `{ event: "ping", user: principal, block: uint }`

---

#### `reset-streak`
Reset your click streak to zero.

```clarity
(define-public (reset-streak))
```

**Cost**: 0.001 STX  
**Returns**: `(ok bool)` - true  
**Event**: `{ event: "reset-streak", user: principal, block: uint }`

---

### Read-Only Functions

#### `get-version`
```clarity
(define-read-only (get-version))
;; Returns: uint (u2)
```

#### `get-total-clicks`
```clarity
(define-read-only (get-total-clicks))
;; Returns: uint - Total clicks across all users
```

#### `get-user-clicks`
```clarity
(define-read-only (get-user-clicks (user principal)))
;; Returns: uint - Click count for user
```

#### `get-user-streak`
```clarity
(define-read-only (get-user-streak (user principal)))
;; Returns: uint - Streak count for user
```

#### `get-unique-users`
```clarity
(define-read-only (get-unique-users))
;; Returns: uint - Number of unique clickers
```

#### `get-contract-info`
```clarity
(define-read-only (get-contract-info))
;; Returns: {
;;   version: uint,
;;   total-clicks: uint,
;;   unique-users: uint,
;;   fee: uint,
;;   last-activity: uint,
;;   owner: principal
;; }
```

---

## TipJar v2j

### Public Functions

#### `quick-tip`
Send a quick 0.001 STX tip to the contract owner.

```clarity
(define-public (quick-tip))
```

**Cost**: 0.002 STX (0.001 fee + 0.001 tip)  
**Returns**: `(ok uint)` - Amount tipped (1000)  
**Event**: `{ event: "tip-jar", user: principal, amount: uint, block: uint }`

---

#### `tip-jar`
Send a custom tip amount to the contract owner.

```clarity
(define-public (tip-jar (amount uint)))
```

**Parameters**:
- `amount`: Tip amount in microSTX

**Cost**: 0.001 STX + amount  
**Returns**: `(ok uint)` - Amount tipped  
**Event**: `{ event: "tip-jar", user: principal, amount: uint, block: uint }`

---

#### `tip-user`
Send a tip to another user.

```clarity
(define-public (tip-user (recipient principal) (amount uint)))
```

**Parameters**:
- `recipient`: Address to receive the tip
- `amount`: Tip amount in microSTX

**Cost**: 0.001 STX + amount  
**Returns**: `(ok uint)` - Amount tipped  
**Event**: `{ event: "tip-user", from: principal, to: principal, amount: uint, block: uint }`

---

#### `donate`
Donate to the contract owner.

```clarity
(define-public (donate (amount uint)))
```

**Cost**: 0.001 STX + amount  
**Returns**: `(ok bool)` - true  
**Event**: `{ event: "donate", user: principal, amount: uint, block: uint }`

---

#### `self-ping`
Send a heartbeat transaction.

```clarity
(define-public (self-ping))
```

**Cost**: 0.001 STX  
**Returns**: `(ok principal)` - Your address  
**Event**: `{ event: "self-ping", user: principal, block: uint }`

---

### Read-Only Functions

#### `get-version`
```clarity
(define-read-only (get-version))
;; Returns: uint (u2)
```

#### `get-total-tips`
```clarity
(define-read-only (get-total-tips))
;; Returns: uint - Total tips in microSTX
```

#### `get-tip-count`
```clarity
(define-read-only (get-tip-count))
;; Returns: uint - Number of tip transactions
```

#### `get-unique-tippers`
```clarity
(define-read-only (get-unique-tippers))
;; Returns: uint - Number of unique tippers
```

#### `get-largest-tip`
```clarity
(define-read-only (get-largest-tip))
;; Returns: uint - Largest single tip amount
```

#### `get-contract-info`
```clarity
(define-read-only (get-contract-info))
;; Returns: {
;;   version: uint,
;;   total-tips: uint,
;;   tip-count: uint,
;;   unique-tippers: uint,
;;   largest-tip: uint,
;;   fee: uint,
;;   last-activity: uint,
;;   owner: principal
;; }
```

---

## QuickPoll v2j

### Public Functions

#### `create-poll`
Create a new poll.

```clarity
(define-public (create-poll (question (string-ascii 100))))
```

**Parameters**:
- `question`: Poll question (max 100 ASCII characters)

**Cost**: 0.001 STX  
**Returns**: `(ok uint)` - Poll ID  
**Event**: `{ event: "create-poll", creator: principal, poll-id: uint, question: string, block: uint }`

---

#### `vote-yes`
Vote yes on a poll.

```clarity
(define-public (vote-yes (poll-id uint)))
```

**Parameters**:
- `poll-id`: ID of the poll to vote on

**Cost**: 0.001 STX  
**Returns**: `(ok bool)` - true  
**Errors**: 
- `u100` - Already voted
- `u101` - Poll not found
- `u102` - Poll ended  
**Event**: `{ event: "vote-yes", voter: principal, poll-id: uint, block: uint }`

---

#### `vote-no`
Vote no on a poll.

```clarity
(define-public (vote-no (poll-id uint)))
```

**Parameters**:
- `poll-id`: ID of the poll to vote on

**Cost**: 0.001 STX  
**Returns**: `(ok bool)` - true  
**Errors**: Same as vote-yes  
**Event**: `{ event: "vote-no", voter: principal, poll-id: uint, block: uint }`

---

#### `close-poll`
Close a poll (creator only).

```clarity
(define-public (close-poll (poll-id uint)))
```

**Parameters**:
- `poll-id`: ID of the poll to close

**Cost**: 0.001 STX  
**Returns**: `(ok bool)` - true  
**Errors**:
- `u101` - Poll not found
- `u103` - Not creator  
**Event**: `{ event: "close-poll", closer: principal, poll-id: uint, block: uint }`

---

#### `quick-vote-yes` / `quick-vote-no`
Vote on the most recent poll.

```clarity
(define-public (quick-vote-yes))
(define-public (quick-vote-no))
```

**Cost**: 0.001 STX  
**Returns**: `(ok bool)` - true  
**Errors**: `u104` - No poll exists

---

#### `poll-ping`
Send a heartbeat transaction.

```clarity
(define-public (poll-ping))
```

**Cost**: 0.001 STX  
**Returns**: `(ok uint)` - Current poll count  
**Event**: `{ event: "poll-ping", user: principal, block: uint }`

---

### Read-Only Functions

#### `get-poll`
```clarity
(define-read-only (get-poll (poll-id uint)))
;; Returns: (optional {
;;   question: string-ascii,
;;   yes-votes: uint,
;;   no-votes: uint,
;;   created-at: uint,
;;   creator: principal,
;;   active: bool
;; })
```

#### `get-latest-poll`
```clarity
(define-read-only (get-latest-poll))
;; Returns: (optional poll) - Most recent poll
```

#### `has-voted`
```clarity
(define-read-only (has-voted (poll-id uint) (voter principal)))
;; Returns: bool
```

#### `get-unique-voters`
```clarity
(define-read-only (get-unique-voters))
;; Returns: uint
```

#### `get-unique-creators`
```clarity
(define-read-only (get-unique-creators))
;; Returns: uint
```

#### `get-contract-info`
```clarity
(define-read-only (get-contract-info))
;; Returns: {
;;   version: uint,
;;   poll-count: uint,
;;   total-votes: uint,
;;   unique-voters: uint,
;;   unique-creators: uint,
;;   fee: uint,
;;   last-activity: uint,
;;   owner: principal
;; }
```

---

## Error Codes

| Code | Contract | Description |
|------|----------|-------------|
| u100 | All | Insufficient fee / Already voted |
| u101 | All | Transfer failed / Poll not found |
| u102 | QuickPoll | Poll ended |
| u103 | QuickPoll | Not creator |
| u104 | QuickPoll | No poll exists |

---

## Usage Examples

### JavaScript/TypeScript

```javascript
import { openContractCall } from '@stacks/connect';
import { uintCV, stringAsciiCV, principalCV } from '@stacks/transactions';

// Click
await openContractCall({
  contractAddress: 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N',
  contractName: 'clicker-v2j',
  functionName: 'click',
  functionArgs: [],
});

// Multi-click
await openContractCall({
  contractAddress: 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N',
  contractName: 'clicker-v2j',
  functionName: 'multi-click',
  functionArgs: [uintCV(50)],
});

// Create poll
await openContractCall({
  contractAddress: 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N',
  contractName: 'quickpoll-v2j',
  functionName: 'create-poll',
  functionArgs: [stringAsciiCV('Is Bitcoin the future?')],
});

// Tip user
await openContractCall({
  contractAddress: 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N',
  contractName: 'tipjar-v2j',
  functionName: 'tip-user',
  functionArgs: [
    principalCV('SP2...RECIPIENT'),
    uintCV(10000), // 0.01 STX
  ],
});
```

---

*Last updated: January 2026*
