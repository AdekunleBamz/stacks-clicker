import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ActionButton from './common/ActionButton';
import { useSound } from '../hooks/useSound';

/**
 * QuickActions component for common utility tasks.
 */
function QuickActions({ address, onClearLog, onPingAll }) {
  const { playSound } = useSound();

  const handleAction = useCallback((fn) => {
    playSound('click');
    fn();
  }, [playSound]);

  return (
    <div className="quick-actions-panel" role="region" aria-label="Quick manual actions">
      <h4 className="panel-title" id="quick-actions-heading">⚡ Quick Actions</h4>
      <div className="actions-stack" role="group" aria-labelledby="quick-actions-heading">
        <ActionButton
          label="Ping All"
          icon="📡"
          className="secondary-button btn-sm"
          onClick={() => handleAction(onPingAll)}
          disabled={!address}
        />
        <ActionButton
          label="Clear Log"
          icon="🗑️"
          className="secondary-button btn-sm"
          onClick={() => handleAction(onClearLog)}
        />
        <ActionButton
          label="Support"
          icon="💬"
          className="secondary-button btn-sm"
          onClick={() =>
            handleAction(() => window.open('https://stacks.org', '_blank', 'noopener,noreferrer'))
          }
          aria-label="Open Stacks support in new tab"
        />
      </div>
    </div>
  );
}

QuickActions.propTypes = {
  onClearLog: PropTypes.func.isRequired,
  onPingAll: PropTypes.func.isRequired,
  address: PropTypes.string
};
QuickActions.displayName = 'QuickActions';

export default memo(QuickActions);
