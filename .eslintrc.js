module.exports = {
  root: true,
  extends: ['airbnb-base'],
  env: {
    browser: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'no-plusplus': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    'import/extensions': 'off',
    'function-paren-newline': 'off', // Conflicts with prettier
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
