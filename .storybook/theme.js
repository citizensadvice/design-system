import { create } from '@storybook/theming/create';
import data from '../package.json';

export default create({
    base: 'light',
    brandTitle: `Citizens Advice Design System v${data.version}`
});
