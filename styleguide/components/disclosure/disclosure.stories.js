import initDisclosure from '../../../src/ts/disclosure/disclosure';

import docs from './disclosure-docs.mdx';
import templateExample from '../../examples/disclosure/example.html';
import templateWithoutOpenSummary from '../../examples/disclosure/without_open_summary.html';
import templateFallback from '../../examples/disclosure/fallback.html';
import templateWithCustomId from '../../examples/disclosure/with_optional_id.html';
import templateWithAdditionalAttributes from '../../examples/disclosure/with_additional_attributes.html';

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
WithoutOpenSummary.parameters = {
  docs: { source: { code: templateWithoutOpenSummary } },
};
WithoutOpenSummary.decorators = [decorateWithBehaviour];

export const Fallback = () => templateFallback;
Fallback.parameters = { docs: { source: { code: templateFallback } } };

export const WithCustomId = () => templateWithCustomId;
WithCustomId.parameters = { docs: { source: { code: templateWithCustomId } } };
WithCustomId.decorators = [decorateWithBehaviour];

export const WithAdditionalAttributes = () => templateWithAdditionalAttributes;
WithAdditionalAttributes.parameters = { docs: { source: { code: templateWithAdditionalAttributes } } };
WithAdditionalAttributes.decorators = [decorateWithBehaviour];
