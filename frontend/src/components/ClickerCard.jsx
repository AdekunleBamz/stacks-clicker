import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import ActionCard from './common/ActionCard';
import ActionButton from './common/ActionButton';
import Tooltip from './common/Tooltip';
import { useSound } from '../hooks/useSound';

/**
 * Component for the Clicker game interaction card.
 * Provides a user interface for single clicks, batch clicks (Turbo), and network pings.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string|null} [props.address] - Currently connected wallet address; required for actions
 * @param {Object} props.clicker - Interaction API from useClicker hook
 * @param {Function} props.clicker.click - Function to trigger a single click
 * @param {Function} props.clicker.multiClick - Function to trigger a multi-click (10x)
 * @param {Function} props.clicker.ping - Function to trigger a network ping
 * @param {Function} props.clicker.isLoading - Function to check loading state by action name
 * @returns {JSX.Element} The rendered Clicker interaction card
 */
function ClickerCard({ address, clicker }) {
  const { isLoading, click, multiClick, ping } = clicker;
  const { playSound } = useSound();
  const [errorField, setErrorField] = React.useState(null);
  const [combo, setCombo] = React.useState(0);
  const comboTimerRef = React.useRef(null);

  /**
   * Internal wrapper to play acoustic feedback before executing a contract action.
   * @param {Function} actionFn - The interaction function to execute
   * @param {...*} args - Optional arguments for the interaction function
   */
  const handleAction = useCallback(
    (actionFn, ...args) => {
      if (!address) {
        playSound('error');
        setErrorField(actionFn.name || 'action');
        setTimeout(() => setErrorField(null), 500);
        return;
      }

      // Combo management
      setCombo((prev) => prev + 1);
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => {
        setCombo(0);
      }, 2000);

      playSound('click');
      actionFn(...args);
    },
    [address, playSound]
  );

  return (
    <ActionCard
      id="clicker-card"
      title="🎯 Power Clicker"
      subtitle="Click to generate on-chain activity."
      icon="🚀"
      iconClass="bg-indigo-500/20 text-indigo-400"
    >
      <div className="clicker-header">
        <AnimatePresence>
          {combo > 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.5, y: -20 }}
              className="combo-badge"
            >
              <span className="combo-number">{combo}x</span>
              <span className="combo-text">COMBO!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="actions">
        <Tooltip content="Perform a single on-chain click interaction instantly (fixed cost).">
          <ActionButton
            label="Express Click"
            icon="⚡"
            cost="0.001 STX"
            onClick={() => handleAction(click)}
            isLoading={isLoading('click')}
            isError={errorField === 'click'}
            className="primary"
          />
        </Tooltip>
        <Tooltip content="Boost your activity by performing 10 clicks in one batch for better efficiency.">
          <ActionButton
            label="Turbo 10x"
            icon="🔥"
            cost="0.005 STX"
            className="secondary"
            onClick={() => handleAction(multiClick, 10)}
            isLoading={isLoading('multi-click')}
            isError={errorField === 'multiClick'}
          />
        </Tooltip>
        <Tooltip content="Ping the network to verify connection and emit a heartbeat event.">
          <ActionButton
            label="Network Ping"
            icon="📡"
            cost="0.001 STX"
            className="success"
            onClick={() => handleAction(ping)}
            isLoading={isLoading('ping')}
            isError={errorField === 'ping'}
          />
        </Tooltip>
      </div>
    </ActionCard>
  );
}

ClickerCard.propTypes = {
  address: PropTypes.string,
  clicker: PropTypes.shape({
    click: PropTypes.func.isRequired,
    multiClick: PropTypes.func.isRequired,
    ping: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired,
  }).isRequired,
};

export default memo(ClickerCard);
