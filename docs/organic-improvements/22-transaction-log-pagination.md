# Transaction log pagination note

Limit initial transaction log renders to keep first paint responsive on low-end devices.
Progressive pagination keeps historical visibility without blocking core actions.

- Recheck pagination after large bursts of mixed click and poll activity.

### Follow-up
- Recheck pagination defaults when tx history retention limits are adjusted.
- Revalidate pagination reset behavior after filter or network changes.
