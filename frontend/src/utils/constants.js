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
export const CONTRACTS = Object.freeze({
  CLICKER: CLICKER_CONTRACT,
  TIPJAR: TIPJAR_CONTRACT,
  QUICKPOLL: QUICKPOLL_CONTRACT,
});

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

/** @type {number} Maximum number of transactions to keep in the log */
export const MAX_TX_LOG_SIZE = 50;

/** @type {number} Minimum tip amount in micro-STX */
export const MIN_TIP_MICRO_STX = 100;

/** @type {number} Milliseconds before a combo resets after the last interaction */
export const COMBO_TIMEOUT_MS = 2500;

/** @type {number} Interval in ms between STX price refreshes */
export const PRICE_REFRESH_INTERVAL_MS = 45_000;

/** @type {number} Maximum number of options allowed in a quick poll */
export const MAX_POLL_OPTIONS = 4;

/** @type {Object} Interaction count thresholds for badge milestones */
export const STREAK_THRESHOLDS = Object.freeze({
  BRONZE: 10,
  SILVER: 50,
  GOLD: 100,
  VETERAN: 200,
  PLATINUM: 500,
});

/** @type {number} Maximum combo multiplier applied to score calculations */
export const MAX_COMBO_MULTIPLIER = 10;

/** @type {number} Number of transactions to display per page in the history view */
export const TX_HISTORY_PAGE_SIZE = 10;

/** @type {Object} Poll lifecycle status codes */
export const POLL_STATUS = Object.freeze({
  OPEN: 'open',
  CLOSED: 'closed',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
});

export default {
  DEPLOYER,
  CLICKER_CONTRACT,
  TIPJAR_CONTRACT,
  QUICKPOLL_CONTRACT,
  CONTRACTS,
  STACKS_NETWORK,
  CONFIG,
  HIRO_EXPLORER_TX_BASE,
};

export const CLICK_REWARD_AMOUNT = 10

export const MAX_CLICKS_PER_SESSION = 1000

export const CLICK_COOLDOWN_MS = 100

export const UPGRADE_BASE_COST = 100

export const UPGRADE_COST_MULTIPLIER = 1.5

export const MAX_UPGRADE_LEVEL = 50

export const PRESTIGE_THRESHOLD = 1000000

export const PRESTIGE_MULTIPLIER = 2

export const LEADERBOARD_PAGE_SIZE = 20

export const SCORE_PRECISION = 2

export const SESSION_EXPIRY_MS = 3600000

export const AUTO_SAVE_INTERVAL_MS = 30000

export const COMBO_WINDOW_MS = 500
