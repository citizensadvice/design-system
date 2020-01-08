/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const https = require('https');
const chalk = require('chalk');

require('dotenv').config();

const { log } = console;
const CONFIG = {
    FIGMA_ACCESS_TOKEN: process.env.FIGMA_ACCESS_TOKEN,
    FIGMA_API: process.env.FIGMA_API,
    FIGMA_DOC: process.env.FIGMA_DOC
};

function getFigmaFile() {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'X-Figma-Token': CONFIG.FIGMA_ACCESS_TOKEN
                // Authorization: `Basic ${Buffer.from(
                //     `username:${CONFIG.ACCESS_TOKEN}`
                // ).toString('base64')}`
            }
        };

        const searchQuery = `${CONFIG.FIGMA_API}/files/${CONFIG.FIGMA_DOC}`;

        https
            .get(searchQuery, options, res => {
                res.setEncoding('utf8');
                const data = [];

                res.on('data', chunk => {
                    data.push(chunk);
                });
                res.on('end', () => {
                    const result = JSON.parse(data.join(''));
                    resolve(result);
                });
            })
            .on('error', err => {
                reject(err.message);
            });
    });
}

function getStyles(file) {
    const colourStyles = [];

    if (file && file.document && file.document.children) {
        const pages = file.document.children;

        for (let i = 0; i < pages.length; i++) {
            if (pages[i].name === 'Colours') {
                if (
                    pages[i].children &&
                    pages[i].children.length === 1 &&
                    pages[i].children[0].name === 'Colour Palette'
                ) {
                    const colours = pages[i].children[0].children;
                }
                break;
            }
        }
    }

    return colourStyles;
}

async function run() {
    const figmaFile = await getFigmaFile();
    log(getStyles(figmaFile));
}

run();
