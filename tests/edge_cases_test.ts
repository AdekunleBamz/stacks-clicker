// @ts-nocheck
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

// Edge case tests for v2j contracts

Clarinet.test({
  name: "edge: clicker multi-click with zero returns zero",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'multi-click', [types.uint(0)], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk().expectUint(0);
  },
});

Clarinet.test({
  name: "edge: clicker handles maximum uint clicks gracefully",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    // Max is capped at 100
    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'multi-click', [types.uint(999999999)], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk().expectUint(100);
  },
});

Clarinet.test({
  name: "edge: tipjar zero amount tip",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'tip-jar', [types.uint(0)], wallet1.address),
    ]);
    
    // Should still succeed (0 STX transfer is valid)
    block.receipts[0].result.expectOk().expectUint(0);
  },
});

Clarinet.test({
  name: "edge: tipjar tip to self",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'tip-user', [types.principal(wallet1.address), types.uint(1000)], wallet1.address),
    ]);
    
    // Tipping yourself should work
    block.receipts[0].result.expectOk().expectUint(1000);
  },
});

Clarinet.test({
  name: "edge: quickpoll create poll with empty question",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("")], wallet1.address),
    ]);
    
    // Empty string is valid ASCII
    block.receipts[0].result.expectOk().expectUint(0);
  },
});

Clarinet.test({
  name: "edge: quickpoll create poll with max length question",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    const maxQuestion = "A".repeat(100);
    
    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii(maxQuestion)], wallet1.address),
    ]);
    
    block.receipts[0].result.expectOk().expectUint(0);
  },
});

Clarinet.test({
  name: "edge: quickpoll vote on non-existent poll",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'vote-yes', [types.uint(999)], wallet1.address),
    ]);
    
    block.receipts[0].result.expectErr().expectUint(101);
  },
});

Clarinet.test({
  name: "edge: quickpoll quick-vote with no polls",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'quick-vote-yes', [], wallet1.address),
    ]);
    
    block.receipts[0].result.expectErr().expectUint(104);
  },
});

Clarinet.test({
  name: "edge: multiple users clicking simultaneously",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallets = [
      accounts.get('wallet_1')!,
      accounts.get('wallet_2')!,
      accounts.get('wallet_3')!,
      accounts.get('wallet_4')!,
      accounts.get('wallet_5')!,
    ];
    
    // All 5 users click in same block
    let block = chain.mineBlock(
      wallets.map(w => Tx.contractCall('clicker-v2j', 'click', [], w.address))
    );
    
    // All should succeed
    block.receipts.forEach((receipt: any) => {
      receipt.result.expectOk();
    });
    
    // Total should be 5
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-total-clicks', [], deployer.address);
    result.result.expectUint(5);
    
    // Unique users should be 5
    result = chain.callReadOnlyFn('clicker-v2j', 'get-unique-users', [], deployer.address);
    result.result.expectUint(5);
  },
});

Clarinet.test({
  name: "edge: rapid consecutive operations from same user",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    const deployer = accounts.get('deployer')!;
    
    // Multiple operations in single block
    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2j', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2j', 'multi-click', [types.uint(10)], wallet1.address),
      Tx.contractCall('clicker-v2j', 'ping', [], wallet1.address),
    ]);
    
    // All should succeed
    block.receipts.forEach((receipt: any) => {
      receipt.result.expectOk();
    });
    
    // User should have 12 clicks (1 + 1 + 10)
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-user-clicks', [types.principal(wallet1.address)], deployer.address);
    result.result.expectUint(12);
  },
});
