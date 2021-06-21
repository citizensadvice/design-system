import docs from './callouts-docs.mdx';
import templateStandard from '../../examples/callout/standard.html';
import templateExample from '../../examples/callout/example.html';
import templateImportant from '../../examples/callout/important.html';
import templateAdviser from '../../examples/callout/adviser.html';
import templateNested from '../../examples/callout/nested.html';
import templateVariableHeadings from '../../examples/callout/variable_heading_levels.html';

export default {
  title: 'Components/Callouts',
  parameters: { docs: { page: docs } },
};

export const Standard = () => templateStandard;
Standard.storyName = 'Standard callout';
Standard.parameters = { docs: { source: { code: templateStandard.raw } } };

export const Example = () => templateExample;
Example.storyName = 'Example callout';
Example.parameters = { docs: { source: { code: templateExample.raw } } };

export const Important = () => templateImportant;
Important.storyName = 'Important callout';
Important.parameters = { docs: { source: { code: templateImportant.raw } } };

export const Adviser = () => templateAdviser;
Adviser.storyName = 'Adviser callout';
Adviser.parameters = { docs: { source: { code: templateAdviser.raw } } };

export const Nested = () => templateNested;
Nested.storyName = 'Nested callouts';
Nested.parameters = { docs: { source: { code: templateNested } } };

export const VariableHeading = () => templateVariableHeadings;
VariableHeading.storyName = 'Variable heading levels';
VariableHeading.parameters = {
  docs: { source: { code: templateVariableHeadings } },
};
