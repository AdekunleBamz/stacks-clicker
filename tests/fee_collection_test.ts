// @ts-nocheck
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

// Fee Collection Tests - Verify fees are properly collected

Clarinet.test({
  name: "fees: clicker collects correct fee per action",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    const actions = [
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2j', 'multi-click', [types.uint(50)], wallet1.address),
      Tx.contractCall('clicker-v2j', 'ping', [], wallet1.address),
      Tx.contractCall('clicker-v2j', 'reset-streak', [], wallet1.address),
    ];
    
    chain.mineBlock(actions);
    
    // 4 actions × 1000 microSTX = 4000
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-total-fees-collected', [], deployer.address);
    result.result.expectUint(4000);
  },
});

Clarinet.test({
  name: "fees: tipjar collects fee plus tip amount",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'quick-tip', [], wallet1.address), // 1000 fee + 1000 tip
      Tx.contractCall('tipjar-v2j', 'tip-jar', [types.uint(5000)], wallet1.address), // 1000 fee + 5000 tip
      Tx.contractCall('tipjar-v2j', 'self-ping', [], wallet1.address), // 1000 fee only
    ]);
    
    // 3 actions × 1000 microSTX fee = 3000
    let result = chain.callReadOnlyFn('tipjar-v2j', 'get-total-fees-collected', [], deployer.address);
    result.result.expectUint(3000);
    
    // Total tips: 1000 + 5000 = 6000
    result = chain.callReadOnlyFn('tipjar-v2j', 'get-total-tips', [], deployer.address);
    result.result.expectUint(6000);
  },
});

Clarinet.test({
  name: "fees: quickpoll collects fee for all operations",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;
    
    // Create poll and vote
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Test")], wallet1.address),
    ]);
    
    chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'vote-yes', [types.uint(0)], wallet2.address),
      Tx.contractCall('quickpoll-v2j', 'poll-ping', [], wallet1.address),
      Tx.contractCall('quickpoll-v2j', 'close-poll', [types.uint(0)], wallet1.address),
    ]);
    
    // 4 actions × 1000 = 4000
    let result = chain.callReadOnlyFn('quickpoll-v2j', 'get-total-fees-collected', [], deployer.address);
    result.result.expectUint(4000);
  },
});

Clarinet.test({
  name: "fees: fee is consistent across all contracts",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    let clickerFee = chain.callReadOnlyFn('clicker-v2j', 'get-interaction-fee', [], deployer.address);
    let tipjarFee = chain.callReadOnlyFn('tipjar-v2j', 'get-interaction-fee', [], deployer.address);
    let pollFee = chain.callReadOnlyFn('quickpoll-v2j', 'get-interaction-fee', [], deployer.address);
    
    assertEquals(clickerFee.result.expectUint(1000), 1000n);
    assertEquals(tipjarFee.result.expectUint(1000), 1000n);
    assertEquals(pollFee.result.expectUint(1000), 1000n);
  },
});

Clarinet.test({
  name: "fees: accumulated fees increase with each action",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    // First action
    chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
    ]);
    let fees = chain.callReadOnlyFn('clicker-v2j', 'get-total-fees-collected', [], deployer.address);
    assertEquals(fees.result.expectUint(1000), 1000n);
    
    // Second action
    chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
    ]);
    fees = chain.callReadOnlyFn('clicker-v2j', 'get-total-fees-collected', [], deployer.address);
    assertEquals(fees.result.expectUint(2000), 2000n);
    
    // Third action
    chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
    ]);
    fees = chain.callReadOnlyFn('clicker-v2j', 'get-total-fees-collected', [], deployer.address);
    assertEquals(fees.result.expectUint(3000), 3000n);
  },
});
