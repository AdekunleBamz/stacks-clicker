import { useEffect, useRef } from 'react';

/**
 * Custom hook for tracing component renders and identifying prop changes.
 * Useful for debugging unnecessary re-renders during development.
 *
 * @param {string} componentName - Name of the component being traced
 * @param {Object} props - Current props or state to track
 */
export function useTrace(componentName, props) {
  const prevProps = useRef(props);
  const renderCount = useRef(0);
  const safeName = typeof componentName === 'string' && componentName.trim() ? componentName.trim() : 'Unknown';

  useEffect(() => {
    renderCount.current += 1;
    const safeProps = props != null && typeof props === 'object' ? props : {};
    const changedProps = Object.entries(safeProps).reduce((ps, [k, v]) => {
      if (prevProps.current[k] !== v) {
        ps[k] = [prevProps.current[k], v];
      }
      return ps;
    }, {});

    if (Object.keys(changedProps).length > 0 && import.meta.env.DEV) {
      console.debug(`[useTrace] ${safeName} render#${renderCount.current} changed:`, changedProps);
    }

    prevProps.current = safeProps;
  });
}
