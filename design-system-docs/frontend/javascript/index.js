// This file loads just the design system components for use in isolated iframes
// We use this when we need a clean base with no theme overrides

import '../styles/index.scss';

// iframeResizer.contentWindow must be loaded by the content iframe
// see components/iframes for the companion host code
import 'iframe-resizer/js/iframeResizer.contentWindow';

import initHeader from '../../../lib/header';
import greedyNav from '../../../lib/greedy-nav/index';
import initTargetedContent from '../../../lib/targeted-content';
import initDisclosure from '../../../lib/disclosure/disclosure';
import initOnThisPage from '../../../lib/on-this-page/on-this-page';

try {
  initHeader();
  greedyNav.init();
  initTargetedContent();
  initDisclosure();
  initOnThisPage();
} catch (error) {
  document.querySelector('html').classList.add('no-js');
  throw error;
}
