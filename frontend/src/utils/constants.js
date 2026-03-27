/**
 * Centralized constants for the Stacks Clicker application.
 */

import { DEFAULT_CONTRACTS, DEFAULT_DEPLOYER } from 'stacks-clicker-sdk';

/** @type {'mainnet'|'testnet'} Network environment */
export const STACKS_NETWORK = import.meta.env.VITE_STACKS_NETWORK === 'testnet' ? 'testnet' : 'mainnet';

const ACTIVE_CONTRACTS = DEFAULT_CONTRACTS[STACKS_NETWORK];

/** @type {string} Smart contract deployer address */
export const DEPLOYER = DEFAULT_DEPLOYER;

/** @type {string} Clicker contract name */
export const CLICKER_CONTRACT = ACTIVE_CONTRACTS.clicker;

/** @type {string} TipJar contract name */
export const TIPJAR_CONTRACT = ACTIVE_CONTRACTS.tipJar;

/** @type {string} QuickPoll contract name */
export const QUICKPOLL_CONTRACT = import.meta.env.VITE_QUICKPOLL_CONTRACT || 'quickpoll-v2m';

export default {
  DEPLOYER,
  CLICKER_CONTRACT,
  TIPJAR_CONTRACT,
  QUICKPOLL_CONTRACT,
  STACKS_NETWORK,
};
