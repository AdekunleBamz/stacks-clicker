# QuickPollCard

`QuickPollCard.jsx` supports:
- poll ping heartbeat
- new poll creation (trimmed text input)
- yes/no voting on active poll

Important behavior:
- poll question input enforces max length and trimmed non-empty validation
- disconnected state blocks all actions with inline error feedback
