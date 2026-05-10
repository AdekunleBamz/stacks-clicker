/**
 * Stacks Native Wallet Integration (replaces WalletConnect)
 *
 * This module uses @stacks/connect to natively interact with Stacks wallets
 * like Leather, Xverse, and Asigna. It keeps the same exported function names
 * as the old walletconnect implementation to minimize changes in other files.
 *
 * @module utils/walletconnect
 */

import { AppConfig, UserSession, showConnect, openContractCall, openSTXTransfer, openSignatureRequestPopup } from '@stacks/connect';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { STACKS_NETWORK } from './constants';

const DEBUG = import.meta.env.VITE_DEBUG === 'true';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

function log(...args) {
  if (DEBUG) console.log('[StacksConnect]', ...args);
}

export function isValidProjectId() {
  return true; // Not needed for native Stacks Connect
}

export function getStacksChainId() {
  return STACKS_NETWORK === 'testnet' ? 'stacks:2147483648' : 'stacks:1';
}

export async function initProvider() {
  log('initProvider called');
  return true;
}

const getAppDetails = () => ({
  name: 'StacksClicker',
  description: 'Gamified Stacks dApp - Click to earn, tip creators, vote on polls',
  icon: typeof window !== 'undefined' ? new URL('/favicon.svg', window.location.origin).toString() : 'https://stacks-clicker.vercel.app/favicon.svg',
});

const network = STACKS_NETWORK === 'testnet' ? new StacksTestnet() : new StacksMainnet();

export async function wcConnect(onDisplayUri) {
  log('Initiating Stacks native connection');
  return new Promise((resolve, reject) => {
    showConnect({
      appDetails: getAppDetails(),
      redirectTo: '/',
      onFinish: () => resolve(userSession.loadUserData()),
      onCancel: () => reject(new Error('User cancelled connection')),
      userSession,
    });
  });
}

export async function getAddresses() {
  if (!userSession.isUserSignedIn()) {
    throw new Error('Not connected');
  }
  const userData = userSession.loadUserData();
  const address = STACKS_NETWORK === 'testnet' ? userData.profile.stxAddress.testnet : userData.profile.stxAddress.mainnet;
  log('Got address:', address);
  return { address, publicKey: null };
}

export async function signTransaction(txHex, broadcast = true) {
  throw new Error('signTransaction not supported directly via StacksConnect helper yet');
}

export async function callContract({
  contractAddress,
  contractName,
  functionName,
  functionArgs,
  postConditions,
}) {
  if (!userSession.isUserSignedIn()) {
    throw new Error('Not connected');
  }

  log('Requesting contract call:', contractName, functionName);

  return new Promise((resolve, reject) => {
    openContractCall({
      network,
      contractAddress,
      contractName,
      functionName,
      functionArgs: functionArgs || [],
      postConditions: postConditions || [],
      postConditionMode: 1, // Allow mode if no specific conditions are set
      appDetails: getAppDetails(),
      onFinish: (data) => {
        log('Contract call result:', data);
        resolve({ txId: data.txId, txRaw: data.txRaw });
      },
      onCancel: () => {
        log('Contract call cancelled');
        reject(new Error('User cancelled transaction'));
      },
    });
  });
}

export async function transferStx(recipient, amount, memo) {
  if (!userSession.isUserSignedIn()) {
    throw new Error('Not connected');
  }

  log('Requesting STX transfer:', recipient, amount);

  return new Promise((resolve, reject) => {
    openSTXTransfer({
      network,
      recipient,
      amount: amount.toString(),
      memo: memo || '',
      appDetails: getAppDetails(),
      onFinish: (data) => {
        log('Transfer result:', data);
        resolve({ txId: data.txId });
      },
      onCancel: () => reject(new Error('User cancelled transfer')),
    });
  });
}

export async function wcDisconnect() {
  if (userSession.isUserSignedIn()) {
    log('Disconnecting session');
    userSession.signUserOut();
  }
}

export function isConnected() {
  return userSession.isUserSignedIn();
}

export function getSession() {
  return userSession.isUserSignedIn() ? userSession.loadUserData() : null;
}

export function getWalletConnectLink(wcUri) {
  return ''; // Unused in native Stacks connection
}
