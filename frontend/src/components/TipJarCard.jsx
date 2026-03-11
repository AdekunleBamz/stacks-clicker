import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ActionCard from './common/ActionCard';
import ActionButton from './common/ActionButton';
import Tooltip from './common/Tooltip';
import { useSound } from '../hooks/useSound';

/**
 * Component for the TipJar interaction card.
 * @param {Object} props - Component props.
 * @param {string} props.address - Connected wallet address.
 * @param {Function} props.isLoading - Function to check if an action is loading.
 * @param {string} props.tipAmount - Current custom tip amount.
 * @param {Function} props.setTipAmount - Setter for tip amount.
 * @param {Function} props.handleSelfPing - Handler for ping action.
 * @param {Function} props.handleQuickTip - Handler for quick tip action.
 * @param {Function} props.handleCustomTip - Handler for custom tip action.
 */
function TipJarCard({
  address,
  isLoading,
  tipAmount,
  setTipAmount,
  handleSelfPing,
  handleQuickTip,
  handleCustomTip,
}) {
  const { playSound } = useSound();
  const [errorField, setErrorField] = useState(null);

  const handleAction = useCallback((fn, fieldId) => {
    if (!address) {
      playSound('error');
      setErrorField(fieldId);
      setTimeout(() => setErrorField(null), 500);
      return;
    }
    playSound('click');
    fn();
  }, [address, playSound]);

  return (
    <ActionCard
      id="tipjar-card"
      title="💰 TipJar"
      subtitle="Send tips to generate transactions."
      icon="💎"
      accentColor="#F59E0B"
    >
      <div className="actions">
        <Tooltip content="Ping the TipJar contract.">
          <ActionButton
            label="Self Ping"
            icon="🏓"
            cost="0.001 STX"
            className="success"
            onClick={() => handleAction(handleSelfPing, 'self-ping')}
            isLoading={isLoading('tipjar-self-ping')}
            isError={errorField === 'self-ping'}
            disabled={isLoading('tipjar-self-ping')}
          />
        </Tooltip>
        <Tooltip content="Send a quick 0.001 STX tip.">
          <ActionButton
            label="Quick Tip"
            icon="💰"
            cost="0.002 STX"
            className="warning"
            onClick={() => handleAction(handleQuickTip, 'quick-tip')}
            isLoading={isLoading('tipjar-quick-tip')}
            isError={errorField === 'quick-tip'}
            disabled={isLoading('tipjar-quick-tip')}
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

        <Tooltip content={`Send a custom tip of ${tipAmount} STX.`}>
          <ActionButton
            label="Custom Tip"
            icon="💎"
            cost={`${(parseFloat(tipAmount || 0) + 0.001).toFixed(3)} STX`}
            className="secondary"
            onClick={() => handleAction(handleCustomTip, 'custom-tip')}
            isLoading={isLoading('tipjar-tip-jar')}
            isError={errorField === 'custom-tip'}
            disabled={isLoading('tipjar-tip-jar')}
          />
        </Tooltip>
      </div>
    </ActionCard>
  );
}

TipJarCard.propTypes = {
  address: PropTypes.string,
  isLoading: PropTypes.func.isRequired,
  tipAmount: PropTypes.string.isRequired,
  setTipAmount: PropTypes.func.isRequired,
  handleSelfPing: PropTypes.func.isRequired,
  handleQuickTip: PropTypes.func.isRequired,
  handleCustomTip: PropTypes.func.isRequired,
};

export default memo(TipJarCard);
