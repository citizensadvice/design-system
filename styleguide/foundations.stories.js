import './styles.scss';
import sassPalette from '../scss/1-settings/_colour-palette.scss';
import sassLanguage from '../scss/1-settings/_colour-language.scss';

// import Animations from './tokens/animations.md';
import Breakpoints from './tokens/breakpoints.md';
import Typography from './tokens/typography.md';
import Spacing from './tokens/spacing.md';
import Grid from './tokens/grid.md';
import Borders from './tokens/borders.md';
import Visibility from './tokens/visibility.md';
import Languages from './tokens/languages.md';
import IconFont from './tokens/icon_font.md';

export default {
  title: '2: Design Foundations',
  decorators: [
    (storyFn) =>
      `<div class="cads-styleguide-max-content-width">${storyFn()}</div>`,
  ],
};

function getColours(type, sass) {
  // Since we get all the vars exported we need to filter them out
  const colours = Object.keys(sass).filter(
    (item) => item.indexOf(`${type}-`) !== -1
  );

  let result = `<h1>Colour ${type}</h1>`;
  let lastSection = '';
  colours.forEach((item) => {
    // We need to split by section as well
    const matches = item.split('-');
    const section = matches.length > 2 ? matches[1].replace('_', ' ') : '';
    const name = matches[matches.length > 2 ? 2 : 1];
    const colour = sass[item];

    if (section !== lastSection) {
      lastSection = section;
      result += `<h2>${section}</h2>`;
    }

    result += `<div class="cads-styleguide__colour-tile">
<div class="cads-styleguide__colour-tile-bg" style="background: ${colour}"></div>
<p>${name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)}
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
// export const animations = () => Animations;
export const visibility = () => Visibility;
export const languages = () => Languages;
export const iconFont = () => IconFont;
