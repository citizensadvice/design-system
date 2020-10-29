const sass = require('sass');

module.exports = function renderSass(options) {
  return sass.renderSync({
    includePaths: ['scss/'],
    ...options,
  });
};
