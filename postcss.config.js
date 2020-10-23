/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssUrl = require('postcss-url');

module.exports = {
  plugins: [
    autoprefixer(),
    cssnano(),
    postcssUrl({ url: (input) => input.url.replace('../..', '') }),
  ],
};
