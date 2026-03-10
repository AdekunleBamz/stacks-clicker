import React from 'react';
import ActionCard from './common/ActionCard';
import ActionButton from './common/ActionButton';
import Tooltip from './common/Tooltip';
import { useSound } from '../hooks/useSound';

export default function TipJarCard({
  address,
  isLoading,
  tipAmount,
  setTipAmount,
  handleSelfPing,
  handleQuickTip,
  handleCustomTip,
}) {
  const { playSound } = useSound();

  const handleAction = (fn) => {
    playSound('click');
    fn();
  };
  return (
    <ActionCard
      id="tipjar-card"
      title="💰 TipJar"
      subtitle="Send tips to generate transactions."
      icon="💎"
      accentColor="#F59E0B"
    >
      <div className="actions">
        <Tooltip text="Ping the TipJar contract.">
          <ActionButton
            label="Self Ping"
            icon="🏓"
            cost="0.001 STX"
            className="success"
            onClick={() => handleAction(handleSelfPing)}
            isLoading={isLoading('tipjar-self-ping')}
            disabled={!address}
          />
        </Tooltip>
        <Tooltip text="Send a quick 0.001 STX tip.">
          <ActionButton
            label="Quick Tip"
            icon="💰"
            cost="0.002 STX"
            className="warning"
            onClick={() => handleAction(handleQuickTip)}
            isLoading={isLoading('tipjar-quick-tip')}
            disabled={!address}
          />
        </Tooltip>

        <div className="input-group">
          <label className="input-label">Custom Amount (STX)</label>
          <input
            type="number"
            step="0.001"
            min="0.001"
            className="amount-input"
            value={tipAmount}
            onChange={(e) => setTipAmount(e.target.value)}
            placeholder="0.001"
          />
        </div>

        <Tooltip text={`Send a custom tip of ${tipAmount} STX.`}>
          <ActionButton
            label="Custom Tip"
            icon="💎"
            cost={`${(parseFloat(tipAmount || 0) + 0.001).toFixed(3)} STX`}
            className="secondary"
            onClick={() => handleAction(handleCustomTip)}
            isLoading={isLoading('tipjar-tip-jar')}
            disabled={!address}
          />
        </Tooltip>
      </div>
    </ActionCard>
  );
}
