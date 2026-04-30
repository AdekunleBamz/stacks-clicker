# I18nContext

`I18nContext` stores current language selection and translation lookup.

Exposed values:
- `lang`
- `setLang`
- `t(key)`

Language selection persists via `useLocalStorage`.
Keep translation keys stable to prevent runtime fallback churn.

## Maintenance Note
- Reconfirm provider boundary guidance when new locale-loading layers are introduced.

Source file: `frontend/src/context/I18nContext.jsx`.

- Reconfirm provider boundary assumptions when locale bootstrapping changes.

- Revisit locale fallback strategy after adding a new default language.

### Maintenance Note
- Audit fallback keys whenever language packs are expanded.
