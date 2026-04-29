# Contract name sync check

Confirm frontend contract constants match deployed contract names after every migration.
Name drift causes silent read/write failures that look like wallet issues.

- Reconcile this check with contract alias changes before deployment windows.
