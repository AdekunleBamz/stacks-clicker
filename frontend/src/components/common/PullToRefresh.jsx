import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';

const PULL_THRESHOLD = 80;

/**
 * Modern pull-to-refresh component for mobile devices.
 * Provides visual feedback during pull gesture and triggers refresh on release.
 * Uses memoization to prevent unnecessary re-renders during touch events.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onRefresh - Callback function triggered when refresh is activated
 * @param {React.ReactNode} props.children - Content to wrap with pull-to-refresh
 * @returns {JSX.Element} The rendered pull-to-refresh wrapper
 */
const PullToRefresh = memo(function PullToRefresh({ onRefresh, children }) {
  const [startY, setStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);


  const handleTouchStart = useCallback((e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].pageY);
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (startY > 0) {
      const currentY = e.touches[0].pageY;
      const dist = Math.max(0, (currentY - startY) * 0.4);
      setPullDistance(dist);
      if (dist > 10) e.preventDefault();
    }
  }, [startY]);

  const handleTouchEnd = useCallback(() => {
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
  }, [refreshing, pullDistance, onRefresh]);

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
          aria-valuenow={refreshing ? undefined : Math.min((pullDistance / PULL_THRESHOLD) * 100, 100)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {refreshing ? '⏳' : '↓'}
        </div>
      </div>
      <div style={{ transform: `translateY(${pullDistance > 0 ? pullDistance : 0}px)` }}>
        {children}
      </div>
    </div>
  );
});

PullToRefresh.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default PullToRefresh;
