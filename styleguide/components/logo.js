import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const logo = () => {
    const component = '<div class="cads-logo" />';

    return wrapper('Logo', component);
};

export default logo;
