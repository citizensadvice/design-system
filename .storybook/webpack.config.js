const path = require('path');

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
    },
    {
      test: /\.haml$/,
      use: [
        {
          loader: path.resolve('./scripts/translated-haml-loader.js'),
        },
      ],
    },
    {
      test: /\.rb$/,
      use: {
        loader: 'shell-loader',
        options: { script: 'touch ./haml/*' },
      },
    }
  );

  // Return the altered config
  return config;
};
