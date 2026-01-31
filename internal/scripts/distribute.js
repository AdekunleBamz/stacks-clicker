const {
  makeSTXTokenTransfer,
  broadcastTransaction,
  AnchorMode,
} = require('@stacks/transactions');
const fs = require('fs');

const MAINNET_URL = 'https://api.mainnet.hiro.so';
const AMOUNT_PER_WALLET = 95000; // 0.095 STX in microSTX
const TX_FEE = 2000; // 0.002 STX fee
const DELAY_BETWEEN_TX = 4000; // 4 seconds between transactions

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getBalance(address) {
  const response = await fetch(
    `${MAINNET_URL}/extended/v1/address/${address}/balances`
  );
  const data = await response.json();
  return parseInt(data.stx.balance);
}

async function getCurrentNonce(address) {
  const response = await fetch(
    `${MAINNET_URL}/extended/v1/address/${address}/nonces`
  );
  const data = await response.json();
  return data.possible_next_nonce;
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

async function distribute() {
  // Load wallets
  const wallets = JSON.parse(fs.readFileSync('wallets.json', 'utf8'));
  const mainWallet = wallets[0];
  
  console.log('💰 Distribution Script (Safe Mode)');
  console.log('='.repeat(60));
  console.log(`Main Wallet (W1): ${mainWallet.address}`);
  console.log(`Delay between TX: ${DELAY_BETWEEN_TX/1000} seconds`);
  
  // Check balance
  const balance = await getBalance(mainWallet.address);
  console.log(`Balance: ${(balance / 1000000).toFixed(6)} STX`);
  
  // Calculate costs
  const totalWallets = 24;
  const costPerWallet = AMOUNT_PER_WALLET + TX_FEE; // 0.097 STX
  const totalCost = costPerWallet * totalWallets;
  const reserveForW1 = 100000; // 0.1 STX reserve for W1 interactions
  
  console.log(`\nCost per wallet: ${(costPerWallet / 1000000).toFixed(4)} STX`);
  console.log(`Total distribution cost: ${(totalCost / 1000000).toFixed(4)} STX`);
  console.log(`Reserve for W1: ${(reserveForW1 / 1000000).toFixed(4)} STX`);
  console.log(`Required total: ${((totalCost + reserveForW1) / 1000000).toFixed(4)} STX`);
  
  if (balance < totalCost + reserveForW1) {
    console.log('\n❌ Insufficient balance!');
    console.log(`   Have: ${(balance / 1000000).toFixed(6)} STX`);
    console.log(`   Need: ${((totalCost + reserveForW1) / 1000000).toFixed(6)} STX`);
    return;
  }
  
  console.log('\n✅ Balance sufficient! Starting distribution...\n');
  
  let nonce = await getCurrentNonce(mainWallet.address);
  console.log(`Starting nonce: ${nonce}\n`);
  
  let successful = 0;
  let failed = 0;
  const txIds = [];
  
  for (let i = 1; i < wallets.length; i++) {
    const recipient = wallets[i];
    
    console.log(`[${i}/24] W${i + 1}: ${recipient.address.slice(0, 20)}...`);
    
    try {
      const transaction = await makeSTXTokenTransfer({
        recipient: recipient.address,
        amount: AMOUNT_PER_WALLET,
        senderKey: mainWallet.privateKey,
        anchorMode: AnchorMode.Any,
        fee: TX_FEE,
        nonce: nonce,
      });
      
      const txHex = transaction.serialize().toString('hex');
      const txid = await broadcastTx(txHex);
      
      console.log(`   ✅ TX: ${txid.slice(0, 20)}...`);
      txIds.push({ wallet: i + 1, txid: txid });
      successful++;
      nonce++; // Only increment on success
      
      // Wait before next transaction
      if (i < wallets.length - 1) {
        console.log(`   ⏳ Waiting ${DELAY_BETWEEN_TX/1000}s before next TX...`);
        await sleep(DELAY_BETWEEN_TX);
      }
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message.slice(0, 60)}`);
      failed++;
      console.log(`   ⏸️  Pausing 5s...`);
      await sleep(5000);
    }
  }
  
  // Save transaction IDs
  fs.writeFileSync('distribution-txs.json', JSON.stringify(txIds, null, 2));
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 DISTRIBUTION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${successful}/24`);
  console.log(`❌ Failed: ${failed}/24`);
  console.log(`💰 STX distributed: ${((successful * AMOUNT_PER_WALLET) / 1000000).toFixed(4)} STX`);
  console.log(`💸 Fees spent: ${((successful * TX_FEE) / 1000000).toFixed(4)} STX`);
  
  const remainingBalance = await getBalance(mainWallet.address);
  console.log(`\n💳 W1 remaining balance: ${(remainingBalance / 1000000).toFixed(6)} STX`);
  
  console.log('\n⏳ Wait 10-15 minutes for transactions to confirm');
  console.log('Then run: node interact.js');
}

distribute().catch(console.error);
