/**
 * Shared constants for the Stacks Clicker application.
 */

/** @constant {string} Smart contract deployer address */
export const DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

/** @constant {string} Clicker contract name */
export const CLICKER_CONTRACT = 'clicker-v2p';

/** @constant {string} TipJar contract name */
export const TIPJAR_CONTRACT = 'tipjar-v2p';

/** @constant {string} QuickPoll contract name */
export const QUICKPOLL_CONTRACT = 'quickpoll-v2p';

/** @constant {string} Network environment */
export const STACKS_NETWORK = import.meta.env.VITE_STACKS_NETWORK || 'mainnet';
