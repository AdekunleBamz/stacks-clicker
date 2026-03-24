import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    if (refreshing) {
      setStartY(0);
      return;
    }

    if (pullDistance > PULL_THRESHOLD) {
      setRefreshing(true);
      Promise.resolve(onRefresh())
        .catch(() => null)
        .finally(() => {
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
      role="region"
      aria-label="Pull to refresh content"
    >
      <div
        className="ptr-indicator"
        role="status"
        aria-live="polite"
        style={{ transform: `translateY(${pullDistance - 50}px)`, opacity: pullDistance / PULL_THRESHOLD }}
      >
        <div 
          className={`ptr-spinner ${refreshing ? 'spinning' : ''}`}
          role={refreshing ? "progressbar" : "img"}
          aria-label={refreshing ? "Refreshing content" : "Pull to refresh"}
        >
          {refreshing ? '⏳' : '↓'}
        </div>
      </div>
      <div style={{ transform: `translateY(${pullDistance > 0 ? pullDistance : 0}px)` }}>
        {/* Children content or overlay logic */}
      </div>
    </div>
  );
}

PullToRefresh.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};
