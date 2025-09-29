import { initialize } from "@open-iframe-resizer/core";

export default function initComponentExamples() {
  // Resize component iFrames using https://www.npmjs.com/package/@open-iframe-resizer/core
  const els = document.querySelectorAll(".js-component-example-iframe");
  Array.from(els).forEach(async (iframe) => {
    await initialize({}, iframe);
  });
}
