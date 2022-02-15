import initDisclosure from '../../../src/ts/disclosure/disclosure';

import docs from './disclosure-docs.mdx';
import templateExample from '../../examples/disclosure/example.html';
import templateWithoutOpenSummary from '../../examples/disclosure/without_open_summary.html';
import templateFallback from '../../examples/disclosure/fallback.html';

function decorateWithBehaviour(Story) {
  setTimeout(() => initDisclosure());
  return Story();
}

export default {
  title: 'Components/Disclosure',
  parameters: { docs: { page: docs } },
};

export const Example = () => templateExample;
Example.parameters = { docs: { source: { code: templateExample } } };
Example.decorators = [decorateWithBehaviour];

export const WithoutOpenSummary = () => templateWithoutOpenSummary;
WithoutOpenSummary.parameters = { docs: { source: { code: templateWithoutOpenSummary } } };
WithoutOpenSummary.decorators = [decorateWithBehaviour];

export const Fallback = () => templateFallback;
Fallback.parameters = { docs: { source: { code: templateFallback } } };
