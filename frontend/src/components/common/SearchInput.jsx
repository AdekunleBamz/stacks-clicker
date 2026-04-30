import { memo } from 'react';
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
  return (
    <div className="search-wrapper" role="search">
      <div className="search-relative">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          id="global-transaction-search"
          type="text"
          placeholder={placeholder}
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Global transaction search"
          aria-describedby={count !== undefined ? 'global-transaction-search-count' : undefined}
          autoComplete="off"
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
              title="Clear search query"
              aria-controls="global-transaction-search"
            >
              <span aria-hidden="true">✕</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {count !== undefined && (
        <span id="global-transaction-search-count" className="search-count-badge" aria-live="polite" aria-atomic="true" aria-label={`${count} matching items`} title="Matching items found">{count}</span>
      )}
    </div>
  );
}

SearchInput.defaultProps = {
  placeholder: 'Search...',
  count: undefined,
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  count: PropTypes.number
};

export default memo(SearchInput);
