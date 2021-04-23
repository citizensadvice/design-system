/* eslint-disable import/no-extraneous-dependencies */
const postcssImport = require('postcss-import');
const postcssFlexbugFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssImport,
    postcssFlexbugFixes,
    postcssPresetEnv({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
  ],
};
