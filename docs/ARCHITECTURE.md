# Architecture Overview

## System Design

StacksClicker is a decentralized application (dApp) built on the Stacks blockchain. It consists of three independent smart contracts that share a common design pattern.

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Clicker   │  │   TipJar    │  │     QuickPoll       │  │
│  │  Component  │  │  Component  │  │     Component       │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
└─────────┼────────────────┼─────────────────────┼────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    @stacks/connect                           │
│              (Wallet Connection & Signing)                   │
└─────────────────────────────────────────────────────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Stacks Blockchain                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ clicker-v2j │  │ tipjar-v2j  │  │   quickpoll-v2j     │  │
│  │  (Clarity)  │  │  (Clarity)  │  │     (Clarity)       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Contract Architecture

### Common Design Patterns

All v2j contracts share these architectural patterns:

#### 1. Fee Collection First
```clarity
(define-public (action)
  (begin
    (try! (collect-fee))  ;; Always first
    ;; ... rest of logic
  )
)
```

#### 2. Event Emission
```clarity
(print { event: "action-name", user: tx-sender, ... })
```

#### 3. Analytics Tracking
```clarity
(var-set unique-users (+ (var-get unique-users) u1))
(var-set last-activity-block block-height)
```

### Data Flow

```
User Action → Wallet Signs → Broadcast → Contract Executes → Event Emitted
                                              ↓
                                         Fee Collected
                                              ↓
                                         State Updated
                                              ↓
                                         Analytics Updated
```

## Contract Relationships

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  clicker-v2j  │     │  tipjar-v2j   │     │ quickpoll-v2j │
├───────────────┤     ├───────────────┤     ├───────────────┤
│ - clicks      │     │ - tips        │     │ - polls       │
│ - streaks     │     │ - donations   │     │ - votes       │
│ - pings       │     │ - pings       │     │ - pings       │
└───────┬───────┘     └───────┬───────┘     └───────┬───────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │   Contract Owner  │
                    │   (Fee Receiver)  │
                    └───────────────────┘
```

## State Management

### Clicker State
```
Data Variables:
- total-clicks: uint
- total-fees-collected: uint
- last-clicker: (optional principal)
- last-activity-block: uint
- unique-users: uint

Data Maps:
- user-clicks: principal → uint
- user-streaks: principal → uint
- user-first-click: principal → uint
```

### TipJar State
```
Data Variables:
- total-tips: uint
- tip-count: uint
- total-fees-collected: uint
- unique-tippers: uint
- largest-tip: uint
- last-activity-block: uint

Data Maps:
- user-tips-sent: principal → uint
- user-tips-received: principal → uint
- user-tip-count: principal → uint
- user-first-tip: principal → uint
```

### QuickPoll State
```
Data Variables:
- poll-counter: uint
- total-votes: uint
- total-fees-collected: uint
- unique-voters: uint
- unique-creators: uint
- last-activity-block: uint

Data Maps:
- polls: uint → { question, yes-votes, no-votes, created-at, creator, active }
- user-votes: { poll-id, voter } → bool
- user-vote-count: principal → uint
- user-polls-created: principal → uint
- user-first-vote: principal → uint
```

## Security Model

### Authorization
- **Owner Functions**: None (no admin functions)
- **Creator Functions**: Poll closing (QuickPoll only)
- **User Functions**: All public functions

### Fee Model
- Fixed fee: 0.001 STX per action
- Collected BEFORE state changes
- Sent to contract deployer

### Invariants
1. Fees always collected before state changes
2. Vote counts match individual votes
3. Unique counters only increase
4. Poll creator stored immutably

## Scalability Considerations

### Current Limits
- Poll questions: 100 ASCII characters max
- Multi-click: 100 clicks per call max
- Maps: Unlimited entries (blockchain storage)

### Gas Optimization
- Single map lookups where possible
- Minimal computation in read-only functions
- Batch operations (multi-click)

## Future Architecture Considerations

### Potential Enhancements
1. **Leaderboards**: Top 10 clickers/tippers stored on-chain
2. **Achievements**: NFT badges for milestones
3. **Cross-contract**: Contracts calling each other
4. **Governance**: Token-based voting weights

### Migration Strategy
When upgrading contracts:
1. Deploy new version (v2k)
2. Update frontend configuration
3. Keep old contracts active (immutable)
4. No data migration needed (fresh state)
