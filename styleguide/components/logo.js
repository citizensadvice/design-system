import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const logo = () => {
    const component =
        '<a class="cads-logo" href="javascript:;" title="Citizens Advice Logo"></a>';

    const usage =
        'You can use the cads-logo class on anything to display the logo.';

    return wrapper('Logo', component, usage);
};

export default logo;
