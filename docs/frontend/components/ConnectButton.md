# ConnectButton

`ConnectButton.jsx` shows connection state in compact form.

States:
- disconnected: `Connect Wallet` button
- connected: truncated address + disconnect button

Address display uses first 6 and last 4 characters.
Preserve clear focus styling because this control is primary for onboarding.

- Keep connected-state copy short so wallet status remains readable on narrow screens.

Source file: `frontend/src/components/ConnectButton.jsx`.
