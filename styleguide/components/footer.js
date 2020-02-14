import * as haml from '../../scripts/haml';
import wrapper from './component-wrapper';
import template from '../../haml/_footer.html.haml';
import t from '../../haml/_logo_clickable.html.haml';

haml.queueTemplate('logo_clickable', t);

const footer = () =>
    wrapper('Footer', haml.render(template, { root_path: '/' }));

export default footer;
