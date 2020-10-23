import Typography from './foundations/typography.md';
import Spacing from './foundations/spacing.md';
import Borders from './foundations/borders.md';
import Visibility from './foundations/visibility.md';
import IconFont from './foundations/icon_font.md';

export default {
  title: '2: Design Foundations',
  decorators: [
    (storyFn) =>
      `<div class="cads-styleguide-max-content-width">${storyFn()}</div>`,
  ],
};

export const typography = () => Typography;
export const spacingAndSizing = () => Spacing;
export const borders = () => Borders;
export const visibility = () => Visibility;
export const iconFont = () => IconFont;
