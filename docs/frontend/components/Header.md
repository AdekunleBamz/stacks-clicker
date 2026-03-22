# Header

`Header.jsx` renders:
- network identity (`NetworkHeartbeat` + `NetworkLogo`)
- language selector (`useI18n`)
- theme toggle control
- wallet connect or connected address state

Props:
- `theme`: current theme string
- `toggleTheme`: callback that flips theme state
- keep wallet state text concise so header remains scannable on mobile

- Keep language selector defaults aligned with i18n fallback settings to avoid mismatched initial state.
