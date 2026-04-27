/**
 * Centralized constants for the Stacks Clicker application.
 */

/** @type {string} Network environment */
export const STACKS_NETWORK =
  String(import.meta.env.VITE_STACKS_NETWORK || 'mainnet').trim().toLowerCase() === 'testnet'
    ? 'testnet'
    : 'mainnet';

/** @type {string} Smart contract deployer address */
export const DEPLOYER = String(
  import.meta.env.VITE_DEPLOYER_ADDRESS || 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT'
).trim();

/** @type {string} Clicker contract name */
export const CLICKER_CONTRACT = 'clicker-v2p';

/** @type {string} TipJar contract name */
export const TIPJAR_CONTRACT = 'tipjar-v2p';

/** @type {string} QuickPoll contract name */
export const QUICKPOLL_CONTRACT = 'quickpoll-v2p';

/** @type {Object} Contract naming schema */
export const CONTRACTS = {
  CLICKER: CLICKER_CONTRACT,
  TIPJAR: TIPJAR_CONTRACT,
  QUICKPOLL: QUICKPOLL_CONTRACT,
};

/** @type {Object} External API and explorer URLs */
export const CONFIG = {
  EXPLORER_URL: 'https://explorer.hiro.so',
  EXPLORER_CHAIN_QUERY: STACKS_NETWORK,
  API_URL:
    STACKS_NETWORK === 'mainnet' ? 'https://api.mainnet.hiro.so' : 'https://api.testnet.hiro.so',
  HIRO_AUTH_URL: 'https://auth.hiro.so',
};

/** @type {string} Explorer tx URL prefix */
export const HIRO_EXPLORER_TX_BASE = `${CONFIG.EXPLORER_URL}/txid/`;

/** @type {Object} UI Theme constants */
export const THEME = {
  COLORS: {
    PRIMARY: '#6366f1', // indigo-500
    SECONDARY: '#8b5cf6', // violet-500
    SUCCESS: '#10b981', // emerald-500
    DANGER: '#ef4444', // red-500
    WARNING: '#f59e0b', // amber-500
    INFO: '#3b82f6', // blue-500
    BACKGROUND: '#0f172a', // slate-900
  },
  GRADIENTS: {
    PRIMARY: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    SURFACE: 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)',
  },
};

export default {
  DEPLOYER,
  CLICKER_CONTRACT,
  TIPJAR_CONTRACT,
  QUICKPOLL_CONTRACT,
  CONTRACTS,
  STACKS_NETWORK,
  CONFIG,
  HIRO_EXPLORER_TX_BASE,
  THEME,
};
