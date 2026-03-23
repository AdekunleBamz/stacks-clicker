# I18nContext

`I18nContext` stores current language selection and translation lookup.

Exposed values:
- `lang`
- `setLang`
- `t(key)`

Language selection persists via `useLocalStorage`.
Keep translation keys stable to prevent runtime fallback churn.

Source file: `frontend/src/context/I18nContext.jsx`.
