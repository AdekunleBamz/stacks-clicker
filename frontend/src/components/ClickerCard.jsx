import React from 'react';
import ActionCard from './common/ActionCard';
import ActionButton from './common/ActionButton';
import Tooltip from './common/Tooltip';

/**
 * Component for the Clicker game interaction card.
 * @param {Object} props - Component props.
 * @param {string} props.address - Connected wallet address.
 * @param {Object} props.clicker - Clicker hook object containing actions and loading state.
 */
export default function ClickerCard({ address, clicker }) {
  const { isLoading, click, multiClick, ping } = clicker;

  return (
    <ActionCard
      id="clicker-card"
      title="🎯 Power Clicker"
      subtitle="Click to generate on-chain activity."
      icon="🚀"
      accentColor="#5546FF"
    >
      <div className="clicker-header">
        <AnimatePresence>
          {combo > 1 && (
            <motion.div
              style={{ willChange: 'transform, opacity' }}
              initial={{ opacity: 0, scale: 0.2, y: 40, rotate: -15 }}
              animate={{
                opacity: 1,
                scale: Math.min(1 + combo * 0.05, 1.5),
                y: 0,
                rotate: 0
              }}
              exit={{ opacity: 0, scale: 2, y: -40, filter: 'blur(10px)' }}
              transition={{
                type: 'spring',
                stiffness: 600,
                damping: 20,
                mass: 0.8
              }}
              className="combo-badge premium-glow"
              role="status"
              aria-label={`Combo ${combo}x active`}
            >
              <div className="combo-inner glass-card">
                <span className="combo-number">{combo}x</span>
                <span className="combo-text">COMBO!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="stat" aria-live="polite">
          <span className="stat-label">Total Clicks</span>
        </div>
      </div>
      <div className="actions" role="group" aria-label="Clicker Contract Controls">
        <Tooltip content="Perform a single on-chain click interaction instantly (fixed cost).">
          <ActionButton
            label="Express Click"
            icon="⚡"
            cost="0.001 STX"
            onClick={click}
            isLoading={isLoading('clicker-click')}
            disabled={!address}
            className="primary"
          />
        </Tooltip>
        <Tooltip text="Boost your activity by performing 10 clicks in one batch.">
          <ActionButton
            label="Turbo 10x"
            icon="🔥"
            cost="0.005 STX"
            className="secondary"
            onClick={() => multiClick(10)}
            isLoading={isLoading('clicker-multi-click')}
            disabled={!address}
          />
        </Tooltip>
        <Tooltip text="Ping the network to verify connection and contract state.">
          <ActionButton
            label="Network Ping"
            icon="📡"
            cost="0.001 STX"
            className="success"
            onClick={ping}
            isLoading={isLoading('clicker-ping')}
            disabled={!address}
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
