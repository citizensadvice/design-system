import docs from './error-summary-docs.mdx';
import templateExample from '../../examples/error_summary/example.html';

export default {
  title: 'Forms/Error Summary',
  parameters: { docs: { page: docs } },
};

export const Example = () => templateExample;
Example.parameters = { docs: { source: { code: templateExample } } };
