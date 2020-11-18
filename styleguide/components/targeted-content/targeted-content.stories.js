import docs from './targeted-content-docs.mdx';
import templateDefault from './_default.html.haml';
import templateAnchor from './_anchor.html.haml';
import templateFallback from './_fallback.html.haml';
import { translate } from '../../../scripts/story-helpers';
import initTargetedContent from '../../../src/js/targeted-content';

function decorateWithBehaviour(Story) {
  setTimeout(() => initTargetedContent());
  return Story();
}

export default {
  title: 'Components/Targeted content',
  parameters: { docs: { page: docs } },
  decorators: [decorateWithBehaviour],
};

export const Default = (_, options) => translate(templateDefault, options);
Default.parameters = { docs: { source: { code: templateDefault.raw } } };

export const WithAnchor = (_, options) => translate(templateAnchor, options);
WithAnchor.storyName = 'With anchor';
WithAnchor.parameters = { docs: { source: { code: templateAnchor.raw } } };

export const Fallback = (_, options) => translate(templateFallback, options);
// Set the code sample to templateDefault as templateFallback is used to force the behaviour only
Fallback.parameters = { docs: { source: { code: templateDefault.raw } } };
