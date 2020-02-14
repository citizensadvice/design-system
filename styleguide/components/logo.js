import * as haml from '../../scripts/haml';
import template from '../../haml/_logo_clickable.html.haml';
import wrapper from './component-wrapper';

const logo = () => {
    const usage = `You can use the <code>cads-logo</code> class on anything to display the logo.
Make sure that an accessible title/etc is available`;

    const markup = haml.render(template, { root_path: '/' });
    return wrapper('Logo', markup, usage);
};

export default logo;
