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
      Tx.contractCall('clicker-v2p', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2p', 'multi-click', [types.uint(50)], wallet1.address),
      Tx.contractCall('clicker-v2p', 'ping', [], wallet1.address),
      Tx.contractCall('clicker-v2p', 'reset-streak', [], wallet1.address),
    ];

    chain.mineBlock(actions);

    // 4 actions × 100 microSTX = 400
    let result = chain.callReadOnlyFn('clicker-v2p', 'get-total-fees-collected', [], deployer.address);
    result.result.expectUint(400);
  },
});

Clarinet.test({
  name: "fees: tipjar collects fee plus tip amount",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;

    chain.mineBlock([
      Tx.contractCall('tipjar-v2p', 'quick-tip', [], wallet1.address), // 100 fee + 1000 tip
      Tx.contractCall('tipjar-v2p', 'tip-jar', [types.uint(5000)], wallet1.address), // 100 fee + 5000 tip
      Tx.contractCall('tipjar-v2p', 'self-ping', [], wallet1.address), // 100 fee only
    ]);

    // 3 actions × 100 microSTX fee = 300
    let result = chain.callReadOnlyFn('tipjar-v2p', 'get-total-fees-collected', [], deployer.address);
    result.result.expectUint(300);

    // Total tips: 1000 + 5000 = 6000
    result = chain.callReadOnlyFn('tipjar-v2p', 'get-total-tips', [], deployer.address);
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
      Tx.contractCall('quickpoll-v2p', 'create-poll', [types.ascii("Test")], wallet1.address),
    ]);

    chain.mineBlock([
      Tx.contractCall('quickpoll-v2p', 'vote-yes', [types.uint(0)], wallet2.address),
      Tx.contractCall('quickpoll-v2p', 'poll-ping', [], wallet1.address),
      Tx.contractCall('quickpoll-v2p', 'close-poll', [types.uint(0)], wallet1.address),
    ]);

    // 4 actions × 100 = 400
    let result = chain.callReadOnlyFn('quickpoll-v2p', 'get-total-fees-collected', [], deployer.address);
    result.result.expectUint(400);
  },
});

Clarinet.test({
  name: "fees: fee is consistent across all contracts",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;

    let clickerFee = chain.callReadOnlyFn('clicker-v2p', 'get-interaction-fee', [], deployer.address);
    let tipjarFee = chain.callReadOnlyFn('tipjar-v2p', 'get-interaction-fee', [], deployer.address);
    let pollFee = chain.callReadOnlyFn('quickpoll-v2p', 'get-interaction-fee', [], deployer.address);

    assertEquals(clickerFee.result.expectUint(100), 100n);
    assertEquals(tipjarFee.result.expectUint(100), 100n);
    assertEquals(pollFee.result.expectUint(100), 100n);
  },
});

Clarinet.test({
  name: "fees: accumulated fees increase with each action",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;

    // First action
    chain.mineBlock([
      Tx.contractCall('clicker-v2p', 'click', [], wallet1.address),
    ]);
    let fees = chain.callReadOnlyFn('clicker-v2p', 'get-total-fees-collected', [], deployer.address);
    assertEquals(fees.result.expectUint(100), 100n);

    // Second action
    chain.mineBlock([
      Tx.contractCall('clicker-v2p', 'click', [], wallet1.address),
    ]);
    fees = chain.callReadOnlyFn('clicker-v2p', 'get-total-fees-collected', [], deployer.address);
    assertEquals(fees.result.expectUint(200), 200n);

    // Third action
    chain.mineBlock([
      Tx.contractCall('clicker-v2p', 'click', [], wallet1.address),
    ]);
    fees = chain.callReadOnlyFn('clicker-v2p', 'get-total-fees-collected', [], deployer.address);
    assertEquals(fees.result.expectUint(300), 300n);
  },
});
