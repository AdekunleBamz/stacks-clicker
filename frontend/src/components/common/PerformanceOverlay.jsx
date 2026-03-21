import React, { useState, useEffect } from 'react';

/**
 * Performance monitoring overlay for developer mode.
 * Real-time monitoring of frames per second (FPS) and JavaScript heap memory usage.
 * Only activates when 'dev' query parameter is present in the URL.
 *
 * @component
 * @returns {JSX.Element|null} The rendered performance overlay or null if dev mode is disabled
 */
export default function PerformanceOverlay() {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if explicitly enabled via query param or env
    const isDev = new URLSearchParams(window.location.search).has('dev');
    if (!isDev) return;

    setIsVisible(true);
    let isMounted = true;
    let frames = 0;
    let prevTime = performance.now();
    let requestRef;

    const updateStats = () => {
      const time = performance.now();
      frames++;

      if (time > prevTime + 1000) {
        if (isMounted) {
          setFps(Math.round((frames * 1000) / (time - prevTime)));

          // @ts-ignore - performance.memory is non-standard but available in Chrome/Edge
          if (window.performance && window.performance.memory) {
            setMemory({
              // @ts-ignore
              used: Math.round(window.performance.memory.usedJSHeapSize / 1048576),
              // @ts-ignore
              total: Math.round(window.performance.memory.jsHeapSizeLimit / 1048576)
            });
          }
        }
        prevTime = time;
        frames = 0;
      }
      requestRef = requestAnimationFrame(updateStats);
    };

    requestRef = requestAnimationFrame(updateStats);

    return () => {
      isMounted = false;
      cancelAnimationFrame(requestRef);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="perf-overlay" role="status" aria-live="polite" aria-label="Performance Stats">
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
