# Quickpoll answer trim note

When testing poll creation, include an option with leading and trailing spaces.

The release check should confirm the UI preview and submitted payload agree on the trimmed answer text.

This prevents voters from seeing duplicate-looking options that are different only by whitespace.
