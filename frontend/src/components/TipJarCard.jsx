import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ActionCard from './common/ActionCard';
import ActionButton from './common/ActionButton';
import Tooltip from './common/Tooltip';
import { useSound } from '../hooks/useSound';

/**
 * Component for the TipJar interaction card.
 * Allows users to send tips (quick or custom) and trigger contract pings.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string|null} [props.address] - Connected wallet address; required for actions
 * @param {Object} props.tipjar - Interaction API from useTipJar hook
 * @param {Function} props.tipjar.tip - Function to send a tip (amount: number)
 * @param {Function} props.tipjar.handleSelfPing - Function to trigger a self-ping
 * @param {Function} props.tipjar.isLoading - Function to check loading state by action name
 * @returns {JSX.Element} The rendered TipJar interaction card
 */
function TipJarCard({ address, tipjar }) {
  const { isLoading, tip, handleSelfPing } = tipjar;
  const [tipAmount, setTipAmount] = useState('0.001');
  const { playSound } = useSound();
  const [errorField, setErrorField] = useState(null);

  /**
   * Triggers a fixed 0.001 STX tip transaction.
   */
  const handleQuickTip = useCallback(() => tip(0.001), [tip]);

  /**
   * Triggers a tip transaction with the user-defined custom amount.
   */
  const handleCustomTip = useCallback(() => tip(parseFloat(tipAmount)), [tip, tipAmount]);

  /**
   * Internal wrapper to check connection and play sound before executing an action.
   * If not connected, triggers an error sound and visual feedback.
   *
   * @param {Function} actionFn - The interaction function to execute
   * @param {string} fieldId - ID of the button for error highlighting
   */
  const handleAction = useCallback((actionFn, fieldId) => {
    if (!address) {
      playSound('error');
      setErrorField(fieldId);
      setTimeout(() => setErrorField(null), 500);
      return;
    }
    playSound('click');
    actionFn();
  }, [address, playSound]);

  return (
    <ActionCard
      id="tipjar-card"
      title="💰 TipJar"
      subtitle="Send tips to generate transactions."
      icon="💎"
      iconClass="bg-amber-500/20 text-amber-500"
    >
      <div className="actions">
        <Tooltip content="Ping the TipJar contract to verify connectivity.">
          <ActionButton
            label="Self Ping"
            icon="🏓"
            cost="0.001 STX"
            className="success"
            onClick={() => handleAction(handleSelfPing, 'self-ping')}
            isLoading={isLoading('self-ping')}
            isError={errorField === 'self-ping'}
            disabled={isLoading('self-ping')}
          />
        </Tooltip>
        <Tooltip content="Send a quick 0.001 STX tip instantly.">
          <ActionButton
            label="Quick Tip"
            icon="💰"
            cost="0.002 STX"
            className="warning"
            onClick={() => handleAction(handleQuickTip, 'quick-tip')}
            isLoading={isLoading('tip')}
            isError={errorField === 'quick-tip'}
            disabled={isLoading('tip')}
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
            isLoading={isLoading('tip')}
            isError={errorField === 'custom-tip'}
            disabled={isLoading('tip')}
          />
        </Tooltip>
      </div>
    </ActionCard>
  );
}

TipJarCard.propTypes = {
  address: PropTypes.string,
  tipjar: PropTypes.shape({
    tip: PropTypes.func.isRequired,
    handleSelfPing: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired
  }).isRequired
};

export default memo(TipJarCard);
