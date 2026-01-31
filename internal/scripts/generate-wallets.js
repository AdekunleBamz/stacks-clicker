const { generateWallet, getStxAddress } = require('@stacks/wallet-sdk');
const bip39 = require('bip39');
const fs = require('fs');

const WALLET_COUNT = 25;
const TransactionVersion = { Mainnet: 22 }; // Mainnet = 0x16 = 22

async function generateWallets() {
  const wallets = [];
  
  console.log('🔐 Generating 25 wallets for mainnet...\n');
  
  for (let i = 0; i < WALLET_COUNT; i++) {
    // Generate mnemonic
    const mnemonic = bip39.generateMnemonic(128); // 12 words
    
    // Create wallet from mnemonic
    const wallet = await generateWallet({
      secretKey: mnemonic,
      password: '',
    });
    
    // Get mainnet address (SP...)
    const address = getStxAddress({
      account: wallet.accounts[0],
      transactionVersion: TransactionVersion.Mainnet,
    });
    
    wallets.push({
      id: i + 1,
      name: `W${i + 1}`,
      mnemonic: mnemonic,
      address: address,
      privateKey: wallet.accounts[0].stxPrivateKey,
    });
    
    console.log(`W${i + 1}: ${address}`);
  }
  
  // Save to file (KEEP THIS SECURE!)
  fs.writeFileSync(
    'wallets.json', 
    JSON.stringify(wallets, null, 2)
  );
  
  console.log('\n✅ Wallets saved to wallets.json');
  console.log('\n' + '='.repeat(60));
  console.log('⚠️  IMPORTANT: Keep wallets.json SECURE! Contains private keys!');
  console.log('='.repeat(60));
  
  console.log('\n📋 NEXT STEPS:');
  console.log(`\n1. Send 2.5 STX to W1 (main wallet):`);
  console.log(`   ${wallets[0].address}`);
  console.log('\n2. After funding, run: node distribute.js');
  console.log('3. Then run: node interact.js');
  
  return wallets;
}

generateWallets().catch(console.error);
