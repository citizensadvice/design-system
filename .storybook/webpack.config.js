const path = require('path');

module.exports = async ({ config, mode }) => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    config.module.rules.push(
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.md$/,
            use: ['highlight-loader', 'markdown-loader']
        },
        {
            test: /\.haml$/,
            use: 'raw-loader'
        }
    );

    // Return the altered config
    return config;
};
