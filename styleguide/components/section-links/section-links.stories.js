import docs from './section-links.mdx';
import templateExample from '../../examples/section_links/example.html';
import templateWithAdditionalContent from '../../examples/section_links/with_additional_content.html';

export default {
  title: 'Components/Section Links',
  parameters: { docs: { page: docs } },
};

export const Example = () => templateExample;
Example.parameters = { docs: { source: { code: templateExample } } };

export const WithAdditionalContent = () => templateWithAdditionalContent;
WithAdditionalContent.parameters = {
  docs: { source: { code: templateWithAdditionalContent } },
};
