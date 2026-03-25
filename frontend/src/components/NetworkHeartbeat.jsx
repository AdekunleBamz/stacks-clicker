import React from 'react';
import { motion } from 'framer-motion';
import { useNetwork } from '../hooks/useNetwork';
import Tooltip from './common/Tooltip';

/**
 * Visual indicator for network synchronization and state.
 */
function NetworkHeartbeat() {
  const { blockHeight, isConnected, network, isUpdating } = useNetwork();
  const heartbeatTitle = isConnected
    ? `Stacks ${network} live at block ${blockHeight}`
    : 'Stacks interactive network currently unavailable';

  return (
    <Tooltip content={heartbeatTitle}>
      <div 
        className={`heartbeat-container ${isUpdating ? 'heartbeat-active' : ''}`} 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        aria-label={`Network Status: ${heartbeatTitle}`}
      >
        <motion.div 
          animate={isConnected ? {
            scale: isUpdating ? [1, 1.8, 1] : [1, 1.5, 1],
            opacity: isUpdating ? [1, 0.2, 1] : [0.8, 0.4, 0.8]
          } : {}}
          transition={{
            duration: isUpdating ? 0.6 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`heartbeat-pulse ${isConnected ? 'online' : 'offline'}`} 
          aria-hidden="true"
        />
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

export default React.memo(NetworkHeartbeat);
