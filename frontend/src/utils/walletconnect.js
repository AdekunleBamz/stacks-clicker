/**
 * WalletConnect / Reown AppKit Integration for Stacks
 * 
 * This module handles WalletConnect pairing and Stacks JSON-RPC methods:
 * - stx_getAddresses
 * - stx_signTransaction
 */

import UniversalProvider from '@walletconnect/universal-provider';

// WalletConnect Project ID from environment
const PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
const DEBUG = import.meta.env.VITE_DEBUG === 'true';

// Stacks chain ID for mainnet (CAIP-2 format)
const STACKS_MAINNET_CHAIN = 'stacks:1';

// App metadata - MUST have valid icons array
const metadata = {
  name: 'StacksClicker',
  description: 'Gamified Stacks dApp - Click to earn, tip creators, vote on polls',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://stacks-clicker.vercel.app',
  icons: [
    typeof window !== 'undefined' 
      ? new URL('/logo.svg', window.location.origin).toString()
      : 'https://stacks-clicker.vercel.app/logo.svg'
  ]
};

// Singleton provider instance
let provider = null;
let session = null;

/**
 * Debug logger
 */
function log(...args) {
  if (DEBUG) {
    console.log('[WalletConnect]', ...args);
  }
}

/**
 * Initialize the WalletConnect Universal Provider
 */
export async function initProvider() {
  if (provider) {
    log('Provider already initialized');
    return provider;
  }

  if (!PROJECT_ID) {
    throw new Error('VITE_WALLETCONNECT_PROJECT_ID is not set');
  }

  log('Initializing provider with project ID:', PROJECT_ID.slice(0, 8) + '...');

  provider = await UniversalProvider.init({
    projectId: PROJECT_ID,
    metadata,
    relayUrl: 'wss://relay.walletconnect.com'
  });

  // Set up event listeners
  provider.on('display_uri', (uri) => {
    log('Display URI event:', uri.slice(0, 50) + '...');
  });

  provider.on('session_ping', ({ id, topic }) => {
    log('Session ping:', id, topic);
  });

  provider.on('session_event', ({ event, chainId }) => {
    log('Session event:', event, chainId);
  });

  provider.on('session_update', ({ topic, params }) => {
    log('Session update:', topic, params);
  });

  provider.on('session_delete', ({ topic }) => {
    log('Session deleted:', topic);
    session = null;
  });

  // Check for existing session
  if (provider.session) {
    session = provider.session;
    log('Restored existing session');
  }

  return provider;
}

/**
 * Connect to a Stacks wallet via WalletConnect
 * @param {Function} onDisplayUri - Callback when pairing URI is available (for QR display)
 * @returns {Promise<Object>} Session object
 */
export async function wcConnect(onDisplayUri) {
  if (!provider) {
    await initProvider();
  }

  // Subscribe to display_uri before connecting
  const uriPromise = new Promise((resolve) => {
    const handler = (uri) => {
      log('Got pairing URI');
      if (onDisplayUri) {
        onDisplayUri(uri);
      }
      resolve(uri);
      provider.off('display_uri', handler);
    };
    provider.on('display_uri', handler);
  });

  log('Initiating connection with required namespaces');

  // CRITICAL: Use requiredNamespaces, not just optionalNamespaces
  // This is what generates the pairing URI (fixes blank QR issue)
  const connectPromise = provider.connect({
    requiredNamespaces: {
      stacks: {
        chains: [STACKS_MAINNET_CHAIN],
        methods: [
          'stx_getAddresses',
          'stx_signTransaction',
          'stx_callContract',
          'stx_transferStx'
        ],
        events: ['accountsChanged', 'chainChanged']
      }
    }
  });

  // Wait for both URI and session
  const [, newSession] = await Promise.all([
    uriPromise.catch(() => null), // Don't fail if URI doesn't fire
    connectPromise
  ]);

  session = newSession;
  log('Connected! Session topic:', session.topic);

  return session;
}

/**
 * Get Stacks addresses from connected wallet
 * Uses stx_getAddresses JSON-RPC method with timeout fallback
 * @returns {Promise<Object>} Address info { address, publicKey }
 */
