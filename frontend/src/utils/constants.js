/**
 * Centralized constants for the Stacks Clicker application.
 */

/** @type {string} Smart contract deployer address */
export const DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

/** @type {string} Clicker contract name */
export const CLICKER_CONTRACT = 'clicker-v2p';

/** @type {string} TipJar contract name */
export const TIPJAR_CONTRACT = 'tipjar-v2p';

/** @type {string} QuickPoll contract name */
export const QUICKPOLL_CONTRACT = 'quickpoll-v2p';

/** @type {string} Network environment */
export const STACKS_NETWORK = import.meta.env.VITE_STACKS_NETWORK || 'mainnet';

export default {
  DEPLOYER,
  CLICKER_CONTRACT,
  TIPJAR_CONTRACT,
  QUICKPOLL_CONTRACT,
  STACKS_NETWORK,
};
