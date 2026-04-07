// @ts-nocheck
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
  name: "clicker: can click and increment counter",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;

    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2p', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2p', 'click', [], wallet1.address),
      Tx.contractCall('clicker-v2p', 'click', [], wallet1.address),
    ]);

    assertEquals(block.receipts.length, 3);
    block.receipts.forEach((receipt: any) => {
      receipt.result.expectOk();
    });

    // Check user clicks
    let result = chain.callReadOnlyFn('clicker-v2p', 'get-user-clicks', [types.principal(wallet1.address)], deployer.address);
    result.result.expectUint(3);
  },
});

Clarinet.test({
  name: "clicker: multi-click works correctly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;

    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2p', 'multi-click', [types.uint(10)], wallet1.address),
    ]);

    block.receipts[0].result.expectOk().expectUint(10);
  },
});

Clarinet.test({
  name: "clicker: ping returns block height",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;

    let block = chain.mineBlock([
      Tx.contractCall('clicker-v2p', 'ping', [], wallet1.address),
    ]);

    block.receipts[0].result.expectOk();
  },
});

Clarinet.test({
  name: "tipjar: self-ping works",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;

    let block = chain.mineBlock([
      Tx.contractCall('tipjar-v2p', 'self-ping', [], wallet1.address),
    ]);

    block.receipts[0].result.expectOk().expectPrincipal(wallet1.address);
  },
});

Clarinet.test({
  name: "tipjar: quick-tip sends 1000 microSTX",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;

    let block = chain.mineBlock([
      Tx.contractCall('tipjar-v2p', 'quick-tip', [], wallet1.address),
    ]);

    block.receipts[0].result.expectOk().expectUint(1000);
  },
});

Clarinet.test({
  name: "quickpoll: can create and vote on poll",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;

    // Create poll
    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2p', 'create-poll', [types.ascii("Is Stacks awesome?")], wallet1.address),
    ]);

    block.receipts[0].result.expectOk().expectUint(0);

    // Vote yes
    block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2p', 'vote-yes', [types.uint(0)], wallet1.address),
      Tx.contractCall('quickpoll-v2p', 'vote-no', [types.uint(0)], wallet2.address),
    ]);

    block.receipts[0].result.expectOk();
    block.receipts[1].result.expectOk();
  },
});

Clarinet.test({
  name: "quickpoll: poll-ping works",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;

    let block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2p', 'poll-ping', [], wallet1.address),
    ]);

    block.receipts[0].result.expectOk();
  },
});

Clarinet.test({
  name: "clicker: get-version returns correct value",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;

    let result = chain.callReadOnlyFn('clicker-v2p', 'get-version', [], deployer.address);
    result.result.expectUint(5);
  },
});

Clarinet.test({
  name: "clicker: get-contract-name returns correct value",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;

    let result = chain.callReadOnlyFn('clicker-v2p', 'get-contract-name', [], deployer.address);
    result.result.expectAscii("clicker");
  },
});

Clarinet.test({
  name: "tipjar: get-version returns correct value",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;

    let result = chain.callReadOnlyFn('tipjar-v2p', 'get-version', [], deployer.address);
    result.result.expectUint(5);
  },
});

Clarinet.test({
  name: "quickpoll: get-version returns correct value",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;

    let result = chain.callReadOnlyFn('quickpoll-v2p', 'get-version', [], deployer.address);
    result.result.expectUint(5);
  },
});
