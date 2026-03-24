import React, { useState, useEffect } from 'react';
import { usePerformance } from '../../hooks/usePerformance';
import { useKeyPress } from '../../hooks/useKeyPress';

/**
 * Performance monitoring overlay for developer mode.
 * Real-time monitoring of frames per second (FPS) and JavaScript heap memory usage.
 * Only activates when 'dev' query parameter is present in the URL.
 *
 * @component
 * @returns {JSX.Element|null} The rendered performance overlay or null if dev mode is disabled
 */
export default function PerformanceOverlay() {
  const { fps, memory } = usePerformance();
  const [isVisible, setIsVisible] = useState(false);
  const isAltPressed = useKeyPress('Alt');
  const isPPressed = useKeyPress('p');

  useEffect(() => {
    if (isAltPressed && isPPressed) {
      setIsVisible((prev) => !prev);
    }
  }, [isAltPressed, isPPressed]);

  useEffect(() => {
    // Also support dev query param for backward compatibility
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('dev')) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="perf-overlay glass-card" role="status" aria-live="polite" aria-label="Performance Statistics: Alt+P to toggle">
      <div className="perf-stat">
        <span className="perf-label">FPS:</span>
        <span className={`perf-value ${fps < 30 ? 'bad' : fps < 50 ? 'warn' : 'good'}`}>
          {fps}
        </span>
      </div>
      {memory && (
        <div className="perf-stat">
          <span className="perf-label">MEM:</span>
          <span className="perf-value">{memory.used}MB</span>
        </div>
      )}
    </div>
  );
}
