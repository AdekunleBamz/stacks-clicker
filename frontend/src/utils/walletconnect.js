/**
 * Stacks Native Wallet Integration
 *
 * Uses @stacks/connect v8 JSON-RPC API for modern wallet compatibility.
 * Supports Leather, Xverse, Asigna and other Stacks-compatible wallets.
 *
 * @module utils/walletconnect
 */

import {
  connect as stacksConnect,
  disconnect as stacksDisconnect,
  isConnected as stacksIsConnected,
  getLocalStorage,
  openContractCall,
  openSTXTransfer,
} from '@stacks/connect';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { STACKS_NETWORK } from './constants';

const DEBUG = import.meta.env.VITE_DEBUG === 'true';

function log(...args) {
  if (DEBUG) console.log('[StacksConnect]', ...args);
}

const network = STACKS_NETWORK === 'testnet' ? new StacksTestnet() : new StacksMainnet();

export function isValidProjectId() {
  return true;
}

export function getStacksChainId() {
  return STACKS_NETWORK === 'testnet' ? 'stacks:2147483648' : 'stacks:1';
}

export async function initProvider() {
  log('initProvider called');
  return true;
}

/**
 * Connect using the v8 JSON-RPC API — opens the wallet's connect-modal.
 * The onDisplayUri callback is kept for API compatibility but is not used.
 */
export async function wcConnect(_onDisplayUri) {
  log('Initiating Stacks native connection');
  await stacksConnect();
  return getAddresses();
}

export async function getAddresses() {
  const data = getLocalStorage();
  const address = data?.addresses?.stx?.[0]?.address;
  if (!address) throw new Error('Not connected');
  log('Got address:', address);
  return { address, publicKey: null };
}

export async function callContract({
  contractAddress,
  contractName,
  functionName,
  functionArgs,
  postConditions,
}) {
  if (!stacksIsConnected()) {
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
      postConditionMode: 1,
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
  if (!stacksIsConnected()) {
    throw new Error('Not connected');
  }

  log('Requesting STX transfer:', recipient, amount);

  return new Promise((resolve, reject) => {
    openSTXTransfer({
      network,
      recipient,
      amount: amount.toString(),
      memo: memo || '',
      onFinish: (data) => {
        log('Transfer result:', data);
        resolve({ txId: data.txId });
      },
      onCancel: () => reject(new Error('User cancelled transfer')),
    });
  });
}

export async function wcDisconnect() {
  if (stacksIsConnected()) {
    log('Disconnecting session');
    stacksDisconnect();
  }
}

export function isConnected() {
  return stacksIsConnected();
}

export function getSession() {
  return stacksIsConnected() ? getLocalStorage() : null;
}

export function getWalletConnectLink(_wcUri) {
  return '';
}
