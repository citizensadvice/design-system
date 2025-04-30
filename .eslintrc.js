module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier', 'plugin:import/recommended'],
  parserOptions: { ecmaVersion: 2022 },
  env: {
    node: true,
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: '*.test.js',
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
    },
    {
      files: 'lib/**/*.js',
      env: {
        browser: true,
      },
    },
  ],
};
