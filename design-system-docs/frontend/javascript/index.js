import '../styles/index.scss';

import initTargetedContent from '@citizensadvice/design-system/lib/targeted-content';
import initDisclosure from '@citizensadvice/design-system/lib/disclosure/disclosure';
import initCodeCopy from './code-copy';

try {
  initTargetedContent();
  initDisclosure();
  initCodeCopy();
} catch (error) {
  document.querySelector('html').classList.add('no-js');
  throw error;
}
