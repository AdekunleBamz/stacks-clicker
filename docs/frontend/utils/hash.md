# hash.js

`hash.js` provides deterministic hashing and color derivation helpers.

Primary APIs:
- `simpleHash(str)`
- `stringToColor(str)`

Behavior notes:
- `simpleHash` normalizes input to safe strings before hashing.
- `stringToColor` maps hash output to an HSL hue for repeatable visual identity.

## Maintenance Note
- Keep deterministic behavior expectations aligned with `frontend/src/utils/__tests__/hash.test.js`.

Source file: `frontend/src/utils/hash.js`.
