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
  CONTRACTS,
  STACKS_NETWORK,
  CONFIG,
  HIRO_EXPLORER_TX_BASE,
};

export const CLICK_REWARD_AMOUNT = 10;

export const MAX_CLICKS_PER_SESSION = 1000;

export const CLICK_COOLDOWN_MS = 100;

export const UPGRADE_BASE_COST = 100;

export const UPGRADE_COST_MULTIPLIER = 1.5;

export const PRESTIGE_THRESHOLD = 1_000_000;

export const PRESTIGE_MULTIPLIER = 2;

export const LEADERBOARD_PAGE_SIZE = 20;

export const SCORE_PRECISION = 2;

export const DEFAULT_CLICK_MULTIPLIER = 1;

export const MIN_USERNAME_LENGTH = 3;

export const MAX_POLL_TITLE_LENGTH = 120;

export const NOTIFICATION_DISMISS_MS = 5000;

export const AUTO_CLICKER_BASE_RATE = 1;

export const BOOST_LEVEL_CAP = 5;

export const MAX_NOTIFICATION_COUNT = 10;

export const PRESTIGE_BONUS_BPS = 500;

export const SESSION_EXPIRY_MS = 3_600_000;

export const AUTO_SAVE_INTERVAL_MS = 30_000;

export const COMBO_WINDOW_MS = 500;

export const CRITICAL_CLICK_CHANCE = 0.05;

export const CRITICAL_CLICK_MULTIPLIER = 5;

export const ANIMATION_DURATION_MS = 200;

export const TOAST_DURATION_MS = 3_000;

export const MAX_ACTIVE_BOOSTS = 5;

export const BOOST_DURATION_BLOCKS = 10;
