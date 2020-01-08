const sass = require('node-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('postcss');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const { log } = console;
const PATH = path.join(__dirname, '..'); // Where's stuff?
const themes = require(`${PATH}/config/themes`); // eslint-disable-line

function compileCSS() {
    Object.keys(themes).forEach(key => {
        const file = themes[key].css;
        const source = `${PATH}/scss/${file}.scss`;
        const dest = `${PATH}/${file}.css`;
        sass.render(
            {
                file: source,
                outputStyle: 'compressed',
                includePaths: ['node_modules/normalize-scss/sass']
            },
            (error, result) => {
                if (!error) {
                    postcss([autoprefixer, cssnano])
                        .process(result.css, { from: source, to: dest })
                        .then(postCssResult => {
                            fs.writeFile(dest, postCssResult.css, err => {
                                if (!err) {
                                    // eslint-disable-next-line no-console
                                    log(chalk.green(`${file}.css written`));
                                } else {
                                    log(
                                        chalk.red(
                                            `Error writing ${file}: ${err}`
                                        )
                                    );
                                }
                            });
                        });
                } else {
                    log(chalk.red(`Error writing ${file}: ${error}`));
                }
            }
        );
    });
}

// Only run if the -r param is given
if (process.argv[2] === '-r') {
    compileCSS();
}

module.exports = {
    compileCSS
};
