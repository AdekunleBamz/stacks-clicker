import { StacksClickerSDK } from 'stacks-clicker-sdk';

import { STACKS_NETWORK } from './constants';

export const stacksClickerSdk = new StacksClickerSDK({
  network: STACKS_NETWORK,
});

/**
 * Checks if the SDK is properly configured and ready for use.
 *
 * @returns {boolean} True if SDK instance exists and network is configured
 */
export function isSdkReady() {
  return !!stacksClickerSdk && !!STACKS_NETWORK;
}

/**
 * Returns the normalized SDK network string.
 *
 * @returns {'mainnet' | 'testnet'} Active SDK network
 */
export function getSdkNetwork() {
  return STACKS_NETWORK === 'testnet' ? 'testnet' : 'mainnet';
}
