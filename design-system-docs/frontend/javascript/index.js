import '../styles/index.scss';

import initTargetedContent from '../../../lib/targeted-content';
import initDisclosure from '../../../lib/disclosure/disclosure';
import initCodeCopy from './code-copy';
import initExamples from './examples';

try {
  initTargetedContent();
  initDisclosure();
  initCodeCopy();
  initExamples();
} catch (error) {
  document.querySelector('html').classList.add('no-js');
  throw error;
}
