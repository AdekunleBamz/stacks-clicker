import { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ActionCard from './common/ActionCard';
import ActionButton from './common/ActionButton';
import Tooltip from './common/Tooltip';
import { useSound } from '../hooks/useSound';
import { notify } from '../utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { MIN_TIP_MICRO_STX } from '../utils/constants';

/** Smallest allowed tip in STX units (derived from the micro-STX constant) */
const MIN_TIP_STX = MIN_TIP_MICRO_STX / 1_000_000;

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
  const [tipAmount, setTipAmount] = useState(String(MIN_TIP_STX));
  const { playSound } = useSound();
  const [errorField, setErrorField] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const predefinedAmounts = [1, 5, 10];
  const parsedTipAmount = Number.parseFloat(tipAmount);
  const isTipAmountValid = Number.isFinite(parsedTipAmount) && parsedTipAmount >= MIN_TIP_STX;

  /**
   * Triggers a fixed 0.001 STX tip transaction.
   */
  const handleQuickTip = useCallback(() => tip(MIN_TIP_STX), [tip]);

  /**
   * Triggers a tip transaction with the user-defined custom amount.
   */
  const handleCustomTip = useCallback(() => {
    if (!isTipAmountValid) {
      playSound('error');
      setErrorField('custom-tip');
      setTimeout(() => setErrorField(null), 500);
      return;
    }

    tip(parsedTipAmount);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  }, [isTipAmountValid, parsedTipAmount, tip, playSound]);

  const handlePredefinedTip = useCallback((amount) => {
    tip(amount);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    notify.success(`Tipping ${amount} STX...`);
  }, [tip]);

  /**
   * Internal wrapper to check connection and play sound before executing an action.
   * If not connected, triggers an error sound and visual feedback.
   *
   * @param {Function} actionFn - The interaction function to execute
   * @param {string} fieldId - ID of the button for error highlighting
   */
  const handleAction = useCallback(
    (actionFn, fieldId, validation = () => true) => {
      if (!address || !validation()) {
        playSound('error');
        setErrorField(fieldId);
        setTimeout(() => setErrorField(null), 500);
        return;
      }
      playSound('click');
      actionFn();
    },
    [address, playSound]
  );

  return (
    <ActionCard
      title="💰 TipJar"
      subtitle="Send tips to generate transactions."
      icon="💎"
      iconClass="bg-amber-500/20 text-amber-500"
    >
      <div className="actions" role="group" aria-label="Tipping Controls">
        <Tooltip text="Ping the TipJar contract to verify active connectivity.">
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
        <Tooltip text="Send a quick 0.001 STX tip instantly.">
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

        <div className="stat" aria-live="polite">
          <span className="stat-label">Total Tipped</span>
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="tip-amount-input">
            Custom Amount (STX)
          </label>
          <div className="predefined-amounts">
            {predefinedAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                className="predefined-btn"
                aria-label={`Tip ${amt} STX preset`}
                onClick={() => handlePredefinedTip(amt)}
                disabled={isLoading('tip')}
              >
                {amt} STX
              </button>
            ))}
          </div>
          <input
            id="tip-amount-input"
            type="number"
            step="1"
            min="0.001"
            className={`amount-input ${errorField === 'custom-tip' ? 'input-error' : ''}`}
            value={tipAmount}
            onChange={(e) => setTipAmount(e.target.value)}
            placeholder="Min 0.001"
            aria-label="Custom tip amount in STX"
            aria-invalid={!isTipAmountValid || errorField === 'custom-tip'}
          />
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeOut", duration: 0.25 }}
              className="tip-success-msg"
              role="status"
              aria-live="polite"
            >
              🎉 Thank you for your generous tip!
            </motion.div>
          )}
        </AnimatePresence>

        <Tooltip
          content={
            isTipAmountValid
              ? `Send a custom tip of ${tipAmount} STX.`
              : 'Enter an amount of at least 0.001 STX.'
          }
        >
          <ActionButton
            label="Custom Tip"
            icon="💎"
            cost={
              isTipAmountValid ? `${(parsedTipAmount + 0.001).toFixed(3)} STX` : 'Invalid amount'
            }
            className="secondary"
            onClick={() => handleAction(handleCustomTip, 'custom-tip', () => isTipAmountValid)}
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
    isLoading: PropTypes.func.isRequired,
  }).isRequired,
};

TipJarCard.defaultProps = {
  address: null,
};

export default memo(TipJarCard);
