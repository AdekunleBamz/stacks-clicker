import { StacksClickerSDK } from 'stacks-clicker-sdk';

import { STACKS_NETWORK } from './constants';

export const stacksClickerSdk = new StacksClickerSDK({
  network: STACKS_NETWORK === 'testnet' ? 'testnet' : 'mainnet',
});
