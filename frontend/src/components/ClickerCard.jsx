import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ActionCard from './common/ActionCard';
import ActionButton from './common/ActionButton';
import Tooltip from './common/Tooltip';

/**
 * Component for the Clicker game interaction card.
 * @param {Object} props - Component props.
 * @param {string} props.address - Connected wallet address.
 * @param {Object} props.clicker - Clicker hook object containing actions and loading state.
 */
function ClickerCard({ address, clicker }) {
  const { isLoading, click, multiClick, ping } = clicker;

  return (
    <ActionCard
      id="clicker-card"
      title="🎯 Power Clicker"
      subtitle="Click to generate on-chain activity."
      icon="🚀"
      accentColor="#5546FF"
    >
      <div className="actions">
        <Tooltip text="Perform a single on-chain click interaction instantly.">
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
