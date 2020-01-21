import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const markup =
    '<a class="cads-logo" href="javascript:;" title="Back to home page"></a>';

const logo = () => {
    const usage = `'You can use the <code>cads-logo</code> class on anything to display the logo.
Make sure that an accessible title/etc is available`;

    return wrapper('Logo', markup, usage);
};

export default logo;
export { markup };
