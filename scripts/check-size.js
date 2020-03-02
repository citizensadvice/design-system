const path = require('path');
const fs = require('fs-extra'); // eslint-disable-line
const chalk = require('chalk'); // eslint-disable-line
const { prompt } = require('inquirer'); // eslint-disable-line

const log = console.log; // eslint-disable-line
const CURRENT_VERSION = require(path.join(__dirname, '../package.json')) // eslint-disable-line
    .version;
const SIZE_CHANGE_THRESHOLD = 0.1; // 10%
const FILE_LIST = [];
const STATS_DIR = path.resolve(__dirname, '../stats');
const STATS_FILE = path.resolve(STATS_DIR, 'size.json');
const DIST_DIR = path.resolve(__dirname, '../dist');

let writeSizeResults = false;

fs.readdirSync(DIST_DIR)
    .filter(file => fs.statSync(path.resolve(DIST_DIR, file)).isFile())
    .filter(componentName => componentName.indexOf('.css') !== -1)
    .forEach(item => {
        FILE_LIST.push(item);
    });

function getLastBuildSizes(file) {
    try {
        const output = fs.readJsonSync(file);
        const sizes = output.sizes; // eslint-disable-line

        const previousStats = sizes[sizes.length - 1];
        return previousStats;
    } catch (e) {
        fs.ensureFileSync(file);
        log(chalk.red.dim(`* ${file} not found, now created`));
        return { stats: [] };
    }
}

function getBuildSizes(files, dir) {
    const stats = [];

    files.forEach(item => {
        try {
            const fileStats = fs.statSync(path.resolve(dir, item));
            const fileSizeInBytes = fileStats.size;
            stats.push({
                filename: item,
                size: fileSizeInBytes
            });
        } catch (e) {
            log(chalk.red.bold(`* Error reading ${item}`));
        }
    });

    return stats;
}

function compareSizes(oldStats, newStats, threshold) {
    const filesOverThreshold = [];

    newStats.forEach(newItem => {
        let oldSize;
        const { filename } = newItem;
        for (let i = 0; i < oldStats.length; i++) {
            if (filename === oldStats[i].filename) {
                oldSize = oldStats[i].size;
                break;
            }
        }

        // Only compare if a previous baseline exists
        if (oldSize) {
            const newSize = newItem.size;
            const diffBytes = newSize - oldSize;
            const diffBytesAbs = Math.abs(diffBytes);
            const diffPct = diffBytesAbs / oldSize;

            if (diffBytes === 0) {
                log(
                    chalk.green.dim(`${filename} has not changed (${newSize}b)`)
                );
            } else if (diffBytes > 0) {
                if (diffPct > threshold) {
                    // + over threshold
                    log(
                        chalk.red(
                            `${filename} increased by ${Math.round(
                                100 * diffPct
                            )}% - ${diffBytesAbs}b (${newSize} vs ${oldSize})`
                        )
                    );
                    filesOverThreshold.push(filename);
                } else {
                    // + within threshold
                    log(
                        chalk.green.dim(
                            `${filename} increased by ${Math.round(
                                100 * diffPct
                            )}%/${diffBytesAbs}b (${newSize} vs ${oldSize})`
                        )
                    );
                }
            } else if (diffPct > threshold) {
                // - over threshold
                log(
                    chalk.red(
                        `${filename} decreased by ${Math.round(
                            100 * diffPct
                        )}%/${diffBytesAbs}b (${newSize} vs ${oldSize})`
                    )
                );
                filesOverThreshold.push(filename);
            } else {
                // - within threshold
                log(
                    chalk.green.dim(
                        `${filename} decreased by ${Math.round(
                            100 * diffPct
                        )}%/${diffBytesAbs}b (${newSize} vs ${oldSize})`
                    )
                );
            }
        }
    });

    return filesOverThreshold.length > 0 ? filesOverThreshold : null;
}

function writeStats(statsFile, newStats, version) {
    let output;
    try {
        output = fs.readJsonSync(statsFile);
    } catch (e) {
        log(
            chalk.red.dim(
                `* Error parsing existing data from output file ${statsFile}`
            )
        );
        output = { sizes: [] };
    }

    try {
        const sizes = output.sizes; // eslint-disable-line prefer-destructuring
        let found = false;
        for (let i = 0; i < sizes.length; i++) {
            if (sizes[i].version === version) {
                sizes[i].stats = newStats;
                found = true;
                break;
            }
        }

        if (!found) {
            sizes.push({
                version,
                stats: newStats
            });
        }

        // Write the updated file
        fs.writeJson(statsFile, output, {
            spaces: 2,
            EOL: '\n'
        }).then(() => {
            if (!writeSizeResults) {
                log(chalk.green(`New stats written in ${statsFile}`));
            }
        });
    } catch (e) {
        log(chalk.red.bold(`* Error trying to write to output file: ${e}`));
    }
}

function writeOutput(file, sizes, version) {
    if (
        writeSizeResults ||
        (process.argv.length > 2 &&
            (process.argv[2] === '-w' || process.argv[3] === '-w'))
    ) {
        writeStats(file, sizes, version);
    }
}

function displaySizes(sizes) {
    sizes.forEach(item => {
        log(
            chalk.blue.dim(
                `${item.filename} is ${Math.round(item.size / 1024)}k`
            )
        );
    });
}

function compareAndStore(sizes, threshold, statsFile, currentVersion) {
    const lastStats = getLastBuildSizes(statsFile);
    const filesOverThreshold = compareSizes(lastStats.stats, sizes, threshold);
    if (filesOverThreshold) {
        log(
            chalk.red(`These files have changed size over ${threshold * 100}%:`)
        );
        filesOverThreshold.forEach(item => log(chalk.red.dim(`- ${item}`)));
        prompt([
            {
                message: 'Do you still want to continue?',
                type: 'confirm',
                name: 'confirmation',
                default: false
            }
        ]).then(approveChanges => {
            if (approveChanges.confirmation) {
                writeOutput(statsFile, sizes, currentVersion);
            } else {
                log(chalk.red('Aborting due to size changes.'));
                process.exit(1);
            }
        });
    } else {
        writeOutput(statsFile, sizes, currentVersion);
    }
}

function checkBuildOutput(writeToStatsFile) {
    if (writeToStatsFile) {
        writeSizeResults = true;
    }
    const sizes = getBuildSizes(FILE_LIST, DIST_DIR);
    displaySizes(sizes);
    compareAndStore(sizes, SIZE_CHANGE_THRESHOLD, STATS_FILE, CURRENT_VERSION);
}

// Only run if the -r param is given
if (
    process.argv.length > 2 &&
    (process.argv[2] === '-r' || process.argv[3] === '-r')
) {
    // Make sure the output dir exists
    if (!fs.existsSync(STATS_DIR)) {
        fs.mkdirSync(STATS_DIR);
    }
    checkBuildOutput();
}

module.exports = {
    getBuildSizes,
    getLastBuildSizes,
    writeStats,
    compareSizes,
    writeOutput,
    displaySizes,
    compareAndStore,
    checkBuildOutput
};
