import docs from './contact-details-docs.mdx';
import templateExample from '../../examples/contact_details/example.html';

export default {
  title: 'Components/Contact Details',
  parameters: { docs: { page: docs } },
};

export const Example = () => templateExample;
Example.parameters = { docs: { source: { code: templateExample } } };
