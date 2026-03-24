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
    : 'Stacks interactive network currently unavailable';

  return (
    <Tooltip content={heartbeatTitle}>
      <div 
        className="heartbeat-container" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        aria-label={`Network Status: ${heartbeatTitle}`}
      >
        <div 
          className={`heartbeat-pulse ${isConnected ? 'online pulse-animation' : 'offline'}`} 
          aria-hidden="true"
        ></div>
        <div className="heartbeat-info glass-card">
          <span className="network-name">{isConnected ? network : 'Disconnected'}</span>
          <span className="block-height" aria-label={`Current block height: ${blockHeight}`}>
            {isConnected ? `#${blockHeight}` : 'Offline'}
          </span>
        </div>
      </div>
    </Tooltip>
  );
}
