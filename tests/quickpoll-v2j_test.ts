// @ts-nocheck
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.0/index.ts';
import { assertEquals, assertNotEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

// QuickPoll v2j Tests - Enhanced with event testing and analytics

Clarinet.test({
  name: "quickpoll-v2j: create-poll creates poll and emits event",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Is Stacks the best?")], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk().expectUint(0);
    assertEquals(block.receipts[0].events.length > 0, true);
  },
});

Clarinet.test({
  name: "quickpoll-v2j: tracks unique voters correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;
    const wallet3 = accounts.get('wallet_3')!;
    
    // Create a poll
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Test poll")], deployer.address),
    ]);
    
    // Three different voters
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'vote-yes', [types.uint(0)], wallet1.address),
      Tx.contractCall('quickpoll-v2j', 'vote-no', [types.uint(0)], wallet2.address),
    ]);
    
    // Create another poll for wallet3 to vote on
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Test poll 2")], deployer.address),
      Tx.contractCall('quickpoll-v2j', 'vote-yes', [types.uint(1)], wallet3.address),
    ]);
    
    let result = chain.callReadOnlyFn('quickpoll-v2j', 'get-unique-voters', [], deployer.address);
    result.result.expectUint(3);
  },
});

Clarinet.test({
  name: "quickpoll-v2j: tracks unique creators correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;
    
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Poll 1")], wallet1.address),
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Poll 2")], wallet2.address),
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Poll 3")], wallet1.address),
    ]);
    
    let result = chain.callReadOnlyFn('quickpoll-v2j', 'get-unique-creators', [], deployer.address);
    result.result.expectUint(2);
  },
});

Clarinet.test({
  name: "quickpoll-v2j: prevents double voting",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    const deployer = accounts.get('deployer')!;
    
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Test poll")], deployer.address),
    ]);
    
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'vote-yes', [types.uint(0)], wallet1.address),
    ]);
    
    // Try to vote again
    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'vote-no', [types.uint(0)], wallet1.address),
    ]);
    
    block.receipts[0].result.expectErr().expectUint(100); // err-already-voted
  },
});

Clarinet.test({
  name: "quickpoll-v2j: get-version returns correct version",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    let result = chain.callReadOnlyFn('quickpoll-v2j', 'get-version', [], deployer.address);
    result.result.expectUint(2);
  },
});

Clarinet.test({
  name: "quickpoll-v2j: get-contract-info returns complete info",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Test")], wallet1.address),
      Tx.contractCall('quickpoll-v2j', 'vote-yes', [types.uint(0)], deployer.address),
    ]);
    
    let result = chain.callReadOnlyFn('quickpoll-v2j', 'get-contract-info', [], deployer.address);
    const info = result.result.expectTuple();
    
    assertEquals(info['version'].expectUint(2), 2n);
    assertEquals(info['poll-count'].expectUint(1), 1n);
    assertEquals(info['total-votes'].expectUint(1), 1n);
  },
});

Clarinet.test({
  name: "quickpoll-v2j: only creator can close poll",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;
    
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Test poll")], wallet1.address),
    ]);
    
    // Non-creator tries to close
    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'close-poll', [types.uint(0)], wallet2.address),
    ]);
    
    block.receipts[0].result.expectErr().expectUint(103); // err-not-creator
    
    // Creator can close
    block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'close-poll', [types.uint(0)], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk();
  },
});

Clarinet.test({
  name: "quickpoll-v2j: cannot vote on closed poll",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;
    
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Test poll")], wallet1.address),
      Tx.contractCall('quickpoll-v2j', 'close-poll', [types.uint(0)], wallet1.address),
    ]);
    
    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'vote-yes', [types.uint(0)], wallet2.address),
    ]);
    
    block.receipts[0].result.expectErr().expectUint(102); // err-poll-ended
  },
});

Clarinet.test({
  name: "quickpoll-v2j: quick-vote-yes votes on latest poll",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Poll 1")], deployer.address),
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Poll 2")], deployer.address),
    ]);
    
    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'quick-vote-yes', [], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk();
    
    // Check vote was on poll 1 (the latest)
    let result = chain.callReadOnlyFn('quickpoll-v2j', 'get-poll', [types.uint(1)], deployer.address);
    const poll = result.result.expectSome().expectTuple();
    assertEquals(poll['yes-votes'].expectUint(1), 1n);
  },
});

Clarinet.test({
  name: "quickpoll-v2j: poll-ping returns poll count",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    const deployer = accounts.get('deployer')!;
    
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Poll 1")], deployer.address),
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Poll 2")], deployer.address),
    ]);
    
    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'poll-ping', [], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk().expectUint(2);
  },
});

Clarinet.test({
  name: "quickpoll-v2j: has-voted returns correct status",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;
    
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Test")], deployer.address),
      Tx.contractCall('quickpoll-v2j', 'vote-yes', [types.uint(0)], wallet1.address),
    ]);
    
    let result = chain.callReadOnlyFn('quickpoll-v2j', 'has-voted', [types.uint(0), types.principal(wallet1.address)], deployer.address);
    assertEquals(result.result.expectBool(true), true);
    
    result = chain.callReadOnlyFn('quickpoll-v2j', 'has-voted', [types.uint(0), types.principal(wallet2.address)], deployer.address);
    assertEquals(result.result.expectBool(false), false);
  },
});

Clarinet.test({
  name: "quickpoll-v2j: get-latest-poll returns most recent poll",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("First poll")], deployer.address),
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Second poll")], deployer.address),
    ]);
    
    let result = chain.callReadOnlyFn('quickpoll-v2j', 'get-latest-poll', [], deployer.address);
    const poll = result.result.expectSome().expectTuple();
    assertEquals(poll['question'].expectAscii("Second poll"), "Second poll");
  },
});
