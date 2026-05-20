import { useCallback } from 'react';
import PropTypes from 'prop-types';
import ActionButton from './common/ActionButton';
import { useSound } from '../hooks/useSound';

/**
 * QuickActions component for common utility tasks.
 * Provides shortcut buttons for ping, log clearing, and external links.
 */
export default function QuickActions({ address = null, onClearLog, onPingAll }) {
  const { playSound } = useSound();

  const handleAction = useCallback(
    (fn) => {
      playSound('click');
      fn();
    },
    [playSound]
  );

  return (
    <div
      className="quick-actions-panel"
      role="region"
      aria-labelledby="quick-tools-title"
      title="Quick tool shortcuts"
    >
      <h4 id="quick-tools-title" className="panel-title">
        <span aria-hidden="true">⚡</span> Quick Tools
      </h4>
      <div className="actions-stack" title="Available quick tools">
        <ActionButton
          label="Ping All"
          icon="📡"
          className="secondary btn-sm"
          onClick={() => handleAction(onPingAll)}
          disabled={!address}
          isLoading={false}
        />
        <ActionButton
          label="Clear Log"
          icon="🗑️"
          className="secondary btn-sm"
          onClick={() => handleAction(onClearLog)}
        />
        <ActionButton
          label="Stacks Docs"
          icon="📖"
          className="secondary btn-sm"
          onClick={() =>
            handleAction(() => window.open('https://stacks.org', '_blank', 'noopener,noreferrer'))
          }
        />
      </div>
    </div>
  );
}

QuickActions.propTypes = {
  onClearLog: PropTypes.func.isRequired,
  onPingAll: PropTypes.func.isRequired,
  address: PropTypes.string,
};
