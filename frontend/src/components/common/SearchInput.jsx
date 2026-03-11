import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable search input with clear functionality and animated focus.
 */
export default function SearchInput({ value, onChange, onClear, placeholder, count }) {
  return (
    <div className="search-wrapper">
      <div className="search-relative">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder={placeholder}
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="search-clear"
              onClick={onClear}
              aria-label="Clear search"
            >
              ✕
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {count !== undefined && (
        <span className="search-count-badge">{count}</span>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  count: PropTypes.number
};
