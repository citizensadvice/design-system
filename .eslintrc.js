module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'no-plusplus': 'off',
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
