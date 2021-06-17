import docs from './tables-docs.mdx';
import templateExample from '../../examples/table/example.html';
import templateLong from '../../examples/table/long_table.html';
import templateNoCaption from '../../examples/table/no_caption.html';

export default {
  title: 'Components/Tables',
  parameters: { docs: { page: docs } },
};

export const Example = () => templateExample;
Example.parameters = { docs: { source: { code: templateExample } } };

export const Long = () => templateLong;
Long.storyName = 'Long table';
Long.parameters = { docs: { source: { code: templateLong } } };

export const NoCaption = () => templateNoCaption;
NoCaption.storyName = 'No caption';
NoCaption.parameters = { docs: { source: { code: templateNoCaption } } };
