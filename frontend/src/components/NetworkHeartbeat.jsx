import React from 'react';
import { useNetwork } from '../hooks/useNetwork';
import Tooltip from './common/Tooltip';

/**
 * Visual indicator for network synchronization and state.
 */
export default function NetworkHeartbeat() {
  const { blockHeight, isConnected, network } = useNetwork();
  const heartbeatTitle = isConnected
    ? `Stacks ${network} live at block ${blockHeight}`
    : 'Stacks network unavailable';

  return (
    <Tooltip content={heartbeatTitle}>
      <div className="heartbeat-container" aria-live="polite">
        <div className={`heartbeat-pulse ${isConnected ? 'online' : 'offline'}`}></div>
        <div className="heartbeat-info">
          <span className="network-name">{isConnected ? network : 'Disconnected'}</span>
          <span className="block-height">{isConnected ? `#${blockHeight}` : 'Offline'}</span>
        </div>
      </div>
    </Tooltip>
  );
}
