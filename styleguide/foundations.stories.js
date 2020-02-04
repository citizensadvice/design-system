import './styles.scss';
import sassPalette from '../scss/1-settings/_colour-palette.scss';
import sassLanguage from '../scss/1-settings/_colour-language.scss';

import Animations from './tokens/animations.md';
import Breakpoints from './tokens/breakpoints.md';
import Typography from './tokens/typography.md';
import Spacing from './tokens/spacing.md';
import Grid from './tokens/grid.md';
import Borders from './tokens/borders.md';
import Visibility from './tokens/visibility.md';
import Languages from './tokens/languages.md';

export default {
    title: '2 Design Foundations'
};

function getBrightness(colour) {
    const m = colour
        .substr(1)
        .match(colour.length === 7 ? /(\S{2})/g : /(\S{1})/g);
    let r = 0;
    let g = 0;
    let b = 0;

    if (m) {
        r = parseInt(m[0], 16);
        g = parseInt(m[1], 16);
        b = parseInt(m[2], 16);
    }

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const threshold = 123;

    return brightness < threshold ? '#fff' : '#000';
}

function getColours(type, sass) {
    const colours = Object.keys(sass).filter(
        item => item.indexOf(`${type}-`) !== -1
    );
    let result = `<h1>Colour ${type}</h1>`;
    colours.forEach(item => {
        const name = item.replace(`${type}-`, '');
        const colour = sass[item];
        result += `<div class="cads-styleguide__colour-tile" style="background: ${colour}">
<p style="color: ${getBrightness(colour)}">${name.replace(
            /([A-Z])/g,
            g => `-${g[0].toLowerCase()}`
        )}
<br/>${colour.toUpperCase()}</p>
</div>`;
    });

    return result;
}

export const colourPalette = () => getColours('palette', sassPalette);
export const colourLanguage = () => getColours('language', sassLanguage);
export const typography = () => Typography;
export const spacingAndSizing = () => Spacing;
export const grid = () => Grid;
export const breakpoints = () => Breakpoints;
export const borders = () => Borders;
export const animations = () => Animations;
export const visibility = () => Visibility;
export const languages = () => Languages;
