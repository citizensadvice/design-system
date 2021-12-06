import docs from './sidebar-docs.mdx';
import templateExample from '../../examples/sidebar/example.html';

export default {
  title: 'Components/Sidebar',
  parameters: { docs: { page: docs } },
};

export const Example = () => templateExample;
Example.parameters = { docs: { source: { code: templateExample } } };
