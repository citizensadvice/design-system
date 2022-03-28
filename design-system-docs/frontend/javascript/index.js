import '../styles/index.scss';

import initTargetedContent from '@citizensadvice/design-system/lib/targeted-content';
import initDisclosure from '@citizensadvice/design-system/lib/disclosure/disclosure';

initTargetedContent();
initDisclosure();

if ('iFrameResize' in window) {
  window.iFrameResize(
    { scrolling: 'auto', autoResize: true },
    '.js-component-example-iframe'
  );
}
