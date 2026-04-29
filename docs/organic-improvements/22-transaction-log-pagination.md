# Transaction log pagination note

Limit initial transaction log renders to keep first paint responsive on low-end devices.
Progressive pagination keeps historical visibility without blocking core actions.

- Recheck pagination after large bursts of mixed click and poll activity.
