// @ts-nocheck
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

// Integration tests - Testing contracts working together

Clarinet.test({
  name: "integration: user journey across all contracts",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    
    // Step 1: User1 clicks
    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], user1.address),
      Tx.contractCall('clicker-v2j', 'multi-click', [types.uint(5)], user1.address),
    ]);
    block.receipts.forEach(r => r.result.expectOk());
    
    // Step 2: User1 tips User2
    block = chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'tip-user', [types.principal(user2.address), types.uint(5000)], user1.address),
    ]);
    block.receipts[0].result.expectOk();
    
    // Step 3: User1 creates a poll
    block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Should we add leaderboards?")], user1.address),
    ]);
    block.receipts[0].result.expectOk().expectUint(0);
    
    // Step 4: User2 votes on the poll
    block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'vote-yes', [types.uint(0)], user2.address),
    ]);
    block.receipts[0].result.expectOk();
    
    // Verify final states
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-user-clicks', [types.principal(user1.address)], deployer.address);
    result.result.expectUint(6);
    
    result = chain.callReadOnlyFn('tipjar-v2j', 'get-user-tips-received', [types.principal(user2.address)], deployer.address);
    result.result.expectUint(5000);
    
    result = chain.callReadOnlyFn('quickpoll-v2j', 'get-poll', [types.uint(0)], deployer.address);
    const poll = result.result.expectSome().expectTuple();
    assertEquals(poll['yes-votes'].expectUint(1), 1n);
  },
});

Clarinet.test({
  name: "integration: multi-user concurrent activity",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const users = [
      accounts.get('wallet_1')!,
      accounts.get('wallet_2')!,
      accounts.get('wallet_3')!,
      accounts.get('wallet_4')!,
    ];
    
    // All users click simultaneously
    let block = chain.mineBlock(
      users.map(u => Tx.contractCall('clicker-v2j', 'click', [], u.address))
    );
    block.receipts.forEach(r => r.result.expectOk());
    
    // All users tip each other in a chain
    block = chain.mineBlock([
      Tx.contractCall('tipjar-v2j', 'tip-user', [types.principal(users[1].address), types.uint(1000)], users[0].address),
      Tx.contractCall('tipjar-v2j', 'tip-user', [types.principal(users[2].address), types.uint(1000)], users[1].address),
      Tx.contractCall('tipjar-v2j', 'tip-user', [types.principal(users[3].address), types.uint(1000)], users[2].address),
      Tx.contractCall('tipjar-v2j', 'tip-user', [types.principal(users[0].address), types.uint(1000)], users[3].address),
    ]);
    block.receipts.forEach(r => r.result.expectOk());
    
    // User1 creates poll, all vote
    block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'create-poll', [types.ascii("Integration test poll")], users[0].address),
    ]);
    
    block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2j', 'vote-yes', [types.uint(0)], users[0].address),
      Tx.contractCall('quickpoll-v2j', 'vote-yes', [types.uint(0)], users[1].address),
      Tx.contractCall('quickpoll-v2j', 'vote-no', [types.uint(0)], users[2].address),
      Tx.contractCall('quickpoll-v2j', 'vote-no', [types.uint(0)], users[3].address),
    ]);
    block.receipts.forEach(r => r.result.expectOk());
    
    // Verify stats
    let result = chain.callReadOnlyFn('clicker-v2j', 'get-unique-users', [], deployer.address);
    result.result.expectUint(4);
    
    result = chain.callReadOnlyFn('tipjar-v2j', 'get-unique-tippers', [], deployer.address);
    result.result.expectUint(4);
    
    result = chain.callReadOnlyFn('quickpoll-v2j', 'get-unique-voters', [], deployer.address);
    result.result.expectUint(4);
  },
});

Clarinet.test({
  name: "integration: fee collection verification",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    
    // Perform various actions
    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2j', 'click', [], user1.address),
      Tx.contractCall('clicker-v2j', 'click', [], user1.address),
      Tx.contractCall('clicker-v2j', 'ping', [], user1.address),
      Tx.contractCall('tipjar-v2j', 'quick-tip', [], user1.address),
      Tx.contractCall('tipjar-v2j', 'self-ping', [], user1.address),
      Tx.contractCall('quickpoll-v2j', 'poll-ping', [], user1.address),
    ]);
    
    // All should succeed
    block.receipts.forEach(r => r.result.expectOk());
    
    // Verify fees collected (6 actions x 1000 microSTX = 6000)
    let clickerFees = chain.callReadOnlyFn('clicker-v2j', 'get-total-fees-collected', [], deployer.address);
    clickerFees.result.expectUint(3000); // 3 clicker actions
    
    let tipjarFees = chain.callReadOnlyFn('tipjar-v2j', 'get-total-fees-collected', [], deployer.address);
    tipjarFees.result.expectUint(2000); // 2 tipjar actions
    
    let pollFees = chain.callReadOnlyFn('quickpoll-v2j', 'get-total-fees-collected', [], deployer.address);
    pollFees.result.expectUint(1000); // 1 quickpoll action
  },
});

Clarinet.test({
  name: "integration: contract-info consistency check",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    // Check all contracts return version 2
    let clickerInfo = chain.callReadOnlyFn('clicker-v2j', 'get-contract-info', [], deployer.address);
    let tipjarInfo = chain.callReadOnlyFn('tipjar-v2j', 'get-contract-info', [], deployer.address);
    let pollInfo = chain.callReadOnlyFn('quickpoll-v2j', 'get-contract-info', [], deployer.address);
    
    const clickerData = clickerInfo.result.expectTuple();
    const tipjarData = tipjarInfo.result.expectTuple();
    const pollData = pollInfo.result.expectTuple();
    
    // All should be version 2
    assertEquals(clickerData['version'].expectUint(2), 2n);
    assertEquals(tipjarData['version'].expectUint(2), 2n);
    assertEquals(pollData['version'].expectUint(2), 2n);
    
    // All should have same fee
    assertEquals(clickerData['fee'].expectUint(1000), 1000n);
    assertEquals(tipjarData['fee'].expectUint(1000), 1000n);
    assertEquals(pollData['fee'].expectUint(1000), 1000n);
  },
});
