# Frontend Build Notes

Reference for building, troubleshooting, and optimizing the frontend.

## Build Commands

### Production Build
```bash
cd frontend && npm run build
```

### Development Server
```bash
cd frontend && npm run dev
```

### Preview Production Build
```bash
cd frontend && npm run preview
```

## Troubleshooting

### Build Hangs
If build hangs locally:
1. Kill stale Vite processes: `pkill -f vite`
2. Clear Vite cache: `rm -rf frontend/node_modules/.vite`
3. Retry the build.

### Dependency Issues
When lockfiles change or dependencies fail:
1. Capture the failing package/version from terminal output.
2. Re-run clean install: `npm ci`
3. Retry the production build.

### Common Errors
| Error | Solution |
| :--- | :--- |
| Out of memory | Increase Node memory: `NODE_OPTIONS="--max-old-space-size=4096"` |
| Module not found | Run `npm install` to update dependencies |
| TypeScript errors | Run `npm run type-check` to identify issues |

## Performance Optimization

### Build Analysis
```bash
cd frontend && npm run build -- --mode analyze
```

### Bundle Size Tips
- Use dynamic imports for large components.
- Optimize images before committing.
- Remove unused dependencies regularly.

---

Companion index: [Operations docs](README.md).
