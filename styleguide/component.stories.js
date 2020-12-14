/* eslint-disable camelcase */

// The styles
import './styles.scss';

import initTables from '../src/js/tables';

// eslint-disable-next-line no-unused-vars
import wrapper from './component-wrapper';

// Haml setup
// Import all the templates...
import tTables from '../haml/_table.html.haml';

// Haml rendering wrapper for convenience
function renderHamlTemplate(
  templateName,
  template,
  hamlLocation,
  usage,
  optionalProps,
  optionalJS,
  optionalWrapperClass
) {
  return wrapper(
    templateName,
    template,
    `The partial is available in:
<pre class="html"><code>haml/_${hamlLocation}.html.haml</code></pre>
${usage || ''}`,
    optionalJS,
    false,
    optionalWrapperClass
  );
}

// Storybook section setup
export default {
  title: 'Components',
  id: '3: Components',
  parameters: {
    options: {
      showPanel: true,
    },
    a11y: {
      // optional selector which element to inspect
      element: '#a11yComponentToTest',
      // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
      config: {},
      // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
      options: {},
    },
  },
  decorators: [
    (storyFn) => `<div class="cads-styleguide__wrapper">${storyFn()}</div>`,
  ],
};

export const tables = () =>
  renderHamlTemplate('Tables', tTables, 'table', null, null, initTables);
