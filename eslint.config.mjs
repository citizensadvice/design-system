import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVitest from '@vitest/eslint-plugin';

export default defineConfig([
  eslintConfigPrettier,
  globalIgnores(['docs/', 'vendor/', 'demo/', 'website/']),
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
    plugins: { vitest: eslintPluginVitest },
    extends: [eslintPluginVitest.configs.recommended],
    languageOptions: {
      globals: {
        ...eslintPluginVitest.environments.env.globals,
      },
    },
  },
]);
