/**
 * Stacks native wallet integration.
 *
 * Uses @stacks/connect v8 JSON-RPC APIs for Leather, Xverse, Asigna,
 * and other Stacks-compatible wallets.
 *
 * @module utils/stacksWallet
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
const connectNetwork = STACKS_NETWORK === 'testnet' ? 'testnet' : 'mainnet';

export function getStacksChainId() {
  return STACKS_NETWORK === 'testnet' ? 'stacks:2147483648' : 'stacks:1';
}

function getStxAddressFromEntries(entries) {
  if (!Array.isArray(entries)) return null;
  const stxEntry =
    entries.find((entry) => entry?.address?.startsWith('SP') || entry?.address?.startsWith('ST')) ??
    entries.find((entry) => entry?.symbol?.toLowerCase?.() === 'stx');

  return stxEntry?.address ?? null;
}

function getStoredStxAddress() {
  const data = getLocalStorage();
  return getStxAddressFromEntries(data?.addresses?.stx);
}

/**
 * Connect using the v8 JSON-RPC API. This opens the user's installed
 * Stacks wallet authorization prompt without adding a third-party relay provider.
 */
export async function connectStacksWallet() {
  log('Initiating Stacks native connection');
  const response = await stacksConnect({ network: connectNetwork });
  const address = getStxAddressFromEntries(response?.addresses) ?? getStoredStxAddress();

  if (!address) throw new Error('No Stacks address returned by wallet');

  log('Got address:', address);
  return { address, publicKey: null };
}

export async function getAddresses() {
  const address = getStoredStxAddress();
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
      functionArgs: functionArgs ?? [],
      postConditions: postConditions ?? [],
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
      memo: memo ?? '',
      onFinish: (data) => {
        log('Transfer result:', data);
        resolve({ txId: data.txId });
      },
      onCancel: () => reject(new Error('User cancelled transfer')),
    });
  });
}

export function disconnectStacksWallet() {
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
