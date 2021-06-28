import docs from './notice-banner-docs.mdx';
import templateExample from '../../examples/notice_banner/example.html';

export default {
  title: 'Components/Notice banner',
  parameters: { docs: { page: docs } },
};

export const Example = () => templateExample;
Example.parameters = { docs: { source: { code: templateExample } } };
