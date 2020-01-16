import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const logo = () => {
    const component =
        '<a class="cads-logo" href="javascript:;" title="Citizens Advice Logo"></a>';

    return wrapper('Logo', component);
};

export default logo;
