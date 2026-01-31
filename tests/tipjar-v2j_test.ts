// @ts-nocheck
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.0/index.ts';
import { assertEquals, assertNotEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

// TipJar v2j Tests - Enhanced with event testing and analytics

Clarinet.test({
  name: "tipjar-v2j: quick-tip sends 1000 microSTX and emits event",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'quick-tip', [], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk().expectUint(1000);
    assertEquals(block.receipts[0].events.length > 0, true);
  },
});

Clarinet.test({
  name: "tipjar-v2j: tracks unique tippers correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;
    const wallet3 = accounts.get('wallet_3')!;
    
    chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'quick-tip', [], wallet1.address),
      Tx.contractCall('tipjar-v2j', 'quick-tip', [], wallet2.address),
      Tx.contractCall('tipjar-v2j', 'quick-tip', [], wallet3.address),
    ]);
    
    let result = chain.callReadOnlyFn('tipjar-v2j', 'get-unique-tippers', [], deployer.address);
    result.result.expectUint(3);
    
    // Same tipper again shouldn't increase count
    chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'quick-tip', [], wallet1.address),
    ]);
    
    result = chain.callReadOnlyFn('tipjar-v2j', 'get-unique-tippers', [], deployer.address);
    result.result.expectUint(3);
  },
});

Clarinet.test({
  name: "tipjar-v2j: tracks largest tip correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;
    
    chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'tip-jar', [types.uint(5000)], wallet1.address),
      Tx.contractCall('tipjar-v2j', 'tip-jar', [types.uint(10000)], wallet2.address),
      Tx.contractCall('tipjar-v2j', 'tip-jar', [types.uint(3000)], wallet1.address),
    ]);
    
    let result = chain.callReadOnlyFn('tipjar-v2j', 'get-largest-tip', [], deployer.address);
    result.result.expectUint(10000);
  },
});

Clarinet.test({
  name: "tipjar-v2j: tip-user transfers to correct recipient",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'tip-user', [types.principal(wallet2.address), types.uint(5000)], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk().expectUint(5000);
    
    // Check recipient received
    let result = chain.callReadOnlyFn('tipjar-v2j', 'get-user-tips-received', [types.principal(wallet2.address)], deployer.address);
    result.result.expectUint(5000);
    
    // Check sender sent
    result = chain.callReadOnlyFn('tipjar-v2j', 'get-user-tips-sent', [types.principal(wallet1.address)], deployer.address);
    result.result.expectUint(5000);
  },
});

Clarinet.test({
  name: "tipjar-v2j: get-version returns correct version",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    let result = chain.callReadOnlyFn('tipjar-v2j', 'get-version', [], deployer.address);
    result.result.expectUint(2);
  },
});

Clarinet.test({
  name: "tipjar-v2j: get-contract-info returns complete info",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'tip-jar', [types.uint(5000)], wallet1.address),
    ]);
    
    let result = chain.callReadOnlyFn('tipjar-v2j', 'get-contract-info', [], deployer.address);
    const info = result.result.expectTuple();
    
    assertEquals(info['version'].expectUint(2), 2n);
    assertEquals(info['largest-tip'].expectUint(5000), 5000n);
    assertEquals(info['unique-tippers'].expectUint(1), 1n);
  },
});

Clarinet.test({
  name: "tipjar-v2j: self-ping works and returns principal",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'self-ping', [], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk().expectPrincipal(wallet1.address);
  },
});

Clarinet.test({
  name: "tipjar-v2j: donate sends to owner and tracks amount",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'donate', [types.uint(10000)], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk();
    
    let result = chain.callReadOnlyFn('tipjar-v2j', 'get-total-tips', [], deployer.address);
    result.result.expectUint(10000);
  },
});

Clarinet.test({
  name: "tipjar-v2j: tracks tip count correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'quick-tip', [], wallet1.address),
      Tx.contractCall('tipjar-v2j', 'quick-tip', [], wallet1.address),
      Tx.contractCall('tipjar-v2j', 'quick-tip', [], wallet1.address),
    ]);
    
    let result = chain.callReadOnlyFn('tipjar-v2j', 'get-tip-count', [], deployer.address);
    result.result.expectUint(3);
  },
});

Clarinet.test({
  name: "tipjar-v2j: get-stats returns accurate statistics",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'tip-jar', [types.uint(5000)], wallet1.address),
      Tx.contractCall('tipjar-v2j', 'quick-tip', [], wallet1.address),
    ]);
    
    let result = chain.callReadOnlyFn('tipjar-v2j', 'get-stats', [], deployer.address);
    const stats = result.result.expectTuple();
    
    assertEquals(stats['total-tips'].expectUint(6000), 6000n);
    assertEquals(stats['tip-count'].expectUint(2), 2n);
  },
});