export async function getAddresses() {
  if (!session || !provider) {
    throw new Error('Not connected');
  }

  log('Requesting stx_getAddresses');

  // Timeout wrapper (15 seconds)
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('stx_getAddresses timed out')), 15000);
  });

  try {
    const result = await Promise.race([
      provider.request({
        method: 'stx_getAddresses',
        params: {}
      }, STACKS_MAINNET_CHAIN),
      timeoutPromise
    ]);

    log('Got addresses:', result);

    // Find STX address (look for symbol === 'STX' or use first)
    const addresses = result?.addresses || result;
    if (Array.isArray(addresses) && addresses.length > 0) {
      const stxEntry = addresses.find(a => a.symbol === 'STX') || addresses[0];
      return {
        address: stxEntry.address,
        publicKey: stxEntry.publicKey || null
      };
    }

    // Fallback to parsing session accounts
    return parseSessionAddress();

  } catch (err) {
    log('stx_getAddresses failed, falling back to session parse:', err.message);
    return parseSessionAddress();
  }
}

/**
 * Parse address from session namespaces (fallback)
 */
function parseSessionAddress() {
  if (!session?.namespaces?.stacks?.accounts?.[0]) {
    throw new Error('No address in session');
  }

  // Format: stacks:1:SP123...
  const account = session.namespaces.stacks.accounts[0];
  const parts = account.split(':');
  const address = parts[parts.length - 1];

  log('Parsed address from session:', address);

  return {
    address,
    publicKey: null
  };
}

/**
 * Sign and broadcast a transaction via stx_signTransaction
 * @param {string} txHex - Serialized unsigned transaction (hex)
 * @param {boolean} broadcast - Whether wallet should broadcast
 * @returns {Promise<Object>} { txId, txRaw }
 */
export async function signTransaction(txHex, broadcast = true) {
  if (!session || !provider) {
    throw new Error('Not connected');
  }

  log('Requesting stx_signTransaction, broadcast:', broadcast);

  const result = await provider.request({
    method: 'stx_signTransaction',
    params: {
      transaction: txHex,
      broadcast
    }
  }, STACKS_MAINNET_CHAIN);

  log('Transaction result:', result);

  return result;
}

/**
 * Call a contract function via stx_callContract (wallet builds tx)
 * This is a fallback when public key isn't available
 */
export async function callContract({ contractAddress, contractName, functionName, functionArgs, postConditions }) {
  if (!session || !provider) {
    throw new Error('Not connected');
  }

  log('Requesting stx_callContract:', contractName, functionName);

  const result = await provider.request({
    method: 'stx_callContract',
    params: {
      contractAddress,
      contractName,
      functionName,
      functionArgs: functionArgs || [],
      postConditions: postConditions || [],
      network: 'mainnet'
    }
  }, STACKS_MAINNET_CHAIN);

  log('Contract call result:', result);

  return result;
}

/**
 * Transfer STX via stx_transferStx
 */
export async function transferStx(recipient, amount, memo) {
  if (!session || !provider) {
    throw new Error('Not connected');
  }

  log('Requesting stx_transferStx:', recipient, amount);

  const result = await provider.request({
    method: 'stx_transferStx',
    params: {
      recipient,
      amount: amount.toString(),
      memo: memo || ''
    }
  }, STACKS_MAINNET_CHAIN);

  return result;
}

/**
 * Disconnect the current session
 */
export async function wcDisconnect() {
  if (session && provider) {
    log('Disconnecting session:', session.topic);
    try {
      await provider.disconnect();
    } catch (err) {
      log('Disconnect error:', err);
    }
    session = null;
  }
}

/**
 * Check if currently connected
 */
export function isConnected() {
  return !!(session && provider);
}

/**
 * Get current session
 */
export function getSession() {
  return session;
}

/**
 * Generate a camera-friendly WalletConnect link
 * Phone cameras can't open wc: URIs directly
 */
export function getWalletConnectLink(wcUri) {
  return `https://walletconnect.com/wc?uri=${encodeURIComponent(wcUri)}`;
}
