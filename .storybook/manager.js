require('url-polyfill');

import { addons } from '@storybook/addons';
import theme from './theme';

addons.setConfig({
  panelPosition: 'bottom',
  theme,
});
