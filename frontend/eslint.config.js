import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**'],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        self: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        Date: 'readonly',
        Math: 'readonly',
        Intl: 'readonly',
        fetch: 'readonly',
        caches: 'readonly',
        navigator: 'readonly',
        performance: 'readonly',
        URLSearchParams: 'readonly',
        KeyboardEvent: 'readonly',
        Storage: 'readonly',
        CustomEvent: 'readonly',
        StorageEvent: 'readonly',
        Audio: 'readonly',
        AbortController: 'readonly',
        IntersectionObserver: 'readonly',
        ResizeObserver: 'readonly',
        global: 'readonly',
        parseFloat: 'readonly',
        parseInt: 'readonly',
        JSON: 'readonly',
        import: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'no-unused-vars': 'warn',
      'react/jsx-no-target-blank': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
