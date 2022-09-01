import { iframeResizer } from 'iframe-resizer';

export default function initComponentExamples() {
  // Resize component iFrames using https://www.npmjs.com/package/iframe-resizer
  const els = document.querySelectorAll('.js-component-example-iframe');
  Array.from(els).forEach((iframe) => {
    iframeResizer({ log: true }, iframe);
  });
}
