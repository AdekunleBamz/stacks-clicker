import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modern pull-to-refresh component for mobile.
 */
export default function PullToRefresh({ onRefresh }) {
  const [startY, setStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const PULL_THRESHOLD = 80;

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].pageY);
    }
  };

  const handleTouchMove = (e) => {
    if (startY > 0) {
      const currentY = e.touches[0].pageY;
      const dist = Math.max(0, (currentY - startY) * 0.4);
      setPullDistance(dist);
      if (dist > 10) e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > PULL_THRESHOLD) {
      setRefreshing(true);
      onRefresh().then(() => {
        setRefreshing(false);
        setPullDistance(0);
      });
    } else {
      setPullDistance(0);
    }
    setStartY(0);
  };

  return (
    <div
      className="ptr-wrapper"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="ptr-indicator"
        style={{ transform: `translateY(${pullDistance - 50}px)`, opacity: pullDistance / PULL_THRESHOLD }}
      >
        <div className={`ptr-spinner ${refreshing ? 'spinning' : ''}`}>
          {refreshing ? '⏳' : '↓'}
        </div>
      </div>
      <div style={{ transform: `translateY(${pullDistance > 0 ? pullDistance : 0}px)` }}>
        {/* Children content or overlay logic */}
      </div>
    </div>
  );
}
