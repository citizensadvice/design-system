import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line
import { withA11y } from '@storybook/addon-a11y'; // eslint-disable-line
import hljs from 'highlight.js'; // eslint-disable-line

// The styles
import './styles.scss';

// Haml setup
import hamlProps from './haml_props.json';
import * as haml from '../scripts/haml';
// Import all the templates...
import tFooter from '../haml/_footer.html.haml';
import tHeader from '../haml/_header.html.haml';
import tLogo from '../haml/_logo_clickable.html.haml';
import tSearch from '../haml/_search.html.haml';
import tBreadcrumb from '../haml/_breadcrumb.html.haml';
// ...then queue in memory partials that are used by other partials
haml.queueTemplate('logo_clickable', tLogo);
haml.queueTemplate('search', tSearch);

// Storybook component wrapper
const a11yid = 'a11yComponentToTest';
const wrapper = (title, component, usage) => {
    const source = hljs.highlightAuto(component).value;

    return `
<h1 aria-hidden="true">${title}</h1>
<div id="${a11yid}">
${component}
</div>
<h2 aria-hidden="true">Component source</h2>

<pre aria-hidden="true"><code class="html">
${source}
</code></pre>

${usage ? `<h2>Usage info</h2>${usage}` : ''}
`;
};

// Haml rendering wrapper for convenience
function renderHamlTemplate(templateName, template, usage) {
    return wrapper(templateName, haml.render(template, hamlProps), usage);
}

// Storybook section setup
export default {
    title: '3 Components',
    decorators: [withKnobs, withA11y],
    parameters: {
        options: {
            showPanel: true
        },
        a11y: {
            // optional selector which element to inspect
            element: '#a11yComponentToTest',
            // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
            config: {},
            // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
            options: {}
        }
    }
};

// The haml components. Thet will be sorted alphabetically so the order here is not important.
export const search = () => renderHamlTemplate('Search', tSearch);
export const footer = () => renderHamlTemplate('Footer', tFooter);
export const header = () => renderHamlTemplate('Header', tHeader);
export const logo = () =>
    renderHamlTemplate(
        'Logo',
        tLogo,
        `You can use the <code>cads-logo</code> class on anything to display the logo.
Make sure that an accessible title/etc is available.`
    );

export const breadcrumbs = () => renderHamlTemplate('Breadcrumbs', tBreadcrumb);
// export const callout = () => Callout();
// export const navigation = () => Navigation();

// export const buttons = () => Buttons();
// export const breadcrumbs = () => Breadcrumbs();
// export const noticeBanner = () => NoticeBanner();
