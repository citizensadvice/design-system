module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
  });

  return config;
};
