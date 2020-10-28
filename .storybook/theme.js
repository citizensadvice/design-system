import { create } from '@storybook/theming/create';
import { version } from '../package.json';

export default create({
  base: 'light',
  brandTitle: `Citizens Advice Design System v${version}`,
  fontBase: "'Open Sans', helvetica, 'helvetica neue', arial, sans-serif",
});
