const path = require('path');
const marked = require('marked');
const renderer = new marked.Renderer();

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push(
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            includePaths: ['node_modules/normalize-scss/sass']
                        }
                    }
                }
            ]
        },
        {
            test: /\.md$/,
            use: ['highlight-loader', 'markdown-loader']
        }
    );

    // Return the altered config
    return config;
};
