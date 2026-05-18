/**
 * Centralized constants for the Stacks Clicker application.
 */

export const STACKS_NETWORK =
  String(import.meta.env.VITE_STACKS_NETWORK || 'mainnet')
    .trim()
    .toLowerCase() === 'testnet'
    ? 'testnet'
    : 'mainnet';

/** @type {string} Smart contract deployer address */
export const DEPLOYER = import.meta.env.VITE_DEPLOYER_ADDRESS || '';

/** @type {Object} Contract naming schema */
export const CONTRACTS = {
  CLICKER: 'clicker-v2p',
  TIPJAR: 'tipjar-v2p',
  QUICKPOLL: 'quickpoll-v2p',
};

/** @type {Object} External API and Explorer URLs */
export const CONFIG = {
  EXPLORER_URL:
    STACKS_NETWORK === 'mainnet'
      ? 'https://explorer.hiro.so'
      : 'https://explorer.hiro.so/?chain=testnet',
  API_URL:
    STACKS_NETWORK === 'mainnet' ? 'https://api.mainnet.hiro.so' : 'https://api.testnet.hiro.so',
  HIRO_AUTH_URL: 'https://auth.hiro.so',
};

export const HIRO_EXPLORER_TX_BASE = `${CONFIG.EXPLORER_URL}/txid/`;

export default {
  DEPLOYER,
  CONTRACTS,
  STACKS_NETWORK,
  CONFIG,
  HIRO_EXPLORER_TX_BASE,
};

/** @type {number} Reward points credited per single click action. */
export const CLICK_REWARD_AMOUNT = 10;

/** @type {number} Maximum number of clicks allowed in a single session. */
export const MAX_CLICKS_PER_SESSION = 1000;

/** @type {number} Minimum time in ms between consecutive click actions. */
export const CLICK_COOLDOWN_MS = 100;

/** @type {number} Base cost in points for the first upgrade level. */
export const UPGRADE_BASE_COST = 100;

/** @type {number} Multiplier applied to upgrade cost at each successive level. */
export const UPGRADE_COST_MULTIPLIER = 1.5;

/** @type {number} Total score required to unlock the prestige system. */
export const PRESTIGE_THRESHOLD = 1_000_000;

/** @type {number} Score multiplier applied after a successful prestige. */
export const PRESTIGE_MULTIPLIER = 2;

/** @type {number} Number of entries displayed per leaderboard page. */
export const LEADERBOARD_PAGE_SIZE = 20;

/** @type {number} Decimal places used when rendering score values. */
export const SCORE_PRECISION = 2;

/** @type {number} Default click multiplier applied before any upgrades. */
export const DEFAULT_CLICK_MULTIPLIER = 1;

export const MIN_USERNAME_LENGTH = 3;

export const MAX_POLL_TITLE_LENGTH = 100;

export const MAX_POLL_OPTION_COUNT = 10;

export const NOTIFICATION_DISMISS_MS = 5000;

/** @type {number} Auto-clicker base rate: clicks credited per interval tick. */
export const AUTO_CLICKER_BASE_RATE = 1;

/** @type {number} Maximum boost level a player can reach (caps upgrade progression). */
export const BOOST_LEVEL_CAP = 5;

/** @type {number} Maximum number of toast notifications to display concurrently. */
export const MAX_NOTIFICATION_COUNT = 10;

/** @type {number} Prestige bonus in basis points (500 bps = 5% bonus multiplier). */
export const PRESTIGE_BONUS_BPS = 500;

/** @type {number} Total session expiry duration in milliseconds (1 hour). User state resets after this period. */
export const SESSION_EXPIRY_MS = 3_600_000;

/** @type {number} Interval in milliseconds between auto-save operations. */
export const AUTO_SAVE_INTERVAL_MS = 30_000;

/** @type {number} Duration in milliseconds of a single combo window for multi-click scoring. */
export const COMBO_WINDOW_MS = 500;

export const CRITICAL_CLICK_CHANCE = 0.05;

export const CRITICAL_CLICK_MULTIPLIER = 5;

/**
 * Timeout configurations for various async operations (in milliseconds).
 */
export const TIMEOUT_CONFIG = Object.freeze({
  API_CALL: 10_000,
  WALLET_CONNECT: 30_000,
  TRANSACTION_CONFIRM: 60_000,
  NETWORK_RETRY: 3_000,
});

export const ANIMATION_DURATION_MS = 200;

export const TOAST_DURATION_MS = 3_000;

export const MAX_ACTIVE_BOOSTS = 5;

export const BOOST_DURATION_BLOCKS = 10;

/** Minimum tip in micro-STX (1000 = 0.001 STX) */
export const MIN_TIP_MICRO_STX = 1000;

/** STX price polling interval in ms (60 seconds) */
export const PRICE_REFRESH_INTERVAL_MS = 60_000;

/** Streak threshold levels for badge unlocks */
export const STREAK_THRESHOLDS = {
  BRONZE: 5,
  SILVER: 25,
  GOLD: 100,
  VETERAN: 500,
};

/** Maximum number of transactions to keep in the local tx log */
export const MAX_TX_LOG_SIZE = 100;

/** Default application language code (ISO 639-1) */
export const DEFAULT_LANG = 'en';

/** Default UI theme applied on first load */
export const DEFAULT_THEME = 'dark';

/** Upper cap for the combo multiplier applied to click rewards */
export const MAX_COMBO_MULTIPLIER = 8;

/** Leaderboard polling interval in ms (refreshes every 30 seconds) */
export const LEADERBOARD_REFRESH_MS = 30_000;

/** Poll results polling interval in ms (refreshes every 15 seconds) */
export const POLL_RESULT_REFRESH_MS = 15_000;

/** Whether audio feedback is enabled by default on first load */
export const SOUND_ENABLED_DEFAULT = true;

/** Delay in ms before an achievement unlock animation is shown */
export const ACHIEVEMENT_UNLOCK_DELAY_MS = 500;

/** Maximum number of tip transactions to retain in the tip history list */
export const TIPJAR_HISTORY_LIMIT = 50;

/** Number of transactions fetched per page in the transaction history view */
export const TRANSACTION_HISTORY_PAGE_SIZE = 25;

/** Maximum characters to show for a wallet address in display contexts */
export const MAX_USERNAME_DISPLAY_LENGTH = 12;
