import docs from './sidebar-docs.mdx';
import templateExample from '../../examples/sidebar/example.html';
import templateWithAdditionalContent from '../../examples/sidebar/with_additional_content.html';

export default {
  title: 'Components/Sidebar',
  parameters: { docs: { page: docs } },
};

export const Example = () => templateExample;
Example.parameters = { docs: { source: { code: templateExample } } };

export const WithAdditionalContent = () => templateWithAdditionalContent;
WithAdditionalContent.parameters = { docs: { source: { code: templateWithAdditionalContent } } };
