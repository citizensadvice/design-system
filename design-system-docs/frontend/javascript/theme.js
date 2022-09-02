// This file loads the docs theme
// We use this for the main docs pages where we want to customise the design system theme
// For isolated component pages we use the based index.scss/js

import '../styles/theme.scss';

import initHeader from '../../../lib/header';
import greedyNav from '../../../lib/greedy-nav/index';
import initTargetedContent from '../../../lib/targeted-content';
import initDisclosure from '../../../lib/disclosure/disclosure';
import initOnThisPage from '../../../lib/on-this-page/on-this-page';

import initCodeCopy from './components/code-copy';
import initSampleCode from './components/sample-code';
import initComponentExamples from './components/component-examples';

try {
  initHeader();
  greedyNav.init();
  initTargetedContent();
  initDisclosure();
  initOnThisPage();
  initCodeCopy();
  initSampleCode();
  initComponentExamples();
} catch (error) {
  document.querySelector('html').classList.add('no-js');
  throw error;
}
