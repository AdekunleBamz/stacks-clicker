import React, { useState, useEffect } from 'react';

/**
 * Performance monitoring overlay for developer mode.
 * Displays FPS and memory usage (if available).
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
    let frames = 0;
    let prevTime = performance.now();

    const updateStats = () => {
      const time = performance.now();
      frames++;
      if (time > prevTime + 1000) {
        setFps(Math.round((frames * 1000) / (time - prevTime)));
        prevTime = time;
        frames = 0;

        if (performance.memory) {
          setMemory({
            used: Math.round(performance.memory.usedJSHeapSize / 1048576),
            total: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
          });
        }
      }
      requestAnimationFrame(updateStats);
    };

    const handle = requestAnimationFrame(updateStats);
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="perf-overlay">
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
