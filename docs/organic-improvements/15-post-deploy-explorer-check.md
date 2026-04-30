# Post-deploy explorer confirmation

After each deployment, open the latest contract transaction in the matching network explorer.
This catches contract-name mismatches early before frontend traffic increases.

- Save one verified explorer URL per contract action during post-deploy checks.

### Follow-up
- Include explorer checks from both history list and modal detail views.
