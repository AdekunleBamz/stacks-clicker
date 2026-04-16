import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for tracking the focus state of an element.
 *
 * @returns {[Object, boolean]} [ref, isFocused]
 */
export function useFocus() {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const node = ref.current;
    if (node) {
      node.addEventListener('focus', handleFocus);
      node.addEventListener('blur', handleBlur);

      return () => {
        node.removeEventListener('focus', handleFocus);
        node.removeEventListener('blur', handleBlur);
      };
    }
    return undefined;
  }, []);

  return [ref, isFocused];
}
