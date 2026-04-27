import PropTypes from 'prop-types';
import ActionButton from './common/ActionButton';
import { useSound } from '../hooks/useSound';

/**
 * QuickActions component for common utility tasks.
 */
export default function QuickActions({ address, onClearLog, onPingAll }) {
  const { playSound } = useSound();

  const handleAction = (fn) => {
    playSound('click');
    fn();
  };

  return (
    <div className="quick-actions-panel" role="region" aria-label="Quick tools panel" title="Quick utility actions">
      <h4 className="panel-title"><span aria-hidden="true">⚡</span> Quick Tools</h4>
      <div className="actions-stack">
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
  address: PropTypes.string
};
