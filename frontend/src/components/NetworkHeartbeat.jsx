import React from 'react';
import { useNetwork } from '../hooks/useNetwork';

/**
 * Visual indicator for network synchronization and state.
 */
export default function NetworkHeartbeat() {
  const { blockHeight, isConnected, network } = useNetwork();
  const heartbeatTitle = isConnected
    ? `Stacks ${network} live at block ${blockHeight}`
    : 'Stacks network unavailable';

  return (
    <div className="heartbeat-container" title={heartbeatTitle} aria-live="polite">
      <div className="heartbeat-pulse"></div>
      <span className="block-height">{isConnected ? `#${blockHeight}` : 'Offline'}</span>
    </div>
  );
}
