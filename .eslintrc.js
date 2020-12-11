module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'no-console': [2, { allow: ['warn'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
