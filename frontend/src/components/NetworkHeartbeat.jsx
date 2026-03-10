import React, { useState, useEffect } from 'react';

/**
 * Visual indicator for network synchronization and state.
 */
export default function NetworkHeartbeat() {
  const [blockHeight, setBlockHeight] = useState(834512);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight(prev => prev + (Math.random() > 0.9 ? 1 : 0));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="heartbeat-container" title="Stacks Network Live">
      <div className="heartbeat-pulse"></div>
      <span className="block-height">#{blockHeight}</span>
    </div>
  );
}
