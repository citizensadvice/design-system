/* eslint-disable camelcase */

// The styles
import './styles.scss';

import initTargetedContent from '../src/js/targeted-content';
import initTables from '../src/js/tables';

import GreedyNav from '../src/ts/greedy-nav';

// eslint-disable-next-line no-unused-vars
import wrapper from './component-wrapper';

import { Pagination, PagingInfo } from './components/pagination';
import RelatedContent from './components/related-content';

// Haml setup
// Import all the templates...
import tNavigation from '../haml/_navigation.html.haml';
import tNoticeBanner from '../haml/_notice_banner.html.haml';
import tContactDetails from '../haml/_contact_details.html.haml';
import tTables from '../haml/_table.html.haml';
import tAssetHyperlink from '../haml/_asset_hyperlink.html.haml';
import tAdvisernetRelatedContent from '../haml/_related_content_advisernet.html.haml';

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

export const pagination = () => Pagination();
export const pagingInfo = () => PagingInfo();
export const relatedContent = () => RelatedContent();

export const navigation = () =>
  renderHamlTemplate(
    'Navigation',
    tNavigation,
    'navigation',
    `The navigation component uses javascript to display options in a dropdown menu that would otherwise appear off screen.
        \n\n
        <p>SystemJS</p>
        <pre><code>
        &lt;script src="system.js">&lt;/script>
        &lt;script src="@citizensadvice/design-system/lib/greedy-nav'>&lt;/script>
        &lt;script>
            System.import("GreedyNav");
            GreedyNav.init(/* { config if required } */);
        &lt;/script>
        </pre></code>

        <p>Common JS</p>
        <pre><code>
        import GreedyNav from '@citizensadvice/design-system/lib/greedy-nav/';
        GreedyNav.init(/* { config if required } */);
        </code></pre>`,
    null,
    () => {
      GreedyNav.init();
    }
  );

export const noticeBanner = () =>
  renderHamlTemplate('Notice banner', tNoticeBanner, 'notice_banner');
export const contactDetails = () =>
  renderHamlTemplate('Contact details', tContactDetails, 'contact_details');

export const tables = () =>
  renderHamlTemplate('Tables', tTables, 'table', null, null, initTables);

export const assetHyperlink = () =>
  renderHamlTemplate('Asset hyperlink', tAssetHyperlink, 'asset_hyperlink');

export const advisernetRelatedContent = () =>
  `<div class="cads-advisernet">
    ${renderHamlTemplate(
      'Advisernet Related Content',
      tAdvisernetRelatedContent,
      'related_content_advisernet',
      '',
      null,
      () => initTargetedContent()
    )}
  </div>`;
