import initTargetedContent from '../../../src/ts/targeted-content/targeted-content';

import docs from './targeted-content-docs.mdx';
import templateDefault from '../../examples/targeted_content/default.html';
import templateAnchor from '../../examples/targeted_content/anchor.html';
import templateAdviser from '../../examples/targeted_content/adviser.html';
import templateFallback from '../../examples/targeted_content/fallback.html';

function decorateWithBehaviour(Story) {
  setTimeout(() => initTargetedContent());
  return Story();
}

export default {
  title: 'Components/Targeted content',
  parameters: { docs: { page: docs } },
  decorators: [decorateWithBehaviour],
};

export const Default = () => templateDefault;
Default.parameters = { docs: { source: { code: templateDefault } } };

export const Adviser = () => templateAdviser;
Adviser.parameters = { docs: { source: { code: templateAdviser } } };

export const WithAnchor = () => templateAnchor;
WithAnchor.storyName = 'With anchor';
WithAnchor.parameters = { docs: { source: { code: templateAnchor } } };

export const Fallback = () => templateFallback;
// Set the code sample to templateDefault as templateFallback is used to force the behaviour only
Fallback.parameters = { docs: { source: { code: templateDefault } } };

