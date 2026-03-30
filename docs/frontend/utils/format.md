# format.js

`format.js` provides display helpers for addresses, counts, and STX amounts.

Exported helpers:
- `truncateAddress(address, options)`
- `formatNumber(value, options)`
- `formatStx(microStx)`

Behavior notes:
- `formatNumber` and `formatStx` return safe fallback strings for non-finite input.
- `truncateAddress` normalizes negative prefix/suffix values before slicing.

Source file: `frontend/src/utils/format.js`.
