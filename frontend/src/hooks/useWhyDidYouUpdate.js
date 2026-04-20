import { useEffect, useRef } from 'react';

/**
 * Custom hook for debugging unnecessary re-renders.
 * Logs changed props to the console between renders.
 *
 * @param {string} name - Component name for identification
 * @param {Object} props - Component props to track
 */
export function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef();
  const safeName = typeof name === 'string' && name.trim() ? name.trim() : 'UnknownComponent';

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changesObj = {};

      allKeys.forEach((key) => {
        if (previousProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changesObj).length && import.meta.env.DEV) {
        console.group(`[why-did-you-update] ${safeName}`);
        console.log('Changed props:', changesObj);
        console.groupEnd();
      }
    }

    previousProps.current = props;
  });
}
