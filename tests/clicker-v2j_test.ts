// @ts-nocheck
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.0/index.ts';
import { assertEquals, assertNotEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

// Clicker v2j Tests - Enhanced with event testing and analytics

Clarinet.test({
  name: "clicker-v2j: click increments counter and tracks user",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
    ]);
    
    assertEquals(block.receipts.length, 3);
    block.receipts.forEach((receipt: any) => {
      receipt.result.expectOk();
    });
    
    // Verify events were emitted
    block.receipts.forEach((receipt: any) => {
      assertEquals(receipt.events.length > 0, true);
    });
  },
});

Clarinet.test({
  name: "clicker-v2j: tracks unique users correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;
    const wallet3 = accounts.get('wallet_3')!;
    
    // Three different users click
    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2j', 'click', [], wallet2.address),
      Tx.contractCall('clicker-v2j', 'click', [], wallet3.address),
    ]);
    
    // Check unique users count
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-unique-users', [], deployer.address);
    result.result.expectUint(3);
    
    // Same user clicking again shouldn't increase count
    block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
    ]);
    
    result = chain.callReadOnlyFn('clicker-v2j', 'get-unique-users', [], deployer.address);
    result.result.expectUint(3);
  },
});

Clarinet.test({
  name: "clicker-v2j: multi-click caps at 100",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    // Try to multi-click 500 (should cap at 100)
    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'multi-click', [types.uint(500)], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk().expectUint(100);
  },
});

Clarinet.test({
  name: "clicker-v2j: get-version returns correct version",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-version', [], deployer.address);
    result.result.expectUint(2);
  },
});

Clarinet.test({
  name: "clicker-v2j: get-contract-info returns complete info",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    // Do some clicks first
    chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
    ]);
    
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-contract-info', [], deployer.address);
    const info = result.result.expectTuple();
    
    assertEquals(info['version'].expectUint(2), 2n);
    assertEquals(info['total-clicks'].expectUint(1), 1n);
    assertEquals(info['unique-users'].expectUint(1), 1n);
    assertEquals(info['fee'].expectUint(1000), 1000n);
  },
});

Clarinet.test({
  name: "clicker-v2j: ping updates last activity block",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'ping', [], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk();
    
    // Check last activity was updated
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-last-activity-block', [], deployer.address);
    assertNotEquals(result.result.expectUint(0), 0n);
  },
});

Clarinet.test({
  name: "clicker-v2j: tracks first click block height",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
    ]);
    
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-user-first-click', [types.principal(wallet1.address)], deployer.address);
    // Should have a value (not none)
    assertNotEquals(result.result, 'none');
  },
});

Clarinet.test({
  name: "clicker-v2j: reset-streak works correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    // Build up streak
    chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
    ]);
    
    // Check streak exists
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-user-streak', [types.principal(wallet1.address)], deployer.address);
    result.result.expectUint(3);
    
    // Reset streak
    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'reset-streak', [], wallet1.address),
    ]);
    block.receipts[0].result.expectOk();
    
    // Verify streak is 0
    result = chain.callReadOnlyFn('clicker-v2j', 'get-user-streak', [types.principal(wallet1.address)], deployer.address);
    result.result.expectUint(0);
  },
});

Clarinet.test({
  name: "clicker-v2j: get-stats returns accurate statistics",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2j', 'multi-click', [types.uint(5)], wallet1.address),
    ]);
    
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-stats', [types.principal(wallet1.address)], deployer.address);
    const stats = result.result.expectTuple();
    
    assertEquals(stats['total'].expectUint(6), 6n);
    assertEquals(stats['user-clicks'].expectUint(6), 6n);
  },
});
