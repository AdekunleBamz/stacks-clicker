import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/walletconnect';

const DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

/**
 * TipJar Component.
 * Facilitates sending tips to developers and other users.
 * @param {Object} props - Component props.
 * @param {Function} [props.onTxSubmit] - Optional callback triggered after a transaction is submitted.
 * @returns {JSX.Element} The rendered tip jar interaction area.
 */
export default function TipJar({ onTxSubmit }) {
  const { isConnected } = useWallet();
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
        contractName: 'tipjar-v2p',
        functionName: 'quick-tip',
        functionArgs: [],
      });

      setTotalTipped((prev) => prev + 1000);
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
        contractName: 'tipjar-v2p',
        functionName: 'self-ping',
        functionArgs: [],
      });

      onTxSubmit?.('self-ping', result.txId);
    } catch (err) {
      console.error('Self-ping failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTipUser = async () => {
    const normalizedRecipient = recipientAddress.trim();
    if (!isConnected || !normalizedRecipient) return;

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'tipjar-v2p',
        functionName: 'tip-user',
        functionArgs: [
          { type: 'principal', value: normalizedRecipient },
          { type: 'uint128', value: tipAmount.toString() },
        ],
      });

      setTotalTipped((prev) => prev + tipAmount);
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
        contractName: 'tipjar-v2p',
        functionName: 'donate',
        functionArgs: [{ type: 'uint128', value: tipAmount.toString() }],
      });

      setTotalTipped((prev) => prev + tipAmount);
      onTxSubmit?.('donate', result.txId);
    } catch (err) {
      console.error('Donate failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-card tipjar glass-card" role="region" aria-labelledby="tipjar-title">
      <div className="game-header">
        <h2 id="tipjar-title">💰 TipJar</h2>
        <span className="game-badge" title="Direct peer-to-peer creator tips interface">Support Creators</span>
      </div>

      <div className="game-stats" role="group" aria-label="Tipping statistics">
        <div className="stat">
          <span className="stat-value" aria-live="polite" aria-atomic="true">{(totalTipped / 1000000).toFixed(4)}</span>
          <span className="stat-label">STX Tipped</span>
        </div>
      </div>

      <div className="game-actions">
        <button
          type="button"
          className="action-btn primary-button"
          onClick={handleQuickTip}
          disabled={!isConnected || loading}
          aria-label={loading ? "Sending quick tip..." : "Send quick tip of 0.001 STX"}
        >
          {loading ? '⏳' : '⚡'} Quick Tip (0.001 STX)
        </button>

        <button
          type="button"
          className="action-btn secondary-button"
          onClick={handleSelfPing}
          disabled={!isConnected || loading}
          title="Send a self ping transaction"
          aria-label="Send self ping transaction"
        >
          <span aria-hidden="true">📡</span> Self Ping
        </button>

        <div className="tip-custom">
          <div className="input-group">
            <label className="input-label" htmlFor="recipient-address">Recipient Address</label>
            <input
              id="recipient-address"
              type="text"
              placeholder="SP..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="address-input input-field"
              aria-required="true"
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="tip-amount">Amount (uSTX)</label>
            <div className="tip-amount-group">
              <input
                id="tip-amount"
                type="number"
                min="1000"
                step="1000"
                value={tipAmount}
                onChange={(e) => setTipAmount(Number.parseInt(e.target.value, 10) || 1000)}
                className="amount-input input-field"
                aria-label="Tip Amount in microstacks"
                title="Enter the tip amount in uSTX"
              />
            </div>
          </div>
          <button
            type="button"
            className="action-btn secondary-button outline"
            onClick={handleTipUser}
            disabled={!isConnected || loading || !recipientAddress}
            title={`Send ${tipAmount} uSTX to ${recipientAddress}`}
            aria-label={`Send tip to user ${recipientAddress}`}
          >
            Send Tip
          </button>
        </div>

        <button
          type="button"
          className="action-btn secondary-button outline"
          onClick={handleDonate}
          disabled={!isConnected || loading}
          aria-label={`Donate ${tipAmount} uSTX to developer`}
        >
          🎁 Donate {tipAmount} uSTX
        </button>
      </div>

      <p className="game-fee">Fee: 0.0001 STX per action</p>
    </div>
  );
}
