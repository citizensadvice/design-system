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
const OUTPUT_DIR = path.join(PATH, 'lib');

function compileCSS() {
    Object.keys(themes).forEach(key => {
        const file = themes[key].css;
        const source = `${PATH}/scss/${file}.scss`;
        const dest = `${OUTPUT_DIR}/${file}.css`;

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
                            const replaceUrlPaths = postCssResult.css.replace(
                                'url(../assets/',
                                'url(/assets/'
                            );
                            fs.writeFile(dest, replaceUrlPaths, err => {
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
    // Make sure the output dir exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    compileCSS();
}

module.exports = {
    compileCSS
};
