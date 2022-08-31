// This file loads just the design system components for use in isolated iframes
// We use this when we need a clean base with no theme overrides

import '../styles/index.scss';

import initHeader from '../../../lib/header';
import greedyNav from '../../../lib/greedy-nav/index';
import initTargetedContent from '../../../lib/targeted-content';
import initDisclosure from '../../../lib/disclosure/disclosure';

try {
  initHeader();
  greedyNav.init();
  initTargetedContent();
  initDisclosure();
} catch (error) {
  document.querySelector('html').classList.add('no-js');
  throw error;
}
