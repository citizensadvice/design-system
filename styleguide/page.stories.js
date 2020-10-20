/* eslint-disable camelcase */
// The styles
import './styles.scss';

import GreedyNav from '../src/ts/greedy-nav/GreedyNav';
import initHeader from '../src/js/header';
import initTargetedContent from '../src/js/targeted-content';
import initCallouts from '../src/js/callout';
import initTables from '../src/js/tables';
import initOISCWarnings from '../src/js/oisc-warnings';

// eslint-disable-next-line
import locals from './haml_locals.rb'; // just used to watch
import wrapper from './component-wrapper';

// Haml setup
import tAdviceCollection from './samples/_advice_collection.html.haml';
import tAdviceCollectionAdviser from './samples/_advice_collection_adviser.html.haml';
import tAdviceCollectionAdvisernet from './samples/_advice_collection_advisernet.html.haml';
import tTables from './samples/_tables.html.haml';
import tForms from './samples/_forms.html.haml';

function init() {
  initHeader();
  initTargetedContent();
  initCallouts();
  initTables();
  initOISCWarnings();
  GreedyNav.init({ breakpoint: 0 });
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
};

export const adviceCollection = () =>
  renderHamlTemplate(
    'Advice Collection',
    tAdviceCollection,
    'advice_collection',
    '',
    null,
    init,
    true
  );

export const adviceCollectionAdviser = () =>
  renderHamlTemplate(
    'Advice Collection (Adviser)',
    tAdviceCollectionAdviser,
    'advice_collection_adviser',
    '',
    null,
    init,
    true
  );

export const adviceCollectionAdvisernet = () =>
  renderHamlTemplate(
    'Advice Collection (Advisernet)',
    tAdviceCollectionAdvisernet,
    'advice_collection_advisernet',
    '',
    null,
    init,
    true
  );

export const tables = () =>
  renderHamlTemplate('Tables)', tTables, 'tables', '', null, init, true);

export const forms = () =>
  renderHamlTemplate('Forms)', tForms, 'forms', '', null, init, true);