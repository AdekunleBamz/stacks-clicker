import { memo } from 'react';
import { useNetwork } from '../hooks/useNetwork';
import Tooltip from './common/Tooltip';

/**
 * Visual indicator for network synchronization and state.
 * Displays real-time block height and connection status to the Stacks network.
 * Uses memoization to prevent unnecessary re-renders since it reads from context.
 *
 * @component
 * @returns {JSX.Element} The rendered network heartbeat indicator
 */
const NetworkHeartbeat = memo(function NetworkHeartbeat() {
  const { blockHeight, isConnected, network, isUpdating } = useNetwork();
  const heartbeatTitle = isConnected
    ? `Stacks ${network} live at block ${blockHeight ?? 'loading...'}`
    : 'Stacks interactive network currently unavailable';

  return (
    <Tooltip text={heartbeatTitle}>
      <div
        className="heartbeat-container"
        role={isConnected ? "status" : "alert"}
        aria-atomic="true"
        aria-label={heartbeatTitle}
        aria-busy={isUpdating}
        title={heartbeatTitle}
      >
        <div className={`heartbeat-pulse ${isConnected ? 'online' : 'offline'}`} aria-hidden="true"></div>
        <div className="heartbeat-info">
          <span className="network-name">{isConnected ? network : 'Disconnected'}</span>
          <span className={`block-height ${!blockHeight ? 'shimmer' : ''}`}>{isConnected ? `#${blockHeight}` : 'Offline'}</span>
        </div>
      </div>
    </Tooltip>
  );
});

export default NetworkHeartbeat;
