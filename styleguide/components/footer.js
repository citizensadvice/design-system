import haml from '../../scripts/haml';
import wrapper from './component-wrapper';
import template from '../../haml/_footer.html.haml';

const footer = () =>
    wrapper('Footer', haml.render(template, { root_path: '/' }));

export default footer;
