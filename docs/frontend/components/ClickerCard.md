# ClickerCard Component

The `ClickerCard` component wraps clicker interactions in an `ActionCard` container, providing the primary clicking interface for the GameFi experience.

## Overview

A connected address is required; disconnected actions trigger error feedback.
Keep button disabled/loading state tied to hook-level function keys.

- Align displayed action cost labels with current on-chain fee assumptions before each release.

- Recheck action labels when click cost display rules are updated.

- Confirm button disable logic still prevents duplicate click submits.

### Maintenance Note
- Recheck click cost copy whenever contract fee constants change.
- Audit prompt: confirm displayed click costs still match runtime estimates.
