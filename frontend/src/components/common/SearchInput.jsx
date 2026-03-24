import React, { useId, memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable search input component with clear functionality, animated focus, and result count badge.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.value - Current search query value
 * @param {Function} props.onChange - Callback fired when input value changes
 * @param {Function} props.onClear - Callback fired when clear button is clicked
 * @param {string} [props.placeholder='Search...'] - Input placeholder text
 * @param {number} [props.count] - Optional match count to display in a badge
 * @returns {JSX.Element} The rendered search input
 */
function SearchInput({ value, onChange, onClear, placeholder = 'Search...', count }) {
  const id = useId();
  const searchId = `search-input-${id}`;

  return (
    <div className="search-wrapper" role="search">
      <div className="search-relative">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          id={searchId}
          type="text"
          placeholder={placeholder}
          className="search-input input-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search transaction history"
        />
        <AnimatePresence>
          {value && (
            <motion.button
              type="button"
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
        <span className="search-count-badge" aria-label={`${count} results found`}>{count}</span>
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

SearchInput.displayName = 'SearchInput';

export default memo(SearchInput);
