# Release Artifact Cleanliness

## Summary
After production builds, generated assets and local deployment metadata should stay out of commits.

## Checks
- Inspect git status after frontend builds.
- Leave `dist/`, local env files, and deployment metadata uncommitted.
- Explain any intentional generated artifact in release notes.
