/* eslint-disable camelcase */
// The styles
import './styles.scss';

import priorityNav from '@citizensadvice/priority-nav';
import initHeader from '../js/header';
import initTargetedContent from '../js/targeted-content';
import initAdviceFeedback from '../js/advice-feedback';
import initCallouts from '../js/callout';

// eslint-disable-next-line
import locals from './haml_locals.rb'; // just used to watch
import wrapper from './component-wrapper';

// Haml setup
import tSamplePage from './_sample_page.html.haml';

function init() {
    console.log('boo');
    priorityNav();
    initHeader();
    initTargetedContent();
    initAdviceFeedback();
    initCallouts();
}

// Haml rendering wrapper for convenience
function renderHamlTemplate(
    templateName,
    template,
    hamlLocation,
    usage,
    optionalProps,
    optionalJS,
    strip
) {
    return wrapper(templateName, template, '', optionalJS, strip);
}

// Storybook section setup
export default {
    title: '4: Sample pages',
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

export const samplePage = () =>
    renderHamlTemplate(
        'Sample Page',
        tSamplePage,
        'sample_page',
        '',
        null,
        init,
        true
    );
