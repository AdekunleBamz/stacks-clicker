import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        Date: 'readonly',
        Math: 'readonly',
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
