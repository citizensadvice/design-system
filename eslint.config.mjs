import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginJest from 'eslint-plugin-jest';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
    },
  },
  {
    files: ['**/*.test.{js,mjs,cjs}'],
    plugins: { jest: eslintPluginJest },
    languageOptions: {
      globals: eslintPluginJest.environments.globals.globals,
    },
  },
  {
    ignores: ['docs/', 'vendor/', 'demo/', 'design-system-docs/'],
  },
  eslintConfigPrettier,
]);
