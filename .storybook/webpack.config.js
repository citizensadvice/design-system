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
            test: /\.(woff|ttf|eot|svg).*$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            ]
        },
        {
            test: /\.md$/,
            use: ['markdown-loader']
        },
        {
            test: /\.haml$/,
            use: [
                'raw-loader',
                {
                    loader: 'shell-loader',
                    options: { script: 'ruby ./scripts/haml.rb' }
                }
            ]
        },
        {
            test: /\.rb$/,
            use: {
                loader: 'shell-loader',
                options: { script: 'touch ./haml/*' }
            }
        }
    );

    // Return the altered config
    return config;
};
