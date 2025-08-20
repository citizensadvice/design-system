// This file loads just the design system components for use in isolated iframes
// We use this when we need a clean base with no theme overrides

// iframeResizer.contentWindow must be loaded by the content iframe
// see components/iframes for the companion host code
import "iframe-resizer/js/iframeResizer.contentWindow";

import {
  initHeader,
  initNavigation,
  initTargetedContent,
  initDisclosure,
  initOnThisPage,
} from "@citizensadvice/design-system";

try {
  initHeader();
  initNavigation();
  initTargetedContent();
  initDisclosure();
  initOnThisPage();
} catch (error) {
  document.querySelector("html").classList.add("no-js");
  throw error;
}
