const {
  makeContractCall,
  AnchorMode,
  PostConditionMode,
  uintCV,
} = require('@stacks/transactions');
const fs = require('fs');

const MAINNET_URL = 'https://api.mainnet.hiro.so';
const CONTRACT_ADDRESS = 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N';
const DELAY_BETWEEN_TX = 4000; // 4 seconds between transactions
const TX_FEE = 2000; // 0.002 STX
const INTERACTION_COST = 4000; // 0.004 STX total (fee + contract fee)

// Contract functions to call (varied interactions)
const INTERACTIONS = [
  { contract: 'clicker-v2j', function: 'click', args: [], name: '🎯 Click' },
  { contract: 'clicker-v2j', function: 'ping', args: [], name: '📡 Ping' },
  { contract: 'clicker-v2j', function: 'multi-click', args: [uintCV(3)], name: '🔥 Multi-Click(3)' },
  { contract: 'tipjar-v2j', function: 'self-ping', args: [], name: '🏓 Self-Ping' },
  { contract: 'quickpoll-v2j', function: 'poll-ping', args: [], name: '🗳️ Poll-Ping' },
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getBalance(address) {
  try {
    const response = await fetch(
      `${MAINNET_URL}/extended/v1/address/${address}/balances`
    );
    if (!response.ok) {
      await sleep(2000);
      return 0;
    }
    const data = await response.json();
    return parseInt(data.stx.balance);
  } catch (e) {
    return 0;
  }
}

async function getCurrentNonce(address) {
  try {
    const response = await fetch(
      `${MAINNET_URL}/extended/v1/address/${address}/nonces`
    );
    if (!response.ok) {
      await sleep(2000);
      const retryResponse = await fetch(
        `${MAINNET_URL}/extended/v1/address/${address}/nonces`
      );
      const data = await retryResponse.json();
      return data.possible_next_nonce;
    }
    const data = await response.json();
    return data.possible_next_nonce;
  } catch (e) {
    return 0;
  }
}

async function broadcastTx(txHex) {
  const response = await fetch(`${MAINNET_URL}/v2/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: Buffer.from(txHex, 'hex'),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.reason || error.error || 'Broadcast failed');
  }
  
  const txid = await response.text();
  return txid.replace(/"/g, '');
}

async function verifyDistributions() {
  console.log('🔍 Verifying distribution transactions...\n');
  
  const wallets = JSON.parse(fs.readFileSync('wallets.json', 'utf8'));
  let allConfirmed = true;
  let totalBalance = 0;
  
  for (let i = 0; i < wallets.length; i++) {
    const wallet = wallets[i];
    const balance = await getBalance(wallet.address);
    totalBalance += balance;
    
    if (i === 0) {
      console.log(`W1 (Main): ${(balance / 1000000).toFixed(4)} STX`);
    } else if (balance < 25000) { // Less than 0.025 STX means not enough to interact
      console.log(`W${i + 1}: ❌ ${(balance / 1000000).toFixed(4)} STX (insufficient)`);
      allConfirmed = false;
    } else {
      console.log(`W${i + 1}: ✅ ${(balance / 1000000).toFixed(4)} STX`);
    }
    
    await sleep(100); // Rate limiting
  }
  
  console.log(`\nTotal balance across all wallets: ${(totalBalance / 1000000).toFixed(4)} STX`);
  
  return allConfirmed;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomInteraction() {
  return INTERACTIONS[Math.floor(Math.random() * INTERACTIONS.length)];
}

function getRandomDelay() {
  // Random delay between 5-8 seconds for organic feel and rate limit safety
  return 5000 + Math.floor(Math.random() * 3000);
}

async function runInteractions() {
  console.log('🎮 Contract Interaction Script (Phase-based)');
  console.log('='.repeat(60));
  console.log(`Contracts: clicker-v2j, tipjar-v2j, quickpoll-v2j`);
  console.log('='.repeat(60) + '\n');
  
  // First verify distributions
  const confirmed = await verifyDistributions();
  
  if (!confirmed) {
    console.log('\n⚠️  Some wallets not yet funded. Wait a few more minutes.');
    console.log('Run this script again after confirmations.\n');
    return;
  }
  
  console.log('\n✅ All wallets funded! Starting phased interactions...\n');
  
  const wallets = JSON.parse(fs.readFileSync('wallets.json', 'utf8'));
  const walletNonces = {}; // Track nonces per wallet
  
  // Initialize nonces
  for (const wallet of wallets) {
    walletNonces[wallet.address] = await getCurrentNonce(wallet.address);
    await sleep(100);
  }
  
  let totalTx = 0;
  let successTx = 0;
  let failedTx = 0;
  const maxPhases = 13; // ~13 interactions per wallet = ~325 txs (targeting 321)
  
  console.log(`📋 Plan: ${maxPhases} phases, 25 wallets = ~${maxPhases * 25} transactions\n`);
  
  for (let phase = 1; phase <= maxPhases; phase++) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📍 PHASE ${phase}/${maxPhases}`);
    console.log('='.repeat(60));
    
    // Shuffle wallet order for this phase (organic randomness)
    const shuffledIndices = shuffleArray([...Array(wallets.length).keys()]);
    
    for (const walletIndex of shuffledIndices) {
      const wallet = wallets[walletIndex];
      
      // Check if wallet has enough balance
      const balance = await getBalance(wallet.address);
      if (balance < INTERACTION_COST) {
        console.log(`   W${walletIndex + 1}: ⏭️ Skipping (low balance: ${(balance/1000000).toFixed(4)} STX)`);
        continue;
      }
      
      // Pick random interaction
      const interaction = getRandomInteraction();
      
      console.log(`   W${walletIndex + 1}: ${interaction.name} on ${interaction.contract}...`);
      
      try {
        const transaction = await makeContractCall({
          contractAddress: CONTRACT_ADDRESS,
          contractName: interaction.contract,
          functionName: interaction.function,
          functionArgs: interaction.args,
          senderKey: wallet.privateKey,
          anchorMode: AnchorMode.Any,
          postConditionMode: PostConditionMode.Allow,
          fee: TX_FEE,
          nonce: walletNonces[wallet.address],
        });
        
        const txHex = transaction.serialize().toString('hex');
        const txid = await broadcastTx(txHex);
        
        console.log(`         ✅ TX: ${txid.slice(0, 16)}...`);
        walletNonces[wallet.address]++; // Increment nonce on success
        successTx++;
        totalTx++;
        
      } catch (error) {
        console.log(`         ❌ Error: ${error.message.slice(0, 40)}`);
        failedTx++;
        totalTx++;
      }
      
      // Random delay for organic feel
      const delay = getRandomDelay();
      await sleep(delay);
    }
    
    console.log(`\n   Phase ${phase} complete. Success: ${successTx}/${totalTx}`);
    
    // Longer pause between phases
    if (phase < maxPhases) {
      const phasePause = 10000 + Math.floor(Math.random() * 5000);
      console.log(`   ⏳ Pausing ${(phasePause/1000).toFixed(1)}s before next phase...`);
      await sleep(phasePause);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Transactions: ${totalTx}`);
  console.log(`✅ Successful: ${successTx}`);
  console.log(`❌ Failed: ${failedTx}`);
  console.log(`Success Rate: ${((successTx/totalTx)*100).toFixed(1)}%`);
  
  // Check final balances
  console.log('\n💰 Final Wallet Balances:');
  let finalTotal = 0;
  for (let i = 0; i < wallets.length; i++) {
    const balance = await getBalance(wallets[i].address);
    finalTotal += balance;
    if (i < 5 || balance > 10000) {
      console.log(`   W${i + 1}: ${(balance / 1000000).toFixed(4)} STX`);
    }
    await sleep(100);
  }
  console.log(`\n   Total remaining: ${(finalTotal / 1000000).toFixed(4)} STX`);
}

runInteractions().catch(console.error);
