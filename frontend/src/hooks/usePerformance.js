import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for tracking real-time performance metrics (FPS, Memory).
 *
 * @returns {Object} { fps, memory }
 */
export function usePerformance() {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(null);
  const framesRef = useRef(0);
  const prevTimeRef = useRef(performance.now());
  const requestRef = useRef();

  useEffect(() => {
    const updateStats = () => {
      const time = performance.now();
      framesRef.current++;

      if (time > prevTimeRef.current + 1000) {
        setFps(Math.round((framesRef.current * 1000) / (time - prevTimeRef.current)));

        // @ts-ignore - performance.memory is non-standard but available in Chrome/Edge
        if (window.performance && window.performance.memory) {
          setMemory({
            // @ts-ignore
            used: Math.round(window.performance.memory.usedJSHeapSize / 1048576),
            // @ts-ignore
            total: Math.round(window.performance.memory.jsHeapSizeLimit / 1048576),
          });
        }
        
        prevTimeRef.current = time;
        framesRef.current = 0;
      }
      requestRef.current = requestAnimationFrame(updateStats);
    };

    requestRef.current = requestAnimationFrame(updateStats);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return { fps, memory };
}
