import * as haml from '../../scripts/haml';
import wrapper from './component-wrapper';
import template from '../../haml/_header.html.haml';
import t1 from '../../haml/_logo_clickable.html.haml';
import t2 from '../../haml/_search.html.haml';

haml.queueTemplate('logo_clickable', t1);
haml.queueTemplate('search', t2);

const header = () => {
    const component = haml.render(template, {
        request: {
            original_url: 'abc'
        }
    });
    return wrapper('Header', component);
};

export default header;
