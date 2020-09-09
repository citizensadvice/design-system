/* eslint-disable import/no-extraneous-dependencies */
const sass = require('node-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('postcss');
const url = require('postcss-url');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const { log } = console;
const PATH = path.join(__dirname, '..'); // Where's stuff?
const OUTPUT_DIR = path.join(PATH, 'lib');

const file = 'lib';
const source = `${PATH}/scss/${file}.scss`;
const dest = `${OUTPUT_DIR}/${file}.css`;

function compileSass() {
  sass.render(
    {
      file: source,
      outputStyle: 'compressed',
    },
    (error, result) => {
      if (!error) {
        postcss([
          autoprefixer,
          cssnano,
          url({
            url: (input) => input.url.replace('../..', ''),
          }),
        ])
          .process(result.css, { from: source, to: dest })
          .then((compiledCSS) => {
            fs.writeFile(dest, compiledCSS.css, (err) => {
              if (!err) {
                // eslint-disable-next-line no-console
                log(chalk.green(`${file}.css written`));
              } else {
                log(chalk.red(`Error writing ${file}: ${err}`));
              }
            });
          });
      } else {
        log(chalk.red(`Error writing ${file}: ${error}`));
      }
    }
  );
}

// Only run if the -r param is given
if (process.argv[2] === '-r') {
  // Make sure the output dir exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  compileSass();
}

module.exports = {
  compileSass,
};
