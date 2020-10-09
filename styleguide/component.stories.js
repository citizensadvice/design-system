/* eslint-disable camelcase */

// The styles
import './styles.scss';

import initHeader from '../src/js/header';
import initTargetedContent from '../src/js/targeted-content';
import initTables from '../src/js/tables';

import GreedyNav from '../src/ts/greedy-nav';

import locals from './haml_locals.rb'; // just used to watch
import wrapper from './component-wrapper';

import { Pagination, PagingInfo } from './components/pagination';
import RelatedContent from './components/related-content';

// Haml setup
// Import all the templates...
import tFooter from '../haml/_footer.html.haml';
import tHeader from '../haml/_header.html.haml';
import tLogo from '../haml/_logo_clickable.html.haml';
import tNavigation from '../haml/_navigation.html.haml';
import tNoticeBanner from '../haml/_notice_banner.html.haml';
import tRadio from '../haml/_radio_group.html.haml';
import tRadioSmall from '../haml/_radio_group_small.html.haml';
import tTargetedContent from '../haml/_targeted-content.html.haml';
import tPageReview from '../haml/_page_review.html.haml';
import tInput from '../haml/_input.html.haml';
import tContactDetails from '../haml/_contact_details.html.haml';
import tWebsiteFeedback from '../haml/_website_feedback.html.haml';
import tTextarea from '../haml/_textarea.html.haml';
import tErrorSummary from '../haml/_error_summary.html.haml';
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
  title: '3: Components',
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
    (storyFn) => `<div
      class="cads-styleguide__language-label"
      onclick="javascript:styleguideChangeLangugage();"
      aria-hidden="true"
    ></div>
    ${storyFn()}`,
  ],
};

export const pagination = () => Pagination();
export const pagingInfo = () => PagingInfo();
export const relatedContent = () => RelatedContent();

// The haml components. Thet will be sorted alphabetically so the order here is not important.
export const footer = () => renderHamlTemplate('Footer', tFooter, 'footer');
export const header = () =>
  renderHamlTemplate(
    'Header',
    tHeader,
    'header',
    `The header component uses javascript to show/hide the search bar in small screen sizes.
\n\n
<code>import { initHeader } from @citizensadvice/design-system/lib/header</code> and execute that function after the header html has loaded into the DOM.`,
    null,
    () => initHeader()
  );
export const input = () => renderHamlTemplate('Input', tInput, 'input');
export const textarea = () =>
  renderHamlTemplate('Textarea', tTextarea, 'textarea');
export const pageReview = () =>
  renderHamlTemplate('Page Review', tPageReview, 'page_review');
export const radioGroup = () =>
  renderHamlTemplate('Radio Group', tRadio, 'radio_group');
export const radioGroupSmall = () =>
  renderHamlTemplate('Radio Group (small)', tRadioSmall, 'radio_group_small');

export const errorSummary = () =>
  renderHamlTemplate(
    'Error summary',
    tErrorSummary,
    'error_summary',
    `The error summary is used to provide a summary of form errors.
You will need to provide the validation content and set the content.
To set the number of fields use the <code>cads-error-summary__field_count</code>
span and set the content to <code>1 field</code>, <code>5 fields</code>, etc.

The error summary should gain focus when it first appears, tabbing should then flow through
the links in the error summary in the normal way.

Then use the <code>cads-error-summary__list</code> to add the relevant <code>li</code>
items.  Each item should contain a link with text that is the same as the error message next
to the field.  Each link should give focus to the related field when clicked.
`
  );
export const logo = () =>
  renderHamlTemplate(
    'Logo',
    tLogo,
    'logo_clickable',
    `You can use the <code>cads-logo</code> class on anything to display the logo.
Make sure that an accessible title/etc is available.`
  );
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
export const websiteFeedback = () =>
  renderHamlTemplate('Website Feedback', tWebsiteFeedback, 'website_feedback');
export const targetedContent = () =>
  renderHamlTemplate(
    'Targeted Content',
    tTargetedContent,
    'targeted-content',
    `The targeted component uses javascript to initialise the click handlers for the collapse/expand behaviour.
        \n\n
        <pre><code>import initTargetedContent from '@citizensadvice/design-system/lib/targeted-content'</code></pre> and execute that function after the the page has finished loading.`,
    null,
    () => initTargetedContent()
  );

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
