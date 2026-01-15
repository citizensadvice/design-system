import {
  initHeader,
  initNavigation,
  initTargetedContent,
  initDisclosure,
  initOnThisPage,
  initCharacterCount
} from "@citizensadvice/design-system";

import initCodeCopy from "./components/code-copy";
import initSampleCode from "./components/sample-code";
import initComponentExamples from "./components/component-examples";

try {
  initHeader();
  initNavigation();
  initTargetedContent();
  initDisclosure();
  initOnThisPage();
  initCharacterCount();
  initCodeCopy();
  initSampleCode();
  initComponentExamples();
} catch (error) {
  document.querySelector("html").classList.add("no-js");
  throw error;
}
// Entry point for the build script in your package.json
