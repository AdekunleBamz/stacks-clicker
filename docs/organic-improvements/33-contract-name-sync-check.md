# Contract name sync check

Confirm frontend contract constants match deployed contract names after every migration.
Name drift causes silent read/write failures that look like wallet issues.

- Reconcile this check with contract alias changes before deployment windows.

### Follow-up
- Reconfirm contract-name references when deployment manifests are updated.
- Cross-check explorer URLs to ensure contract name segments match deployed identifiers.
