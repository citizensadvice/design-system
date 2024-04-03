module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier', 'plugin:import/recommended'],
  parserOptions: { ecmaVersion: 2022 },
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.ts'] },
    },
  },
  overrides: [
    {
      files: 'src/ts/**/**.ts',
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      env: {
        browser: true,
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
      },
    },
  ],
};
