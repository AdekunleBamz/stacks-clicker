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
      node.addEventListener('focus', handleFocus, { capture: true });
      node.addEventListener('blur', handleBlur, { capture: true });

      return () => {
        node.removeEventListener('focus', handleFocus, { capture: true });
        node.removeEventListener('blur', handleBlur, { capture: true });
      };
    }
    return undefined;
  }, []);

  const blur = () => ref.current?.blur();
  const focus = () => ref.current?.focus();
  return [ref, isFocused, blur, focus];
}
