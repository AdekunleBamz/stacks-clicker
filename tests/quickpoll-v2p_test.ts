// @ts-nocheck
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
  name: 'quickpoll-v2p: records first vote and voter status',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;

    const block = chain.mineBlock([
      Tx.contractCall('quickpoll-v2p', 'vote-yes', [], wallet1.address),
    ]);

    block.receipts[0].result.expectOk();

    const results = chain.callReadOnlyFn('quickpoll-v2p', 'get-results', [], deployer.address);
    const tuple = results.result.expectTuple();
    assertEquals(tuple['yes'].expectUint(1), 1n);
    assertEquals(tuple['total'].expectUint(1), 1n);

    const hasVoted = chain.callReadOnlyFn(
      'quickpoll-v2p',
      'has-user-voted',
      [types.principal(wallet1.address)],
      deployer.address
    );
    hasVoted.result.expectBool(true);
  },
});

Clarinet.test({
  name: 'quickpoll-v2p: prevents duplicate votes from the same wallet',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;

    chain.mineBlock([
      Tx.contractCall('quickpoll-v2p', 'vote-yes', [], wallet1.address),
    ]);

    const duplicate = chain.mineBlock([
      Tx.contractCall('quickpoll-v2p', 'vote-no', [], wallet1.address),
    ]);

    duplicate.receipts[0].result.expectErr().expectUint(100);
  },
});
