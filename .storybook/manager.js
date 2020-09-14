import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';
import { version } from '../package.json';

const theme = create({
  base: 'light',
  brandTitle: `Citizens Advice Design System v${version}`
});

addons.setConfig({
  panelPosition: 'bottom',
  theme,
});
