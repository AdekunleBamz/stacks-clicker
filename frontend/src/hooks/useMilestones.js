import { useState, useEffect, useRef } from 'react';

const MILESTONE_THRESHOLDS = [10, 50, 100, 200, 500, 1000];

/**
 * Custom hook for managing gameplay milestones and celebrations.
 * Monitors interaction stats and triggers celebration events at specific thresholds.
 *
 * @param {Object} options - Hook options
 * @param {Object} options.stats - Current gameplay statistics (clicks, tips, votes)
 * @param {Function} options.onMilestone - Callback triggered when a milestone is reached
 * @returns {Object} { celebration }
 */
export function useMilestones({ stats, onMilestone }) {
  const [celebration, setCelebration] = useState(null);
  const celebrationTimeoutRef = useRef(null);

  useEffect(() => {
    const total = stats.clicks + stats.tips + stats.votes;
    
    if (MILESTONE_THRESHOLDS.includes(total) && total > 0) {
      const message = `Level Up: ${total} Interactions!`;
      setCelebration(message);
      onMilestone?.(total);

      window.clearTimeout(celebrationTimeoutRef.current);
      celebrationTimeoutRef.current = window.setTimeout(() => setCelebration(null), 3000);
    }

    return () => window.clearTimeout(celebrationTimeoutRef.current);
  }, [stats, onMilestone]);

  return { celebration };
}
