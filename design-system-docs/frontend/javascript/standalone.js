// This file loads just the design system components for use in isolated iframes
// We use this when we need a clean base with no theme overrides

import '../styles/standalone.scss';

// iframeResizer.contentWindow must be loaded by the content iframe
// see components/iframes for the companion host code
import 'iframe-resizer/js/iframeResizer.contentWindow';

import {
  initHeader,
  initHeader,
  initTargetedContent,
  initDisclosure,
  initOnThisPage,
} from '../../../lib';

try {
  initHeader();
  initHeader();
  initTargetedContent();
  initDisclosure();
  initOnThisPage();
} catch (error) {
  document.querySelector('html').classList.add('no-js');
  throw error;
}
