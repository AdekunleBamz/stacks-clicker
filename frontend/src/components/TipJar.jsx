import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/walletconnect';

const DEPLOYER = 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N';

/**
 * TipJar Component
 * Send tips to support creators
 */
export default function TipJar({ onTxSubmit }) {
  const { address, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [tipAmount, setTipAmount] = useState(1000); // 1000 uSTX = 0.001 STX
  const [recipientAddress, setRecipientAddress] = useState('');
  const [totalTipped, setTotalTipped] = useState(0);

  const handleQuickTip = async () => {
    if (!isConnected) return;
    
    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'tipjar',
        functionName: 'quick-tip',
        functionArgs: []
      });
      
      setTotalTipped(prev => prev + 1000);
      onTxSubmit?.('quick-tip', result.txId);
    } catch (err) {
      console.error('Quick tip failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelfPing = async () => {
    if (!isConnected) return;
    
    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'tipjar',
        functionName: 'self-ping',
        functionArgs: []
      });
      
      onTxSubmit?.('self-ping', result.txId);
    } catch (err) {
      console.error('Self-ping failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTipUser = async () => {
    if (!isConnected || !recipientAddress) return;
    
    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'tipjar',
        functionName: 'tip-user',
        functionArgs: [
          { type: 'principal', value: recipientAddress },
          { type: 'uint128', value: tipAmount.toString() }
        ]
      });
      
      setTotalTipped(prev => prev + tipAmount);
      onTxSubmit?.('tip-user', result.txId);
    } catch (err) {
      console.error('Tip user failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async () => {
    if (!isConnected) return;
    
    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'tipjar',
        functionName: 'donate',
        functionArgs: [{ type: 'uint128', value: tipAmount.toString() }]
      });
      
      setTotalTipped(prev => prev + tipAmount);
      onTxSubmit?.('donate', result.txId);
    } catch (err) {
      console.error('Donate failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-card tipjar">
      <div className="game-header">
        <h2>💰 TipJar</h2>
        <span className="game-badge">Support Creators</span>
      </div>
      
      <div className="game-stats">
        <div className="stat">
          <span className="stat-value">{(totalTipped / 1000000).toFixed(4)}</span>
          <span className="stat-label">STX Tipped</span>
        </div>
      </div>

      <div className="game-actions">
        <button 
          className="action-btn primary"
          onClick={handleQuickTip}
          disabled={!isConnected || loading}
        >
          {loading ? '⏳' : '⚡'} Quick Tip (0.001 STX)
        </button>

        <button 
          className="action-btn secondary"
          onClick={handleSelfPing}
          disabled={!isConnected || loading}
        >
          📡 Self Ping
        </button>

        <div className="tip-custom">
          <input
            type="text"
            placeholder="Recipient SP address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="address-input"
          />
          <div className="tip-amount-group">
            <input
              type="number"
              min="1000"
              step="1000"
              value={tipAmount}
              onChange={(e) => setTipAmount(parseInt(e.target.value) || 1000)}
              className="amount-input"
            />
            <span className="amount-label">uSTX</span>
          </div>
          <button 
            className="action-btn outline"
            onClick={handleTipUser}
            disabled={!isConnected || loading || !recipientAddress}
          >
            Send Tip
          </button>
        </div>

        <button 
          className="action-btn outline"
          onClick={handleDonate}
          disabled={!isConnected || loading}
        >
          🎁 Donate {tipAmount} uSTX
        </button>
      </div>

      <p className="game-fee">Fee: 0.001 STX per action</p>
    </div>
  );
}
