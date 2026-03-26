import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Floating Action Button (FAB) that appears when the user scrolls down,
 * allowing quick smooth scroll back to the top of the page.
 * Uses memoization to prevent unnecessary re-renders during scroll events.
 *
 * @component
 * @returns {JSX.Element|null} The rendered scroll-to-top button or null
 */
const ScrollToTop = memo(function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.3, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.3, y: 50, transition: { duration: 0.2 } }}
          whileHover={{ 
            y: -5, 
            scale: 1.1, 
            backgroundColor: 'var(--primary)',
            boxShadow: '0 10px 25px -5px var(--primary-glow)' 
          }}
          whileTap={{ scale: 0.9, y: 0 }}
          onHoverStart={() => playSound('hover')}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          aria-label="Scroll back to top of the page"
          title="Scroll to Top"
        >
          <motion.span 
            initial={{ y: 2 }}
            animate={{ y: [2, -2, 2] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            aria-hidden="true"
          >
            ▲
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
});

export default ScrollToTop;
